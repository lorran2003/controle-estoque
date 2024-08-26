import { handleProductImageUpdate, existsProductBy, deleteImg, saveImg } from "../util/productHelper.js"
import CustomError from "../util/CustomError.js"
import db from "../database/db.js"
import { Op } from '@sequelize/core'

export const create = async (event, productData) => {
  if (await existsProductBy({ name: productData.name })) {
    throw new CustomError('Já existe um produto com esse nome.')
  }

  if (await existsProductBy({ code: productData.code })) {
    throw new CustomError('Já existe um produto com esse código.')
  }

  if (productData.img) {
    const filename = saveImg(productData.img)
    productData.img = filename
  }

  const productCreated = await db.Product.create(productData)

  return productCreated.dataValues
}

export const findById = async (event, id) => {
  const productFound = await db.Product.findByPk(id)

  if (!productFound) {
    throw new CustomError("Não existe Produto com esse id")
  }

  return productFound.dataValues
}

export const findByCode = async (event, code) => {
  const productFound = await db.Product.findOne({ where: { code } })

  if (!productFound) {
    throw new CustomError("Não existe Produto com esse código")
  }

  return productFound.dataValues
}

export const findByName = async (event, name) => {
  const query = { name: { [Op.like]: name } }

  const products = await db.Product.findAll({ where: query })

  return products.map(p => p.dataValues)
}

export const destroy = async (event, id) => {
  const productFound = await db.Product.findByPk(id)

  if (!productFound) {
    throw new CustomError("Não existe Produto com esse id")
  }

  deleteImg(productFound.img)

  await productFound.destroy()

  return productFound.dataValues
}

export const update = async (event, productData) => {
  const existingProduct = await db.Product.findByPk(productData.id)

  if (!existingProduct) {
    throw new CustomError("Não existe Produto com esse id")
  }

  const isNameChanged = existingProduct.name !== productData.name
  const isCodeChanged = existingProduct.code !== productData.code

  if (isNameChanged && await existsProductBy({ name: productData.name })) {
    throw new CustomError('Já existe um produto com esse nome.')
  }

  if (isCodeChanged && await existsProductBy({ code: productData.code })) {
    throw new CustomError('Já existe um produto com esse código.')
  }

  const newFilename = handleProductImageUpdate(existingProduct, productData)

  existingProduct.img = newFilename

  await existingProduct.update(productData)

  return existingProduct.dataValues
}

export const findAll = async (event) => {
  const products = await db.Product.findAll()
  return products.map(p => p.dataValues)
}