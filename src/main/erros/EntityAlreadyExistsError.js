import BaseError from "./BaseError";
import { ErrorTypes } from "../../shared/errorTypes";

export class EntityAlreadyExistsError extends BaseError {

    constructor(message) {
        super(message,ErrorTypes.ENTITY_ALREADY_EXISTS)
    }

}