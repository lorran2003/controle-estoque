import { ipcMain } from "electron";
import productController from "../controller/productController";


const setupProductIpc = () => {
    ipcMain.handle('create-product',productController.create)
    ipcMain.handle('findById-product',productController.findById)
    ipcMain.handle('findByCode-product',productController.findByCode)
    ipcMain.handle('findByName-product',productController.findByName)
    ipcMain.handle('delete-product',productController.destroy)
    ipcMain.handle('update-product',productController.update)
    ipcMain.handle('findAll-product',productController.findAll)
}


export default setupProductIpc