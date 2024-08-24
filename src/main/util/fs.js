import fs from 'fs'
import path from 'path'
import CustomError from './CustomError'
import { DEST_IMG } from './path'

export const isExistsFile = (path) => {
    return fs.existsSync(path)
}

export const copyToDestImg = (srcPath) => {
    try {
        if (!isExistsFile(srcPath)) {
            throw new CustomError('Arquivo de origem não existe')
        }

        if (!isExistsFile(DEST_IMG)) {
            fs.mkdirSync(DEST_IMG, { recursive: true })
        }

        const fileName = path.basename(srcPath)
        const ext = path.extname(fileName)
        const baseName = path.basename(fileName, ext)
        const uniqueName = `${baseName}-${Date.now()}${ext}`
        const destPath = path.join(DEST_IMG, uniqueName)

        fs.copyFileSync(srcPath, destPath)

        return uniqueName
    } catch (error) {
        if (error instanceof CustomError) {
            throw error
        }
        throw new CustomError('Erro ao salvar imagem!',error)
    }

}

export const updateImg = (currentImg, nextImg) => {
    try {

        if (!isExistsFile(nextImg)) {
            throw new CustomError('Arquivo de origem não existe')
        }

        if (!isExistsFile(currentImg)) {
           return copyTo(nextImg)
        }
        
        fs.unlinkSync(currentImg)
        const currentFileName = path.basename(currentImg)
        const currentExtName = path.extname(currentFileName)

        const nextExtName = path.extname(nextImg)
        const updatedNameFile = currentFileName.replace(currentExtName, nextExtName)

        const updatedPath = currentImg.replace(currentFileName, updatedNameFile)
        fs.copyFileSync(nextImg, updatedPath)
        return updatedNameFile
    } catch (err) {
        if(err instanceof CustomError){
            throw err
        }
        throw new CustomError('Erro ao atualizar imagem!');
    }
}

export const deleteImg = (fileName) => {
    try {
        fs.unlinkSync(path.join(DEST_IMG,fileName))
    } catch (err) {
        throw new CustomError("Erro ao deletar Imagem do produto")
    }
}