import { describe, it, expect } from "vitest"
import productValidator from "../../../src/main/validator/productValidator"
import { createProductValidator,destroyValidator,updateValidator,findByIdValidator,findByCodeValidator,findByNameValidator } from "../../../src/main/validator/productValidator"

describe('Product validations', () => {
    const {
        idValidation,
        nameValidationOptional,
        nameValidation,
        codeValidation,
        imgValidation,
        priceSaleValidation,
        priceCostValidation,
        minimumStockValidation,
        currentStockValidation
    } = productValidator

    describe('idValidation', () => {
        it('should return an error when id is not an integer', () => {
            const { error } = idValidation.validate(1.5)
            expect(error?.details[0].message).toBe('O id deve ser um numero inteiro')
        })

        it('should return an error when id is less than 0', () => {
            const { error } = idValidation.validate(0)
            expect(error?.details[0].message).toBe('O valor deve ser maior que 0')
        })

        it('should return an error when id is not provided', () => {
            const { error } = idValidation.validate(undefined)
            expect(error?.details[0].message).toBe('O id é obrigatório')
        })

        it('should validate a valid id', () => {
            const { error } = idValidation.validate(1)
            expect(error).toBeUndefined()
        })
    })

    describe('nameValidationOptional', () => {
        it('should return an error when name is not a string', () => {
            const { error } = nameValidationOptional.validate(123)
            expect(error?.details[0].message).toBe('O nome deve ser uma string.')
        })

        it('should return an error when name exceeds the max length', () => {
            const { error } = nameValidationOptional.validate('a'.repeat(256))
            expect(error?.details[0].message).toBe('O nome deve ter no máximo 255 caracteres.')
        })

        it('should validate an empty string', () => {
            const { error } = nameValidationOptional.validate('')
            expect(error).toBeUndefined()
        })

        it('should validate a valid name', () => {
            const { error } = nameValidationOptional.validate('Valid Name')
            expect(error).toBeUndefined()
        })
    })

    describe('nameValidation', () => {
        it('should return an error when name is not a string', () => {
            const { error } = nameValidation.validate(123)
            expect(error?.details[0].message).toBe('O nome deve ser uma string.')
        })

        it('should return an error when name is empty', () => {
            const { error } = nameValidation.validate('')
            expect(error?.details[0].message).toBe('O nome é obrigatório.')
        })

        it('should return an error when name is not provided', () => {
            const { error } = nameValidation.validate(undefined)
            expect(error?.details[0].message).toBe('O nome é obrigatório.')
        })

        it('should return an error when name exceeds the max length', () => {
            const { error } = nameValidation.validate('a'.repeat(256))
            expect(error?.details[0].message).toBe('O nome deve ter no máximo 255 caracteres.')
        })

        it('should validate a valid name', () => {
            const { error } = nameValidation.validate('Valid Name')
            expect(error).toBeUndefined()
        })
    })

    describe('codeValidation', () => {

        it('should return an error when code is not a string', () => {
            const { error } = codeValidation.validate(123456)
            expect(error?.details[0].message).toBe('O código deve ser uma string.')
        })

        it('should return an error when code does not have 6 characters', () => {
            const { error } = codeValidation.validate('12345')
            expect(error?.details[0].message).toBe('O código deve ter exatamente 6 caracteres.')
        })

        it('should return an error when code contains invalid characters', () => {
            const { error } = codeValidation.validate('abc123')
            expect(error?.details[0].message).toBe('O código deve conter apenas letras maiúsculas e números.')
        })

        it('should return an error when code is not provided', () => {
            const { error } = codeValidation.validate(undefined)
            expect(error?.details[0].message).toBe('O código é obrigatório.')
        })

        it('should validate a valid code', () => {
            const { error } = codeValidation.validate('ABC123')
            expect(error).toBeUndefined()
        })
    })

    describe('imgValidation', () => {
        it('should return an error when img is not a string or null', () => {
            const { error } = imgValidation.validate(123)
            expect(error?.details[0].message).toBe('A imagem deve ser uma string.')
        })

        it('should validate when img is null', () => {
            const { error } = imgValidation.validate(null)
            expect(error).toBeUndefined()
        })

        it('should validate a valid img', () => {
            const { error } = imgValidation.validate('image.jpg')
            expect(error).toBeUndefined()
        })
    })

    describe('priceSaleValidation', () => {
        it('should return an error when priceSale is not a number', () => {
            const { error } = priceSaleValidation.validate('abc')
            expect(error?.details[0].message).toBe('O preço de venda deve ser um número.')
        })

        it('should return an error when priceSale is not an integer', () => {
            const { error } = priceSaleValidation.validate(10.5)
            expect(error?.details[0].message).toBe('O preço de venda deve ser um número inteiro.')
        })

        it('should return an error when priceSale is less than 0', () => {
            const { error } = priceSaleValidation.validate(-1)
            expect(error?.details[0].message).toBe('O preço de venda deve ser maior ou igual a 0.')
        })

        it('should return an error when price sale is not provided', () => {
            const { error } = priceSaleValidation.validate(undefined)
            expect(error?.details[0].message).toBe('O preço de venda é obrigatório.')
        })
        

        it('should validate a valid priceSale', () => {
            const { error } = priceSaleValidation.validate(10)
            expect(error).toBeUndefined()
        })
    })


    describe('priceCostValidation', () => {
        it('should return an error when priceCost is not a number', () => {
            const { error } = priceCostValidation.validate('abc')
            expect(error?.details[0].message).toBe('O preço de custo deve ser um número.')
        })

        it('should return an error when priceCost is not an integer', () => {
            const { error } = priceCostValidation.validate(10.5)
            expect(error?.details[0].message).toBe('O preço de custo deve ser um número inteiro.')
        })

        it('should return an error when priceCost is less than 0', () => {
            const { error } = priceCostValidation.validate(-1)
            expect(error?.details[0].message).toBe('O preço de custo deve ser maior ou igual a 0.')
        })

        it('should return an error when price cost is not provided', () => {
            const { error } = priceCostValidation.validate(undefined)
            expect(error?.details[0].message).toBe('O preço de custo é obrigatório.')
        })

        it('should validate a valid priceCost', () => {
            const { error } = priceCostValidation.validate(10)
            expect(error).toBeUndefined()
        })
    })


    describe('minimumStockValidation', () => {
        it('should return an error when stock is not a number', () => {
            const { error } = minimumStockValidation.validate('abc')
            expect(error?.details[0].message).toBe('O estoque minimo deve ser um número.')
        })

        it('should return an error when stock is not an integer', () => {
            const { error } = minimumStockValidation.validate(10.5)
            expect(error?.details[0].message).toBe('O estoque minimo deve ser um número inteiro.')
        })

        it('should return an error when stock is less than 0', () => {
            const { error } = minimumStockValidation.validate(-1)
            expect(error?.details[0].message).toBe('O estoque minimo deve ser maior ou igual a 0.')
        })

        it('should return an error when minimum stock is not provided', () => {
            const { error } = minimumStockValidation.validate(undefined)
            expect(error?.details[0].message).toBe('O estoque minimo é obrigatório.')
        })

        it('should validate a valid stock', () => {
            const { error } = minimumStockValidation.validate(10)
            expect(error).toBeUndefined()
        })
    })

    describe('currentStockValidation', () => {
        it('should return an error when stock is not a number', () => {
            const { error } = currentStockValidation.validate('abc')
            expect(error?.details[0].message).toBe('O estoque atual deve ser um número.')
        })

        it('should return an error when stock is not an integer', () => {
            const { error } = currentStockValidation.validate(10.5)
            expect(error?.details[0].message).toBe('O estoque atual deve ser um número inteiro.')
        })

        it('should return an error when stock is less than 0', () => {
            const { error } = currentStockValidation.validate(-1)
            expect(error?.details[0].message).toBe('O estoque atual deve ser maior ou igual a 0.')
        })

        it('should return an error when current stock is not provided', () => {
            const { error } = currentStockValidation.validate(undefined)
            expect(error?.details[0].message).toBe('O estoque atual é obrigatório.')
        })

        it('should validate a valid stock', () => {
            const { error } = currentStockValidation.validate(10)
            expect(error).toBeUndefined()
        })
    })

})


