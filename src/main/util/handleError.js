import CustomError from "./CustomError"

const getInternalErrorResponse = () =>
    ({ error: true, msg: 'Erro Interno', data: null })

const getCustomErrorResponse = ({ message }) =>
    ({ error: true, msg: message, data: null })

const handleError = (func) => {

    return async (...params) => {
        try {
            return await func(...params)
        } catch (error) {
            if (error instanceof CustomError) {
                return getCustomErrorResponse(error)
            }

            console.log(error)
            return getInternalErrorResponse()
        }
    }
}

export default  handleError