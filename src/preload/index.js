import { contextBridge,ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const productApi = {
  create: (product) => ipcRenderer.invoke('create-product',product) ,
  findById: (id) => ipcRenderer.invoke('findById-product',id),
  findByCode:(code) => ipcRenderer.invoke('findByCode-product',code),
  findByName:(name) => ipcRenderer.invoke('findByName-product',name),
  delete:(id) => ipcRenderer.invoke('delete-product',id),
  update:(product) => ipcRenderer.invoke('update-product',product),
  findAll:() => ipcRenderer.invoke('findAll-product'),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('productApi', productApi)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.productApi = api
}
