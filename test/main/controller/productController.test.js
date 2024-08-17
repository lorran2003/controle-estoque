import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import db from "../../../src/main/database/db";
import productController from "../../../src/main/controller/productController";




describe('Product controller', () => {
    let productValid = null
    let invalidCode = null
    let validCode = null
    const { findById, create, findByCode } = productController


    beforeAll(async () => {
        await db.sequelize.sync({ force: true })
    })

    beforeEach(async () => {
        invalidCode = 'AAA12'
        validCode = 'AAA123'

        productValid = {
            name: 'water',
            code: validCode,
            img: 'test/path',
            priceSale: 500,
            priceCost: 200,
            stock: 20
        }

        await db.sequelize.truncate()
    })

    describe('create()', () => {

        it('should create product', async () => {
            const sucessReponse = {
                error: false,
                msg: 'Produto Criado com Sucesso',
                data: productValid
            }

            const response = await create(null, productValid)

            expect(response).toMatchObject(sucessReponse)
        })

        it("shouldn't create a product", async () => {
            const productInvalid = {
                name: 'water',
                code: 'AAA12', // invalid code it does not have 6 characters
                img: 'test/path',
                priceSale: 500,
                priceCost: 200,
                stock: 20
            }

            const response = await create(null, productInvalid)

            const errorReponse = {
                error: true,
                data: null,
                msg: 'O código deve ter exatamente 6 caracteres.'
            }
            expect(response).toEqual(errorReponse)
        })
    })


    describe('findById()', () => {

        it('should found a product', async () => {
            const { data: productCreated } = await create(null, productValid)
            const { data: productFound } = await findById(null, productCreated.id)
            expect(productCreated).toEqual(productFound)
        })

        it("should look for a product that doesn't exist", async () => {
            const idProductNotExists = 999
            const response = await findById(null, idProductNotExists)


            const errorReponse = {
                error: true,
                msg: "Não existe Produto com esse id",
                data: null
            }

            expect(response).toEqual(errorReponse)
        })

        it("should look for product with invalid ID", async () => {
            const idInvalid = -100
            const response = await findById(null, idInvalid)

            const errorReponse = {
                error: true,
                msg: "O valor deve ser maior que 0",
                data: null
            }

            expect(response).toEqual(errorReponse)
        })


    })


    describe('findByCode()', () => {

        it("should found a product", async () => {
            const { data: productCreated } = await create(null, productValid)
            const code = productCreated.code
            const { data: productFound } = await findByCode(null, code)

            expect(productCreated).toEqual(productFound)
        })

        it("should look for product with invalid code", async () => {
            const response = await findByCode(null, invalidCode)


            const errorResponse = {
                error: true,
                msg: 'O código deve ter exatamente 6 caracteres.',
                data: null
            }

            expect(response).toEqual(errorResponse)
        })

        it("should look for a product that doesn't exist", async () => {
            const response = await findByCode(null, validCode)


            const errorResponse = {
                error: true,
                msg: 'Não existe Produto com esse código',
                data: null
            }

            expect(response).toEqual(errorResponse)
        })

    })


})