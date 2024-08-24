import { afterAll, describe, expect, it } from "vitest";
import { isExistsFile, deleteImg, copyTo, updateImg } from "../../../src/main/util/fs";
import fs from 'fs/promises'
import path from 'path'
import { DEST_IMG } from "../../../src/main/util/path";

describe("fs", () => {
    const pathImg = path.join(__dirname,'..','..','img','banana.jpeg')
    const updatePathImg =path.join(__dirname,'..','..','img','water.jpg')


    afterAll(async () => {
        const files = await fs.readdir(DEST_IMG)
        files.forEach(async (file) => {
            await fs.unlink(path.join(DEST_IMG, file))
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
            const uniqueName = copyTo(pathImg, DEST_IMG)
            expect(uniqueName).toBeDefined()
        })

        it("should copy file that doesn't exist", () => {
            expect(() => copyTo(null, DEST_IMG))
                .toThrow('Arquivo de origem não existe')
        })
    })

    describe("updateImg()", () => {
        it("should update the image", () => {
            const uniqueName = copyTo(pathImg, DEST_IMG)
            const currentPathImg = path.join(DEST_IMG, uniqueName)
            const updatedNameFile = updateImg(currentPathImg, updatePathImg)
            expect(path.extname(updatedNameFile)).toBe(path.extname(updatePathImg))
        })

        it("should update the image not exists", () => {
            const uniqueName = copyTo(pathImg, DEST_IMG)
            const currentPathImg = path.join(DEST_IMG, uniqueName)
            expect(() => updateImg(currentPathImg, '')).toThrow("Arquivo de origem não existe")
        })
    })

    describe("delteImg()", () => {
        it("should delete the image", () => {
            const uniqueName = copyTo(pathImg, DEST_IMG)
            const currentPathImg = path.join(DEST_IMG, uniqueName)
            console.log(currentPathImg)
            expect(() => deleteImg(currentPathImg)).not.toThrow()
        })

        it("should delete the image not exists",() => {
            expect(() => deleteImg('')).toThrow("Erro ao deletar Imagem do produto")
        })
    })
})
