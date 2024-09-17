import { ErrorTypes } from "../../shared/errorTypes";
import BaseError from "./BaseError";


export class SaveImageError extends BaseError{
    constructor(message){
        super(message,ErrorTypes.SAVE_IMAGE)
    }
}