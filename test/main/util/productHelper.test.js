import { afterAll, describe, expect, it, vi } from "vitest";
import * as productHelper from "../../../src/main/util/productHelper";
import fs from 'fs/promises'
import path from 'path'
import { DEST_IMG } from "../../../src/main/util/path";

describe("Product Helper", () => {
    const pathImg = path.join(__dirname, '..', '..', 'img', 'banana.jpeg')
    const updatePathImg = path.join(__dirname, '..', '..', 'img', 'water.jpg')


    afterAll(async () => {
        const files = await fs.readdir(DEST_IMG)
        files.forEach(async (file) => {
            await fs.unlink(path.join(DEST_IMG, file))
        })
    })

    describe("isExistsFile()", () => {

        it("should check file that doesn't exist", () => {
            expect(productHelper.isExistsFile()).toBe(false)
        })

        it("should check file that exists", () => {
            expect(productHelper.isExistsFile(pathImg)).toBe(true)
        })
    })

    describe("saveImg()", () => {
        it("should save a img", async () => {
            const uniqueName = productHelper.saveImg(pathImg)
            expect(uniqueName).toBeDefined()
        })

        it("should throw error if path not exists", async () => {
            expect(productHelper.saveImg).toThrow('Arquivo de origem não existe')
        })
    })

    describe("deleteImg()", () => {
        it("should delete img", async () => {
            const uniqueName = productHelper.saveImg(pathImg)
            expect(() => productHelper.deleteImg(uniqueName)).not.toThrow()
        })
    })
})
