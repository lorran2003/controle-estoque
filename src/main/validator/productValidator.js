import Joi from "joi";

export const idValidation = Joi.number().integer().min(1).required().messages({
    'number.base': 'O id deve ser um numero inteiro',
    'number.integer': 'O id deve ser um numero inteiro',
    'number.min': 'O valor deve ser maior que 0',
    'any.required': 'O id é obrigatório',
})

export const nameValidationOptional = Joi.string()
    .max(255)
    .allow('')
    .messages({
        'string.base': 'O nome deve ser uma string.',
        'string.max': 'O nome deve ter no máximo {#limit} caracteres.'
    });

export const nameValidation = Joi.string()
    .max(255)
    .required()
    .messages({
        'string.base': 'O nome deve ser uma string.',
        'string.empty': 'O nome é obrigatório.',
        'string.max': 'O nome deve ter no máximo {#limit} caracteres.',
        'any.required': 'O nome é obrigatório.'
    })

export const codeValidation = Joi.string()
    .length(6)
    .pattern(/^[A-Z0-9]{6}$/)
    .required()
    .messages({
        'string.base': 'O código deve ser uma string.',
        'string.length': 'O código deve ter exatamente {#limit} caracteres.',
        'string.pattern.base': 'O código deve conter apenas letras maiúsculas e números.',
        'string.empty': 'O código é obrigatório.',
        'any.required': 'O código é obrigatório.'
    })

export const imgValidation = Joi.string()
    .allow(null)
    .optional()
    .messages({
        'string.base': 'A imagem deve ser uma string.',
        'any.allowNull': 'A imagem pode ser null.',
    })


export const priceSaleValidation = Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
        'number.base': 'O preço de venda deve ser um número.',
        'number.integer': 'O preço de venda deve ser um número inteiro.',
        'number.min': 'O preço de venda deve ser maior ou igual a {#limit}.',
        'any.required': 'O preço de venda é obrigatório.'
    })

export const priceCostValidation = Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
        'number.base': 'O preço de custo deve ser um número.',
        'number.integer': 'O preço de custo deve ser um número inteiro.',
        'number.min': 'O preço de custo deve ser maior ou igual a {#limit}.',
        'any.required': 'O preço de custo é obrigatório.'
    })


export const currentStockValidation = Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
        'number.base': 'O estoque atual deve ser um número.',
        'number.integer': 'O estoque atual deve ser um número inteiro.',
        'number.min': 'O estoque atual deve ser maior ou igual a {#limit}.',
        'any.required': 'O estoque atual é obrigatório.'
    })


export const minimumStockValidation = Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
        'number.base': 'O estoque minimo deve ser um número.',
        'number.integer': 'O estoque minimo deve ser um número inteiro.',
        'number.min': 'O estoque minimo deve ser maior ou igual a {#limit}.',
        'any.required': 'O estoque minimo é obrigatório.'
    })

export const productValidation = Joi.object({
    name: nameValidation,
    code: codeValidation,
    img: imgValidation,
    priceSale: priceSaleValidation,
    priceCost: priceCostValidation,
    currentStock: currentStockValidation,
    minimumStock: minimumStockValidation,
})

export const createProductValidator = (productData) => {
    return productValidation.validate(productData)
}


export const findByIdValidator = (id) => {
    return idValidation.validate(id)
}

export const findByCodeValidator = (code) => {
    return codeValidation.validate(code)
}


export const findByNameValidator = (name) => {
    return nameValidationOptional.validate(name)
}

export const destroyValidator = (id) => {
    return idValidation.validate(id)
}

export const updateValidator = (product) => {
    return productValidation.keys({ id: idValidation }).validate(product)
}