import db from "../database/db"
import path from 'path'
import { DEST_IMG } from "./path"
import CustomError from "./CustomError"
import fs from 'fs'


export const existsProductBy = async (attributes) =>
    db.Product.findOne({ where: { ...attributes } })

export const isExistsFile = (path) => {
    return fs.existsSync(path)
}

export const saveImg = (pathImg) => {
    try {
        if (!isExistsFile(pathImg)) {
            throw new CustomError('Arquivo de origem não existe')
        }

        const fileName = path.basename(pathImg)
        const ext = path.extname(fileName)
        const baseName = path.basename(fileName, ext)
        const uniqueName = `${baseName}-${Date.now()}${ext}`
        const finalPath = path.join(DEST_IMG, uniqueName)

        fs.copyFileSync(pathImg, finalPath)

        return uniqueName
    } catch (error) {
        if (error instanceof CustomError) {
            throw error
        }
        console.log(error)
        throw new CustomError('Erro ao salvar imagem!')
    }
}

export const deleteImg = (filename) => {
    try {
        const pathImg = path.join(DEST_IMG, filename)

        if (isExistsFile(pathImg)) {
            fs.unlinkSync(pathImg)
        }

    } catch (error) {
        console.log(error)
        throw new CustomError("Erro ao deletar Imagem do produto")
    }
}

export const updateImg = (currentFilename, nextImgPath) => {
    deleteImg(currentFilename)
    const newFilename = saveImg(nextImgPath)
    return newFilename
}



export const handleProductImageUpdate = (existingProduct, validatedProductData) => {
    const isImageProvided = Boolean(validatedProductData.img)

    if (!isImageProvided && existingProduct.img) {
        deleteImg(existingProduct.img)
        return null
    }

    const newImageName = path.basename(validatedProductData.img)

    if (isImageProvided && existingProduct.img !== newImageName) {
        return updateImg(existingProduct.img, validatedProductData.img)
    }

    return validatedProductData.img
}