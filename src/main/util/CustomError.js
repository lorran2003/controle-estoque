

export default class CustomError extends Error{
    constructor(message,originalError){
        super(message)
        this.originalError = originalError
    }
}