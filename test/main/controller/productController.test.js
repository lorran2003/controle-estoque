import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import db from "../../../src/main/database/db";
import productController from "../../../src/main/controller/productController";


describe('Product controller', () => {
    let productValid = null
    let invalidCode = null
    let validCode = null
    let idProductNotExists = null

    const { findById, create, findByCode, findByName, destroy, update } = productController


    beforeAll(async () => {
        await db.sequelize.sync({ force: true })
    })

    beforeEach(async () => {
        invalidCode = 'AAA12'
        validCode = 'AAA123'
        idProductNotExists = 999

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


    describe("findByName()", () => {

        it("should found products", async () => {
            const { data: productCreated } = await create(null, productValid)
            const response = await findByName(null, productValid.name)

            const sucessReponse = {
                error: false,
                data: [productCreated],
                msg: 'Products found'
            }

            expect(response).toEqual(sucessReponse)
        })

        it("should look for products with invalid name", async () => {
            const invalidName = 123
            const response = await findByName(null, invalidName)


            const errorResponse = {
                error: true,
                data: null,
                msg: 'O nome deve ser uma string.'
            }


            expect(response).toEqual(errorResponse)
        })

        it("should look for a products that doesn't exist", async () => {
            const name = ''
            const response = await findByName(null, name)

            const sucessReponse = {
                error: false,
                data: [],
                msg: 'Products found'
            }

            expect(response).toEqual(sucessReponse)
        })
    })


    describe('destroy()', () => {


        it("should destroy product", async () => {
            const { data: productCreated } = await create(null, productValid)

            const { data: productRemoved, msg } = await destroy(null, productCreated.id)

            expect(productCreated).toEqual(productRemoved)

            const response = await findById(null, productCreated.id)


            const errorReponse = {
                error: true,
                data: null,
                msg: "Não existe Produto com esse id"
            }

            expect(response).toEqual(errorReponse)
        })

        it("should destroy a products with invalid id", async () => {
            const idInvalid = -999
            const response = await destroy(null, idInvalid)

            const errorReponse = {
                error: true,
                data: null,
                msg: "O valor deve ser maior que 0"
            }

            expect(response).toEqual(errorReponse)
        })


        it("should destroy a product that doesn't exist", async () => {

            const response = await destroy(null, idProductNotExists)

            const errorReponse = {
                error: true,
                data: null,
                msg: "Não existe Produto com esse id"
            }

            expect(response).toEqual(errorReponse)
        })
    })


    describe("update()", () => {

        it("should update product", async () => {
            const { data: productCreated } = await create(null, productValid)

            const previousProduct = { ...productCreated }

            productValid.id = productCreated.id
            productValid.name = "new name"
            productValid.code = "BBB123"
            productValid.stock = 100
            productValid.priceSale = 200
            productValid.priceCost = 100

            const { data: productUpdated } = await update(null, productValid)

            expect(productUpdated).toMatchObject(productValid)
            expect(productUpdated).not.toEqual(previousProduct)
        })

        it("should update a invalid product", async () => {
          const {data:productCreated} =  await create(null,productValid)

          productCreated.name = '' // invalid name
          const response = await update(null,productCreated)

          const errorReponse = {
            error:true,
            msg: "O nome é obrigatório.",
            data:null
          }

          expect(response,errorReponse)
        })

        it("should update a product that doesn't exist", async () => {
            const { data: productCreated } = await create(null, productValid)
            const {error} = await destroy(null,productCreated.id)

            expect(error).toBe(false)
            
            productValid.id = productCreated.id

            const response = await update(null,productValid)
            
            const errorResponse = {
                error:true,
                msg:"Não existe Produto com esse id",
                data:null
            }

            expect(response).toEqual(errorResponse)
        })

    })
})