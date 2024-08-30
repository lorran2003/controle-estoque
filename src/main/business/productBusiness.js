import { handleProductImageUpdate, existsProductBy, deleteImg, saveImg } from "../util/productHelper.js"
import CustomError from "../util/CustomError.js"
import db from "../database/db.js"
import { Op } from "sequelize"
import { StockCategory, Stocktypes } from "../../shared/stockEnums.js"

export const create = async (event, productData) => {
  const transaction = await db.sequelize.transaction()

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

  try {
    const productCreated = await db.Product.create(productData, { transaction })

    if (productData.currentStock > 0) {

      const initStockMovement = {
        type: Stocktypes.INPUT,
        quantity: productCreated.currentStock,
        priceUnit: productCreated.priceCost,
        total: productCreated.currentStock * productCreated.priceCost,
        category: StockCategory.INITIAL_STOCK,
        description: "ESTOQUE INICIAL",
        productId: productCreated.id,
      }

      await db.StockMovement.create(initStockMovement, { transaction })
    }

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
  const query = { name: { [Op.like]: `%${name}%` } }

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
  const transaction = await db.sequelize.transaction()
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

  productData.img = newFilename

  try {

    const adjustQty = productData.currentStock - existingProduct.currentStock
   
    await existingProduct.update(productData, { transaction })
    if (adjustQty !== 0) {

      const adjustStock = {
        productId: productData.id,
        type: adjustQty > 0 ? Stocktypes.INPUT : Stocktypes.OUTPUT,
        category: StockCategory.ADJUSTMENT,
        quantity: Math.abs(adjustQty),
        description: "Ajuste de quantidade manual",
        priceUnit: productData.priceCost,
        total: productData.priceCost *  Math.abs(adjustQty)
      }

      await db.StockMovement.create(adjustStock, { transaction })
    }

    await transaction.commit()
    return existingProduct.dataValues
  } catch (error) {
    await transaction.rollback()
    throw error
  }

}

export const findAll = async (event) => {
  const products = await db.Product.findAll()
  return products.map(p => p.dataValues)
}