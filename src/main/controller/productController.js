import db from "../database/db.js"
import { createProductValidator, findByCodeValidator, findByIdValidator } from "../validator/productValidator.js"
import CustomError from "../util/CustomError.js"


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
      return { error: true, msg: error.message, data: null }
    }

    console.log(error)
    return { error: true, msg: 'Erro Interno', data: null }
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
      return { error: true, msg: error.message, data: null }
    }

    console.log(error)
    return { error: true, msg: 'Erro Interno', data: null }
  }
}

const findByCode = async (event,code) => {
  try {
    const { error, value: codeValid } = findByCodeValidator(code)

    if (error) {
      throw new CustomError(error.message)
    }

    const productFound = await db.Product.findOne({where:{code:codeValid}})

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
      return { error: true, msg: error.message, data: null }
    }

    console.log(error)
    return { error: true, msg: 'Erro Interno', data: null }
  }
}




export default {
  create,
  findById,
  findByCode
}