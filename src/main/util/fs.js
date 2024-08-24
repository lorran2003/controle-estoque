import fs from 'fs'
import path from 'path'
import CustomError from './CustomError'
import { DEST_IMG } from './path'

export const isExistsFile = (path) => {
    return fs.existsSync(path)
}

export const copyTo = (srcPath, destPath) => {
    try {
        if (!isExistsFile(srcPath)) {
            throw new CustomError('Arquivo de origem não existe')
        }

        if (!isExistsFile(destPath)) {
            fs.mkdirSync(destPath, { recursive: true })
        }

        const fileName = path.basename(srcPath)
        const ext = path.extname(fileName)
        const baseName = path.basename(fileName, ext)
        const uniqueName = `${baseName}-${Date.now()}${ext}`
        const destFinalPath = path.join(destPath, uniqueName)

        fs.copyFileSync(srcPath, destFinalPath)

        return uniqueName
    } catch (error) {
        if (error instanceof CustomError) {
            throw error
        }
        throw new CustomError('Erro ao salvar imagem!', error)
    }

}

export const updateImg = (currentImg, nextImg) => {
    try {

        if (!isExistsFile(nextImg)) {
            throw new CustomError('Arquivo de origem não existe')
        }

        if (!isExistsFile(currentImg)) {
            return copyTo(nextImg,DEST_IMG)
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
        if (err instanceof CustomError) {
            throw err
        }
        throw new CustomError('Erro ao atualizar imagem!');
    }
}

export const deleteImg = (pathImg) => {
    try {
        fs.unlinkSync(pathImg)
    } catch (err) {
        throw new CustomError("Erro ao deletar Imagem do produto")
    }
}