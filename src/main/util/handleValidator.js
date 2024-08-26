import CustomError from "./CustomError"


const handleValidator = (validator, data) => {
    const { error, value } = validator(data)

    if (error) {
        throw new CustomError(error.message)
    }
    
    return value
}

export default handleValidator