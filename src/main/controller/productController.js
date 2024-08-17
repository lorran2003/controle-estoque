import db from "../database/db.js"
import { createProductValidator, destroyValidator, findByCodeValidator, findByIdValidator, findByNameValidator, updateValidator } from "../validator/productValidator.js"
import CustomError from "../util/CustomError.js"
import { Op } from '@sequelize/core';

const getInternalErrorResponse = () =>
  ({ error: true, msg: 'Erro Interno', data: null })

const getCustomErrorResponse = (error) =>
  ({ error: true, msg: error.message, data: null })


const create = async (event, productData) => {
  try {

    const { error, value: productValid } = createProductValidator(productData)

    if (error) {
      throw new CustomError(error.message)
    }

    const productCreated = await db.Product.create(productValid)

    const response = {
      error: false,
      msg: 'Produto Criado com Sucesso',
      data: productCreated.dataValues
    }

    return response
  } catch (error) {

    if (error instanceof CustomError) {
      return getCustomErrorResponse(error)
    }

    console.log(error)
    return getInternalErrorResponse()
  }
}

const findById = async (event, id) => {
  try {
    const { error, value: idValid } = findByIdValidator(id)

    if (error) {
      throw new CustomError(error.message)
    }

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
  } catch (error) {

    if (error instanceof CustomError) {
      return getCustomErrorResponse(error)
    }

    console.log(error)
    return getInternalErrorResponse()
  }
}

const findByCode = async (event, code) => {
  try {
    const { error, value: codeValid } = findByCodeValidator(code)

    if (error) {
      throw new CustomError(error.message)
    }

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
  } catch (error) {

    if (error instanceof CustomError) {
      return getCustomErrorResponse(error)
    }

    console.log(error)
    return getInternalErrorResponse()
  }
}


const findByName = async (event, name) => {
  try {
    const { error, value: nameValid } = findByNameValidator(name)

    if (error) {
      throw new CustomError(error.message)
    }

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
  } catch (error) {
    if (error instanceof CustomError) {
      return getCustomErrorResponse(error)
    }

    console.log(error)
    return getInternalErrorResponse()
  }

}

export const destroy = async (event, id) => {
  try {
    const { error, value: idValid } = destroyValidator(id)

    if (error) {
      throw new CustomError(error.message)
    }

    const productFound = await db.Product.findByPk(idValid)

    if (!productFound) {
      throw new CustomError("Não existe Produto com esse id")
    }

    await productFound.destroy()

    const response = {
      error: false,
      data: productFound.dataValues,
      msg: "Produto deletado com sucesso"
    }

    return response
  } catch (error) {
    if (error instanceof CustomError) {
      return getCustomErrorResponse(error)
    }

    console.log(error)
    return getInternalErrorResponse()
  }
}

export const update = async (event, product) => {
  try {
    const { error, value: productValid } = updateValidator(product)

    if (error) {
      throw new CustomError(error.message)
    }

    const productFound = await db.Product.findByPk(productValid.id)

    if (!productFound) {
      throw new CustomError("Não existe Produto com esse id")
    }

    await productFound.update(productValid)

    const response = {
      error: false,
      msg: "Produto atualizado com sucesso",
      data: productFound.dataValues
    }

    return response
  } catch (error) {
    if (error instanceof CustomError) {
      return getCustomErrorResponse(error)
    }

    console.log(error)
    return getInternalErrorResponse()
  }
}


const findAll = async (event) => {
  try {
    const products = await db.Product.findAll()

    const response = {
      error: false,
      msg: 'Products Found',
      data: products.map(p => p.dataValues)
    }
    return response

  } catch (error) {
    console.log(error)
    return getInternalErrorResponse()
  }
}




export default {
  create,
  findById,
  findByCode,
  findByName,
  destroy,
  update,
  findAll
}