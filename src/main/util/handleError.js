import CustomError from './CustomError'
import { ErrorTypes } from '../../shared/errorTypes'

const getErrorResponse = (type, message) => ({
    error: true,
    type,
    msg: message,
    data: null
})

const getSuccessResponse = (data) => ({
    error: false,
    msg: 'Operação realizada com sucesso',
    data
})

const handleError = (func) => {
    return async (...params) => {
        try {
            const result = await func(...params)
            return getSuccessResponse(result)
        } catch (error) {
            if (error instanceof CustomError) {
                return getErrorResponse(ErrorTypes.CUSTOM, error.message)
            }

            return getErrorResponse(ErrorTypes.INTERNAL, error.message)
        }
    }
}

export default handleError