import { afterAll, describe, expect, it } from "vitest";
import { isExistsFile, deleteImg, copyTo, updateImg } from "../../../src/main/util/fs";
import fs from 'fs/promises'
import path from 'path'


describe("fs", () => {
    const rootTest = path.join(__dirname, '..', '..')
    const destImg = path.join(rootTest, 'dest-img')
    const pathImg = path.join(rootTest, 'img', 'banana.jpeg')
    const updatePathImg = path.join(rootTest, 'img', 'water.jpg')


    afterAll(async () => {
        const files = await fs.readdir(destImg)
        files.forEach(async (file) => {
            await fs.unlink(path.join(destImg, file))
        })
    })

    describe("isExistsFile()", () => {

        it("should check file that doesn't exist", () => {
            expect(isExistsFile()).toBe(false)
        })

        it("should check file that exists", () => {
            expect(isExistsFile(pathImg)).toBe(true)
        })
    })


    describe("copyTo()", () => {
        it("should copy img to dest-img", () => {
            const uniqueName = copyTo(pathImg, destImg)
            expect(uniqueName).toBeDefined()
        })

        it("should copy file that doesn't exist", () => {
            expect(() => copyTo(null, destImg))
                .toThrow('Arquivo de origem não existe')
        })
    })

    describe("updateImg()", () => {
        it("should update the image", () => {
            const uniqueName = copyTo(pathImg, destImg)
            const currentPathImg = path.join(destImg, uniqueName)
            expect(() => updateImg(currentPathImg, updatePathImg)).not.toThrow()
        })

        it("should update the image not exists", () => {
            const uniqueName = copyTo(pathImg, destImg)
            const currentPathImg = path.join(destImg, uniqueName)
            expect(() => updateImg(currentPathImg, '')).toThrow("Arquivo de origem não existe")
        })
    })

    describe("delteImg()", () => {
        it("should delete the image", () => {
            const uniqueName = copyTo(pathImg, destImg)
            const currentPathImg = path.join(destImg, uniqueName)
            expect(() => deleteImg(currentPathImg)).not.toThrow()
        })

        it("should delete the image not exists",() => {
            expect(() => deleteImg('')).toThrow("Erro ao deletar Imagem do produto")
        })
    })
})
