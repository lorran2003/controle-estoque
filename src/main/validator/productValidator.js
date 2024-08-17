import Joi from "joi";

const idValidation = Joi.number().integer().min(1).required().messages({
    'number.base':'o id deve ser um numero inteiro',
    'integer.base':'O id deve ser um numero inteiro',
    'any.required':'O id é obrigatório',
    'number.min':'O valor deve ser maior que 0'
})

const nameValidationOptional = Joi.string()
    .max(255)
    .allow('')
    .messages({
        'string.base': 'O nome deve ser uma string.',
        'string.max': 'O nome deve ter no máximo {#limit} caracteres.'
    });

const nameValidation = Joi.string()
    .max(255)
    .required()
    .messages({
        'string.base': 'O nome deve ser uma string.',
        'string.empty': 'O nome é obrigatório.',
        'string.max': 'O nome deve ter no máximo {#limit} caracteres.',
        'any.required': 'O nome é obrigatório.'
    })

const codeValidation = Joi.string()
    .length(6)
    .pattern(/^[A-Z0-9]{6}$/)
    .required()
    .messages({
        'string.base': 'O código deve ser uma string.',
        'string.length': 'O código deve ter exatamente {#limit} caracteres.',
        'string.pattern.base': 'O código deve conter apenas letras maiúsculas e números.',
        'any.required': 'O código é obrigatório.'
    })

const imgValidation = Joi.string()
    .allow(null)  
    .optional()   
    .messages({
        'string.base': 'A imagem deve ser uma string.',
        'any.allowNull': 'A imagem pode ser null.',
    })


const priceSaleValidation = Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
        'number.base': 'O preço de venda deve ser um número.',
        'number.integer': 'O preço de venda deve ser um número inteiro.',
        'number.min': 'O preço de venda deve ser maior ou igual a {#limit}.',
        'any.required': 'O preço de venda é obrigatório.'
    })

const priceCostValidation = Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
        'number.base': 'O preço de custo deve ser um número.',
        'number.integer': 'O preço de custo deve ser um número inteiro.',
        'number.min': 'O preço de custo deve ser maior ou igual a {#limit}.',
        'any.required': 'O preço de custo é obrigatório.'
    })

const stockValidation = Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
        'number.base': 'O estoque deve ser um número.',
        'number.integer': 'O estoque deve ser um número inteiro.',
        'number.min': 'O estoque deve ser maior ou igual a {#limit}.',
        'any.required': 'O estoque é obrigatório.'
    })


export const createProductValidator = (productData) => {
   return Joi.object({
        name:nameValidation,
        code:codeValidation,
        img:imgValidation,
        priceSale:priceSaleValidation,
        priceCost:priceCostValidation,
        stock:stockValidation,
    }).validate(productData)
} 


export const findByIdValidator = (id) => {
    return idValidation.validate(id)
}

export const findByCodeValidator = (code)=> {
    return codeValidation.validate(code)
}


export const findByNameValidator = (name) => {
    return nameValidationOptional.validate(name)
}

export const destroyValidator = (id) => {
    return idValidation.validate(id)
}