describe('Product Validator Methods', () => {

    describe('createProductValidator', () => {
        it('should validate a valid product', () => {
            const validProduct = {
                name: "Valid Name",
                code: "ABC123",
                img: "image.jpg",
                priceSale: 100,
                priceCost: 50,
                currentStock: 10,
                minimumStock: 5,
            }
            const { error } = createProductValidator(validProduct)
            expect(error).toBeUndefined()
        })

        it('should return an error for an invalid product', () => {
            const invalidProduct = {
                name: "",
                code: "123",
                img: 123,
                priceSale: -1,
                priceCost: -1,
                currentStock: -1,
                minimumStock: -1,
            }
            const { error } = createProductValidator(invalidProduct)
            expect(error).toBeDefined()
        })
    })

    describe('findByIdValidator', () => {
        it('should validate a valid id', () => {
            const { error } = findByIdValidator(1)
            expect(error).toBeUndefined()
        })

        it('should return an error for an invalid id', () => {
            const { error } = findByIdValidator(0)
            expect(error?.details[0].message).toBe('O valor deve ser maior que 0')
        })
    })

    describe('findByCodeValidator', () => {
        it('should validate a valid code', () => {
            const { error } = findByCodeValidator("ABC123")
            expect(error).toBeUndefined()
        })

        it('should return an error for an invalid code', () => {
            const { error } = findByCodeValidator("123")
            expect(error?.details[0].message).toBe('O código deve ter exatamente 6 caracteres.')
        })
    })

    describe('findByNameValidator', () => {
        it('should validate a valid name', () => {
            const { error } = findByNameValidator("Valid Name")
            expect(error).toBeUndefined()
        })

        it('should return an error for an invalid name', () => {
            const { error } = findByNameValidator(123)
            expect(error?.details[0].message).toBe('O nome deve ser uma string.')
        })
    })

    describe('destroyValidator', () => {
        it('should validate a valid id for destruction', () => {
            const { error } = destroyValidator(1)
            expect(error).toBeUndefined()
        })

        it('should return an error for an invalid id for destruction', () => {
            const { error } = destroyValidator(-1)
            expect(error?.details[0].message).toBe('O valor deve ser maior que 0')
        })
    })

    describe('updateValidator', () => {
        it('should validate a valid update object', () => {
            const validUpdate = {
                id: 1,
                name: "Updated Name",
                code: "ABC123",
                img: "updated_image.jpg",
                priceSale: 150,
                priceCost: 75,
                currentStock: 20,
                minimumStock: 10,
            }
            const { error } = updateValidator(validUpdate)
            expect(error).toBeUndefined()
        })

        it('should return an error for an invalid update object', () => {
            const invalidUpdate = {
                id: -1,
                name: "",
                code: "123",
                img: 123,
                priceSale: -100,
                priceCost: -50,
                currentStock: -10,
                minimumStock: -5,
            }
            const { error } = updateValidator(invalidUpdate)
            expect(error).toBeDefined()
        })
    })
})