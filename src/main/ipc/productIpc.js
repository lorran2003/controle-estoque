import { ipcMain } from "electron";
import productController from "../controller/productController";


const setupProductIpc = () => {
    ipcMain.handle('create-product',productController.create)
}


export default setupProductIpc