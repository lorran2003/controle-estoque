import { ErrorTypes } from "../../shared/errorTypes";
import BaseError from "./BaseError";

export class StockAdjustmentError extends BaseError{

    constructor(message){
        super(message,ErrorTypes.STOCK_ADJUSTMENT)
    }
}