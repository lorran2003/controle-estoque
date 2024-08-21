import fs from 'fs'
import path from 'path'
import CustomError from './CustomError'

export const isExistsFile = (path) => {
    return fs.existsSync(path)
}

export const copyTo = (srcPath, destDir) => {
    try {
        if (!isExistsFile(srcPath)) {
            throw new CustomError('Arquivo de origem não existe')
        }

        if (!isExistsFile(destDir)) {
            fs.mkdirSync(destDir, { recursive: true })
        }

        const fileName = path.basename(srcPath)
        const ext = path.extname(fileName)
        const baseName = path.basename(fileName, ext)
        const uniqueName = `${baseName}-${Date.now()}${ext}`
        const destPath = path.join(destDir, uniqueName)

        fs.copyFileSync(srcPath, destPath)

        return uniqueName
    } catch (error) {
        if (error instanceof CustomError) {
            throw error
        }

        console.log(error)
        throw new CustomError('Erro ao salvar imagem!')
    }

}

export const updateImg = (currentImg, nextImg) => {
    try {
        if (!isExistsFile(nextImg)) {
            throw new CustomError('Arquivo de origem não existe')
        }
        fs.unlinkSync(currentImg)
        fs.copyFileSync(nextImg, currentImg)
    } catch (err) {
        throw new CustomError('Erro ao atualizar imagem!');
    }
}

export const deleteImg = (path) => {
    try {
        fs.unlinkSync(path)
    } catch (err) {
        throw new CustomError("Erro ao deletar Imagem do produto")
    }
}