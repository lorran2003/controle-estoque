import { EntityNotFound } from "../erros/EntityNotFoundError.js"
import { StockAdjustmentError } from "../erros/StockAdjustmentError.js"
import db from "../database/db.js"
import { adjustStock } from "../util/stockMovementHelper.js"
import { Op } from "sequelize"


export const create = async (event, stockMovementData) => {
    const transaction = await db.sequelize.transaction()
    try {
        const product = await db.Product.findByPk(stockMovementData.productId)

        if (!product) {
            throw new EntityNotFound('Produto associado não encontrado.')
        }

        const { type, quantity } = stockMovementData

        const newStock = adjustStock(product.currentStock, type, quantity)

        if (newStock < 0) {
            throw new StockAdjustmentError('O movimento causaria um estoque negativo.')
        }

        await product.update({ currentStock: newStock }, { transaction })

        const smCreated = await db.StockMovement.create(stockMovementData, {
            transaction
        })

        await transaction.commit()
        return smCreated.dataValues
    } catch (error) {
        await transaction.rollback()
        throw error
    }
}

export const findById = async (event, id) => {
    const stockMovementFound = await db.StockMovement.findByPk(id)

    if (!stockMovementFound) {
        throw new EntityNotFound("Não existe Movimento de Estoque com esse id")
    }

    return stockMovementFound.dataValues
}

export const findByProductId = async (event, productId, page = 1, limit = 10) => {
    const offset = (page - 1) * limit
    const stockMovements = await db.StockMovement.findAll({
        where: { productId },
        limit,
        offset,
    })
    return stockMovements.map(sm => sm.dataValues)
}

export const update = async (event, stockMovementData) => {
    const transaction = await db.sequelize.transaction()
    try {
        const { id } = stockMovementData
        const existingStockMovement = await db.StockMovement.findByPk(id)

        if (!existingStockMovement) {
            throw new EntityNotFound("Não existe Movimento de Estoque com esse id")
        }

        const product = await db.Product.findByPk(existingStockMovement.productId)

        if (!product) {
            throw new EntityNotFound('Produto associado não encontrado.')
        }

        const { type: esmType, quantity: esmQty } = existingStockMovement
        const adjustedStock = adjustStock(product.currentStock, esmType, -esmQty)

        const { type: smdType, quantity: smdQty } = stockMovementData
        const newStock = adjustStock(adjustedStock, smdType, smdQty)

        if (newStock < 0) {
            throw new StockAdjustmentError('O movimento causaria um estoque negativo.')
        }

        await product.update({ currentStock: newStock }, { transaction })
        await existingStockMovement.update(stockMovementData, { transaction })

        await transaction.commit()
        return existingStockMovement.dataValues
    } catch (error) {
        await transaction.rollback()
        throw error
    }
}

export const destroy = async (event, id) => {
    const transaction = await db.sequelize.transaction()
    try {
        const stockMovementFound = await db.StockMovement.findByPk(id)

        if (!stockMovementFound) {
            throw new EntityNotFound("Não existe Movimento de Estoque com esse id")
        }

        const product = await db.Product.findByPk(stockMovementFound.productId)

        if (!product) {
            throw new EntityNotFound('Produto associado não encontrado.')
        }

        const { type, quantity } = stockMovementFound
        const newStock = adjustStock(product.currentStock, type, -quantity)

        await product.update({ currentStock: newStock }, { transaction })
        await stockMovementFound.destroy({ transaction })

        await transaction.commit()
        return stockMovementFound.dataValues
    } catch (error) {
        await transaction.rollback()
        throw error
    }
}

export const findAll = async (event, page = 1, limit = 10) => {
    const offset = (page - 1) * limit
    const stockMovements = await db.StockMovement.findAll({
        limit,
        offset,
    })
    return stockMovements.map(sm => sm.dataValues)
}

export const findByDateRange = async (event, startDate, endDate, page = 1, limit = 10) => {
    const offset = (page - 1) * limit
    const stockMovements = await db.StockMovement.findAll({
        where: {
            createdAt: {
                [Op.between]: [startDate, endDate],
            },
        },
        limit,
        offset,
    })
    return stockMovements.map(sm => sm.dataValues)
}