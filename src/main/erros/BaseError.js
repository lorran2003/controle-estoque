export default class BaseError extends Error {
    constructor(message, errorType) {
        super(message)
        this.errorType = errorType
    }
}