import db from "../database/db"
import path from 'path'
import {DEST_DIR} from "./path"
import { updateImg } from "./fs"
import CustomError from "./CustomError"


export const existsProductBy = async (attributes) =>
    db.Product.findOne({ where: { ...attributes } })

export const validateProductNameChange = async (existingProduct, validatedProductData) => {
    const isNameChanged = existingProduct.name !== validatedProductData.name

    if (isNameChanged && await existsProductBy({ name: validatedProductData.name })) {
        throw new CustomError('Já existe um produto com esse nome.')
    }
}

export const validateProductCodeChange = async (existingProduct, validatedProductData) => {
    const isCodeChanged = existingProduct.code !== validatedProductData.code

    if (isCodeChanged && await existsProductBy({ code: validatedProductData.code })) {
        throw new CustomError('Já existe um produto com esse código.')
    }
}

export const handleProductImageUpdate = (existingProduct, validatedProductData) => {
    const isImageProvided = Boolean(validatedProductData.img)
    const currentImagePath = path.join(DEST_DIR, existingProduct.img)

    if (!isImageProvided && existingProduct.img) {
        deleteImg(currentImagePath)
        return null
    }

    const newImageName = path.basename(validatedProductData.img)
    if (isImageProvided && existingProduct.img !== newImageName) {
        return updateImg(currentImagePath, validatedProductData.img)
    }

    return validatedProductData.img
}