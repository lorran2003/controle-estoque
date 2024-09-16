export default class BaseError extends Error {
    constructor(message, errorType) {
        this.errorType = errorType
        super(message)
    }
}