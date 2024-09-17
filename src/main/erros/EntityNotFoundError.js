import { BaseError } from "sequelize";
import { ErrorTypes } from "../../shared/errorTypes";

export class EntityNotFound extends BaseError{
    constructor(message){
        super(message,ErrorTypes.ENTITY_NOT_FOUND)
    }
}