import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import db from "../../../src/main/database/db";
import * as productBusiness from "../../../src/main/business/productBusiness";
import * as stockMovementBusiness from "../../../src/main/business/stockMovementBusiness";
import path from 'path'
import fs from 'fs/promises'
import { DEST_IMG } from "../../../src/main/util/path";
import { StockCategory, Stocktypes } from "../../../src/shared/stockEnums";

describe('Product business', () => {
    let productValid = null
    let invalidCode = null
    let validCode = null
    let idProductNotExists = null
    let pathImg = null
    let updatePathImg = null
    let otherProductValid = null
    let initStock = null


    afterAll(async () => {
        const files = await fs.readdir(DEST_IMG)

        files.forEach(async (file) => {
            await fs.unlink(path.join(DEST_IMG, file))
        })
    })

    beforeAll(async () => {
        await db.sequelize.sync({force:true})
    })

    beforeEach(async () => {
        invalidCode = 'AAA12'
        validCode = 'AAA123'
        idProductNotExists = 999

        pathImg = path.join(__dirname, '..', '..', 'img', 'banana.jpeg')
        updatePathImg = path.join(__dirname, '..', '..', 'img', 'water.jpg')

        productValid = {
            name: 'water',
            code: validCode,
            img: pathImg,
            priceSale: 500,
            priceCost: 200,
            currentStock: 20,
            minimumStock: 5,
        }

        initStock = {
            type: Stocktypes.INPUT,
            priceUnit: productValid.priceCost,
            quantity: 20,
            category: StockCategory.INITIAL_STOCK,
            description:"ESTOQUE INICIAL",
            total: productValid.currentStock * productValid.priceCost
        }

        otherProductValid = { ...productValid, name: 'potato', code: 'CCCCCC' } 
    })

    afterEach(async () => {
        await db.sequelize.truncate()
    } )

    describe("create()", () => {

        it("should create product", async () => {
            const product = await productBusiness.create(null, productValid)
            expect(product).toMatchObject(productValid)
            const [movement] = await stockMovementBusiness.findByProductId(null, product.id)
            expect(movement).toMatchObject(initStock)
        })

        it("should throw an error if a product with the same name already exists", async () => {
            await productBusiness.create(null, productValid)

            const newProduct = { ...productValid, code: "BBBBBB" }
            expect(productBusiness.create(null, newProduct))
                .rejects.toThrow('Já existe um produto com esse nome.')
        })

        it("should throw an error if a product with the same code already exists", async () => {
            await productBusiness.create(null, productValid)

            const newProduct = { ...productValid, name: "other name" }
            expect(productBusiness.create(null, newProduct))
                .rejects.toThrow('Já existe um produto com esse código.')
        })

    })

    describe("findById()", () => {

        it("should found a product", async () => {
            const pCreated = await productBusiness.create(null, productValid)
            const pFound = await productBusiness.findById(null, pCreated.id)

            expect(pCreated).toEqual(pFound)
        })

        it("should look for a product that doesn't exist", async () => {
            expect(productBusiness.findById(999))
                .rejects.toThrow("Não existe Produto com esse id")
        })
    })

    describe("findByCode()", () => {

        it("should found a product", async () => {
            const pCreated = await productBusiness.create(null, productValid)
            const pFound = await productBusiness.findByCode(null, pCreated.code)

            expect(pCreated).toEqual(pFound)
        })

        it("should look for a product that doesn't exist", async () => {
            expect(productBusiness.findByCode(null, validCode))
                .rejects.toThrow("Não existe Produto com esse código")
        })
    })

    describe("findByName()", () => {

        it("should found products", async () => {
            const p1 = await productBusiness.create(null, productValid)
            const p2 = await productBusiness.create(null, {
                ...otherProductValid,
                name: 'water2',
            })
            const products = await productBusiness.findByName(null, 'wa')
            expect(products).toEqual([p1, p2])
        })

        it("should look for a product that doesn't exist", async () => {
            expect(productBusiness.findByName(null, '')).resolves.toEqual([])
        })
    })


    describe("destroy()", () => {
        it("should destroy product", async () => {
            const { id } = await productBusiness.create(null, productValid)
            const productFound = await productBusiness.findById(null, id)

            expect(productFound).toMatchObject(productValid)

            expect(stockMovementBusiness.findByProductId(null, id))
                .resolves.length(1)

            await productBusiness.destroy(null, id)

            expect(productBusiness.findById(null, id))
                .rejects.toThrow("Não existe Produto com esse id")

            expect(stockMovementBusiness.findByProductId(null, id))
                .resolves.toEqual([])
        })

        it("should destroy a products with invalid id", () => {
            expect(productBusiness.destroy(null, 999))
                .rejects.toThrow("Não existe Produto com esse id")
        })
    })

    describe("update()", () => {
        it("should update product", async () => {
            const { id } = await productBusiness.create(null, productValid)

            productValid.img = updatePathImg
            productValid.currentStock = 100
            const productToUpate = { ...productValid, id }

            const productUpdated = await productBusiness.update(null, productToUpate)

            expect(productUpdated).toMatchObject(productToUpate)
            const movements = await stockMovementBusiness.findByProductId(null, id)

            const adjustStock = {
                type: "INPUT",
                quantity: 80,
                category:StockCategory.ADJUSTMENT,
                description:"Ajuste de quantidade manual",
                priceUnit: productValid.priceCost,
                total: productValid.priceCost * 80
            }

            expect(movements[0]).toMatchObject(initStock)
            expect(movements[1]).toMatchObject(adjustStock)
        })

        it("should update product", async () => {
            const { id } = await productBusiness.create(null, productValid)

            productValid.img = updatePathImg
            productValid.currentStock = 10
            const productToUpate = { ...productValid, id }

            const productUpdated = await productBusiness.update(null, productToUpate)

            expect(productUpdated).toMatchObject(productToUpate)
            const movements = await stockMovementBusiness.findByProductId(null, id)

            const adjustStock = {
                type:Stocktypes.OUTPUT,
                quantity: 10,
                category:StockCategory.ADJUSTMENT,
                description:"Ajuste de quantidade manual",
                priceUnit: productValid.priceCost,
                total: productValid.priceCost * 10
            }

            expect(movements[0]).toMatchObject(initStock)
            expect(movements[1]).toMatchObject(adjustStock)
        })

        it("should update a product that doesn't exist", async () => {
            expect(productBusiness.update(null, { id: 999 }))
                .rejects.toThrow("Não existe Produto com esse id")
        })

        it("shouldn't update a product with existing name", async () => {
            await productBusiness.create(null, productValid)
            const pCreated = await productBusiness.create(null, otherProductValid)

            pCreated.name = productValid.name

            expect(productBusiness.update(null, pCreated))
                .rejects.toThrow("Já existe um produto com esse nome.")
        })

        it("shouldn't update a product with existing code", async () => {
            await productBusiness.create(null, productValid)
            const pCreated = await productBusiness.create(null, otherProductValid)

            pCreated.code = productValid.code
            expect(productBusiness.update(null, pCreated))
                .rejects.toThrow("Já existe um produto com esse código.")
        })
    })

    describe("findAll()", () => {
        it("should found products", async () => {
            expect(productBusiness.findAll()).resolves.toEqual([])
            const p1 = await productBusiness.create(null, productValid)
            const p2 = await productBusiness.create(null, otherProductValid)
            expect(productBusiness.findAll()).resolves.toEqual([p1, p2])
        })
    })
})