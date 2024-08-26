import { create, findById, findByName, findByCode, update, destroy, findAll } from "../business/productBusiness";
import handleError from "../util/handleError";
import { ipcMain } from "electron";


const setupProductIpc = () => {
    ipcMain.handle('create-product', handleError(create))
    ipcMain.handle('findById-product', handleError(findById))
    ipcMain.handle('findByCode-product', handleError(findByCode))
    ipcMain.handle('findByName-product', handleError(findByName))
    ipcMain.handle('delete-product', handleError(destroy))
    ipcMain.handle('update-product', handleError(update))
    ipcMain.handle('findAll-product', handleError(findAll))
}


export default setupProductIpc