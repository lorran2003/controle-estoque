import db from "../database/db"
import path from 'path'
import { DEST_IMG } from "../util/path.js"
import { Stocktypes, StockCategory } from "../../shared/stockEnums"
import fs from 'fs'
import { SaveImageError } from "../erros/SaveImageError"
import { EntityAlreadyExistsError } from "../erros/EntityAlreadyExistsError.js"

export const existsProductBy = async (attributes) =>
    db.Product.findOne({ where: { ...attributes } })

export const isExistsFile = (path) => {
    return fs.existsSync(path)
}

export const saveImg = (pathImg) => {
    if (!isExistsFile(pathImg)) {
        throw new SaveImageError('Arquivo de origem não existe')
    }

    const fileName = path.basename(pathImg)
    const ext = path.extname(fileName)
    const baseName = path.basename(fileName, ext)
    const uniqueName = `${baseName}-${Date.now()}${ext}`
    const finalPath = path.join(DEST_IMG, uniqueName)

    fs.copyFileSync(pathImg, finalPath)

    return uniqueName
}

export const deleteImg = (filename) => {
    const pathImg = path.join(DEST_IMG, filename)
    if (isExistsFile(pathImg)) {
        fs.unlinkSync(pathImg)
    }
}

export const updateImg = (currentFilename, nextImgPath) => {
    deleteImg(currentFilename)
    const newFilename = saveImg(nextImgPath)
    return newFilename
}

export const handleUpdateImage = (existingProduct, productData) => {
    const isImageProvided = Boolean(productData.img)

    if (!isImageProvided && existingProduct.img) {
        deleteImg(existingProduct.img)
        return null
    }

    const newImageName = path.basename(productData.img)

    if (isImageProvided && existingProduct.img !== newImageName) {
        return updateImg(existingProduct.img, productData.img)
    }

    return productData.img
}


export const handleSaveImg = (path) => {
    if (path) {
        return saveImg(path)
    }
    return null
}

export const handleCreateInitialStock = async (product, transaction) => {

    if (product.currentStock <= 0) {
        return
    }

    const initStockMovement = {
        type: Stocktypes.INPUT,
        quantity: product.currentStock,
        priceUnit: product.priceCost,
        total: product.currentStock * product.priceCost,
        category: StockCategory.INITIAL_STOCK,
        description: "ESTOQUE INICIAL",
        productId: product.id,
    }

    await db.StockMovement.create(initStockMovement, { transaction })
}


export const handleUniqueFields = async (productData) => {
    if (await existsProductBy({ name: productData.name })) {
        throw new EntityAlreadyExistsError('Já existe um produto com esse nome.')
    }

    if (await existsProductBy({ code: productData.code })) {
        throw new EntityAlreadyExistsError('Já existe um produto com esse código.')
    }
}

export const handleUniqueFieldsInUpdate = async (existingProduct, productData) => {
    const isNameChanged = existingProduct.name !== productData.name
    const isCodeChanged = existingProduct.code !== productData.code


    if (isNameChanged && await existsProductBy({ name: productData.name })) {
        throw new EntityAlreadyExistsError('Já existe um produto com esse nome.')
    }

    if (isCodeChanged && await existsProductBy({ code: productData.code })) {
        throw new EntityAlreadyExistsError('Já existe um produto com esse código.')
    }
}



export const handleAdjustStock = async ({ existingProduct, productData, transaction }) => {
    const adjustQty = productData.currentStock - existingProduct.currentStock

    if (adjustQty === 0) {
        return
    }

    const type = adjustQty > 0 ? 'INPUT' : 'OUTPUT';

    const stockMovement = {
        productId: productData.id,
        type,
        category: StockCategory.ADJUSTMENT,
        quantity: Math.abs(adjustQty),
        description: 'Ajuste de quantidade manual',
        priceUnit: productData.priceCost,
        total: productData.priceCost * Math.abs(adjustQty)
    }

    await db.StockMovement.create(stockMovement, { transaction })
}