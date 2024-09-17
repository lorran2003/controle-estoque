import { handleUpdateImage, deleteImg, handleSaveImg, handleCreateInitialStock,handleAdjustStock, handleUniqueFields,handleUniqueFieldsInUpdate } from "../helper/productHelper.js"
import { EntityNotFound } from "../erros/EntityNotFoundError.js"
import db from "../database/db.js"
import { Op } from "sequelize"

export const create = async (event, productData) => {
  const transaction = await db.sequelize.transaction()

  await handleUniqueFields(productData)

  //set new filename img 
  productData.img = handleSaveImg(productData.img)

  try {
    const productCreated = await db.Product.create(productData, { transaction })
    await handleCreateInitialStock(productCreated, transaction)
    await transaction.commit()
    return productCreated.dataValues
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const findById = async (event, id) => {
  const productFound = await db.Product.findByPk(id)

  if (!productFound) {
    throw new EntityNotFound("Não existe Produto com esse id")
  }

  return productFound.dataValues
}

export const findByCode = async (event, code) => {
  const productFound = await db.Product.findOne({ where: { code } })

  if (!productFound) {
    throw new EntityNotFound("Não existe Produto com esse código")
  }

  return productFound.dataValues
}

export const findByName = async (event, name) => {
  const query = { name: { [Op.like]: `%${name}%` } }

  const products = await db.Product.findAll({ where: query })

  return products.map(p => p.dataValues)
}

export const destroy = async (event, id) => {
  const productFound = await db.Product.findByPk(id)

  if (!productFound) {
    throw new EntityNotFound("Não existe Produto com esse id")
  }

  deleteImg(productFound.img)
  await productFound.destroy()

  return productFound.dataValues
}

export const update = async (event, productData) => {
  const transaction = await db.sequelize.transaction()
  const existingProduct = await db.Product.findByPk(productData.id)

  if (!existingProduct) {
    throw new EntityNotFound("Não existe Produto com esse id")
  }

  await handleUniqueFieldsInUpdate(existingProduct,productData)

  // set new filename img
  productData.img =  handleUpdateImage(existingProduct, productData)

  try {
    await handleAdjustStock({ existingProduct, productData, transaction })
    await existingProduct.update(productData, { transaction })
    await transaction.commit()
    return existingProduct.dataValues
  } catch (error) {
    await transaction.rollback()
    throw error
  }

}

export const findAll = async (event) => {
  const products = await db.Product.findAll()
  return products.map((p) => p.dataValues)
}