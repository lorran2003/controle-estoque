import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import db from "../../../src/main/database/db";
import productController from "../../../src/main/controller/productController";
import path from 'path'
import fs from 'fs/promises'
import { ROOT_DIR } from "../../../src/main/util/path";


describe('Product controller', () => {
    let productValid = null
    let invalidCode = null
    let validCode = null
    let idProductNotExists = null
    let pathImg = null
    let updatePathImg = null
    let otherProductValid = null 

    const {
        findById,
        create,
        findByCode,
        findByName,
        destroy,
        update,
        findAll
    } = productController

    afterAll(async () => {
        const destPath = path.join(ROOT_DIR, 'resources', 'img')
        const files = await fs.readdir(path.join(ROOT_DIR, 'resources', 'img'))

        files.forEach(async (file) => {
            await fs.unlink(path.join(destPath, file))
        })
    })

    beforeAll(async () => {
        await db.sequelize.sync({ force: true })
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


        otherProductValid = {...productValid,name:'potato',code:'CCCCCC'}

        await db.sequelize.truncate()
    })

    describe('create()', () => {

        it('should create product', async () => {
            const { img: removedImg, ...attributes } = productValid

            const sucessReponse = {
                error: false,
                msg: 'Produto Criado com Sucesso',
                data: attributes
            }

            const response = await create(null, productValid)

            expect(response).toMatchObject(sucessReponse)
        })

        it('should throw an error if a product with the same name already exists', async () => {
            await create(null, productValid)
            const response = await create(null, { ...productValid, code: 'CCCCCC' })

            const errorReponse = {
                error: true,
                data: null,
                msg: 'Já existe um produto com esse nome.'
            }

            expect(errorReponse).toEqual(response)
        });

        it("should throw an error if a product with the same code already exists", async () => {
            await create(null, productValid)
            const response = await create(null, { ...productValid, name: 'New name' })

            const errorReponse = {
                error: true,
                data: null,
                msg: 'Já existe um produto com esse código.'
            }

            expect(errorReponse).toEqual(response)
        })

        it("shouldn't create a product", async () => {
            const productInvalid = {
                name: 'water',
                code: 'AAA12', // invalid code it does not have 6 characters
                img: 'test/path',
                priceSale: 500,
                priceCost: 200,
                currentStock: 20,
                minimumStock: 10
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

            productValid.id = productCreated.id
            productValid.name = "new name"
            productValid.code = "BBB123"
            productValid.currentStock = 100
            productValid.minimumStock = 20
            productValid.priceSale = 200
            productValid.priceCost = 100
            productValid.img = updatePathImg

            const response = await update(null, productValid)

            delete productValid.img

            const sucessReponse = {
                error: false,
                msg: "Produto atualizado com sucesso",
                data: productValid
            }

            expect(response).toMatchObject(sucessReponse)
        })

        it("should update a invalid product", async () => {
            const { data: productCreated } = await create(null, productValid)

            productCreated.name = '' // invalid name
            const response = await update(null, productCreated)

            const errorReponse = {
                error: true,
                msg: "O nome é obrigatório.",
                data: null
            }

            expect(response, errorReponse)
        })

        it("shouldn't update a product with existing name", async () => {
            const { data: productCreated } = await create(null, productValid)
            const { data: productCreated2 } = await create(null, otherProductValid)

            productValid.id = productCreated.id
            productValid.name = productCreated2.name
    
            const response = await update(null, productValid)

            const errorResponse = {
                error: true,
                msg: 'Já existe um produto com esse nome.',
                data: null
            }
            expect(response).toEqual(errorResponse)
        });

        it("shouldn't update a product with existing code", async () => {
            const { data: productCreated } = await create(null, productValid)
            const { data: productCreated2 } = await create(null,otherProductValid)

            productValid.id = productCreated.id
            productValid.code = productCreated2.code
    
            const response = await update(null, productValid)

            const errorResponse = {
                error: true,
                msg: 'Já existe um produto com esse código.',
                data: null
            }
            expect(response).toEqual(errorResponse)


        })

        it("should update a product that doesn't exist", async () => {
            const { data: productCreated } = await create(null, productValid)
            const { error } = await destroy(null, productCreated.id)

            expect(error).toBe(false)

            productValid.id = productCreated.id

            const response = await update(null, productValid)

            const errorResponse = {
                error: true,
                msg: "Não existe Produto com esse id",
                data: null
            }

            expect(response).toEqual(errorResponse)
        })

    })

    describe("findAll()", () => {

        it("should found products", async () => {
            const { data: productCreated } = await create(null, productValid)
            const response = await findAll()

            const sucessReponse = {
                error: false,
                msg: 'Products Found',
                data: [productCreated]
            }

            expect(response).toEqual(sucessReponse)

        })
    })
})