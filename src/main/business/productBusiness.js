import { createProductValidator, destroyValidator, findByCodeValidator, findByIdValidator, findByNameValidator, updateValidator } from "../validator/productValidator.js"
import { handleProductImageUpdate, existsProductBy, deleteImg, saveImg, getCustomErrorResponse, getInternalErrorResponse } from "../util/productHelper.js"
import CustomError from "../util/CustomError.js"
import db from "../database/db.js"
import { Op } from '@sequelize/core'
import handleValidator from "../util/handleValidator.js"

export const create = async (event, productData) => {
  const productValid = handleValidator(createProductValidator, productData)

  if (await existsProductBy({ name: productValid.name })) {
    throw new CustomError('Já existe um produto com esse nome.');
  }

  if (await existsProductBy({ code: productValid.code })) {
    throw new CustomError('Já existe um produto com esse código.');
  }

  if (productValid.img) {
    const filename = saveImg(productValid.img)
    productValid.img = filename
  }

  const productCreated = await db.Product.create(productValid)

  const response = {
    error: false,
    msg: 'Produto Criado com Sucesso',
    data: productCreated.dataValues
  }

  return response
}

export const findById = async (event, id) => {
  const idValid = handleValidator(findByIdValidator, id)
  const productFound = await db.Product.findByPk(idValid)

  if (!productFound) {
    throw new CustomError("Não existe Produto com esse id")
  }

  const response = {
    error: false,
    msg: "Produto encontrado",
    data: productFound.dataValues
  }

  return response
}

export const findByCode = async (event, code) => {
  const codeValid = handleValidator(findByCodeValidator, code)
  const productFound = await db.Product.findOne({ where: { code: codeValid } })

  if (!productFound) {
    throw new CustomError("Não existe Produto com esse código")
  }

  const response = {
    error: false,
    msg: "Produto encontrado",
    data: productFound.dataValues
  }

  return response
}


export const findByName = async (event, name) => {
  const nameValid = handleValidator(findByNameValidator, name)

  const query = {
    name: { [Op.like]: nameValid }
  }

  const products = await db.Product.findAll({ where: query })

  const response = {
    error: false,
    msg: 'Products found',
    data: products.map(p => p.dataValues)
  }

  return response
}

export const destroy = async (event, id) => {
  const idValid = handleValidator(destroyValidator, id)
  const productFound = await db.Product.findByPk(idValid)

  if (!productFound) {
    throw new CustomError("Não existe Produto com esse id")
  }

  deleteImg(productFound.img)

  await productFound.destroy()

  const response = {
    error: false,
    data: productFound.dataValues,
    msg: "Produto deletado com sucesso"
  }

  return response
}

export const update = async (event, productData) => {
  const productValid = handleValidator(updateValidator, productData)
  const existingProduct = await db.Product.findByPk(productValid.id)

  if (!existingProduct) {
    throw new CustomError("Não existe Produto com esse id")
  }

  const isNameChanged = existingProduct.name !== productValid.name

  if (isNameChanged && await existsProductBy({ name: productValid.name })) {
    throw new CustomError('Já existe um produto com esse nome.')
  }

  const isCodeChanged = existingProduct.code !== productValid.code

  if (isCodeChanged && await existsProductBy({ code: productValid.code })) {
    throw new CustomError('Já existe um produto com esse código.')
  }

  const newFilename = handleProductImageUpdate(existingProduct, productValid)

  existingProduct.img = newFilename

  await existingProduct.update(productValid)

  const response = {
    error: false,
    msg: "Produto atualizado com sucesso",
    data: existingProduct.dataValues,
  }

  return response
}

export const findAll = async (event) => {
  const products = await db.Product.findAll()

  const response = {
    error: false,
    msg: 'Produtos Encontrados!',
    data: products.map(p => p.dataValues)
  }
  return response
}