import { describe, it, beforeAll, afterEach, expect, beforeEach } from "vitest"
import db from "../../../src/main/database/db"
import * as stockMovementBusiness from "../../../src/main/business/stockMovementBusiness"
import * as productBusiness from "../../../src/main/business/productBusiness"
import { StockCategory, Stocktypes } from "../../../src/shared/stockEnums"

describe("Stock Movement Business", () => {
    let product = {}
    const invalidId = 0
    let inputMovement1 = {}
    let inputMovement2 = {}
    let inputMovement3 = {}
    let outputMovement1 = {}
    let outputMovement2 = {}

    beforeAll(async () => {
        // Reset and initialize database
        await db.sequelize.sync({ force: true })
    })

    beforeEach(async () => {
        const productData = {
            name: 'book',
            code: 'ZZZZZZ',
            img: null,
            priceSale: 500,
            priceCost: 200,
            currentStock: 20,
            minimumStock: 5,
        }

        product = await productBusiness.create(null, productData)

        inputMovement1 = {
            productId: product.id,
            type: Stocktypes.INPUT,
            category: StockCategory.INVENTORY,
            description: null,
            quantity: 10,
            priceUnit: product.priceCost,
            total: product.priceCost * 10,
        }

        inputMovement2 = {
            productId: product.id,
            type: Stocktypes.INPUT,
            category: StockCategory.INVENTORY,
            description: null,
            quantity: 20,
            priceUnit: product.priceCost,
            total: product.priceCost * 20,
        }

        inputMovement3 = {
            productId: product.id,
            type: Stocktypes.INPUT,
            category: StockCategory.INVENTORY,
            description: null,
            quantity: 30,
            priceUnit: product.priceCost,
            total: product.priceCost * 30,
        }


        outputMovement1 = {
            productId: product.id,
            type: Stocktypes.OUTPUT,
            category: StockCategory.INVENTORY,
            description: null,
            quantity: 10,
            priceUnit: product.priceCost,
            total: product.priceCost * 10,
        }

        outputMovement2 = {
            productId: product.id,
            type: Stocktypes.OUTPUT,
            category: StockCategory.INVENTORY,
            description: null,
            quantity: 20,
            priceUnit: product.priceCost,
            total: product.priceCost * 20,
        }
    })

    afterEach(async () => {
        await db.sequelize.truncate()
    })

    describe('create()', () => {

        it('should create an input stock movement', async () => {
            const { currentStock: previousStock } = await productBusiness.findById(null, product.id)
            const movementCreated = await stockMovementBusiness.create(null, inputMovement1)

            expect(movementCreated).toBeDefined()
            expect(movementCreated).toMatchObject(inputMovement1)

            const expectedStock = previousStock + inputMovement1.quantity

            const { currentStock } = await productBusiness.findById(null, product.id)

            expect(currentStock).toBe(expectedStock)
        })

        it('should create an output stock movement', async () => {
            const { currentStock: previousStock } = await productBusiness.findById(null, product.id)
            const movementCreated = await stockMovementBusiness.create(null, outputMovement1)

            expect(movementCreated).toBeDefined()
            expect(movementCreated).toMatchObject(outputMovement1)

            const expectedStock = previousStock - outputMovement1.quantity

            const { currentStock } = await productBusiness.findById(null, product.id)

            expect(currentStock).toBe(expectedStock)
        })

        it('should not create a stock movement for a non-existent product', async () => {
            // Set an invalid productId
            inputMovement1.productId = invalidId

            await expect(stockMovementBusiness.create(null, inputMovement1))
                .rejects
                .toThrow('Produto associado não encontrado.')
        })

        it('should throw an error if the output causes negative stock', async () => {
            outputMovement1.quantity = 9999

            await expect(stockMovementBusiness.create(null, outputMovement1))
                .rejects
                .toThrow('O movimento causaria um estoque negativo.')
        })
    })



    describe('findById()', () => {

        it('should find a stock movement', async () => {
            const { id } = await stockMovementBusiness.create(null, outputMovement1)
            const stockMovementFound = await stockMovementBusiness.findById(null, id)
            expect(stockMovementFound).toMatchObject(outputMovement1)
        })


        it('should find a stock movement not exists', async () => {
            expect(stockMovementBusiness.findById(invalidId))
                .rejects.toThrow("Não existe Movimento de Estoque com esse id")
        })

    })

    describe('findByProductId()', () => {
        it('should find stock movements', async () => {
            await stockMovementBusiness.create(null, inputMovement1)
            await stockMovementBusiness.create(null, outputMovement1)

            const movements = await stockMovementBusiness.findByProductId(null, product.id)

            expect(movements).toEqual(expect.arrayContaining([
                expect.objectContaining({type:inputMovement1.type,quantity:inputMovement1.quantity}),
                expect.objectContaining({type:outputMovement1.type,quantity:outputMovement1.quantity})
            ]))
        })
    })
})

