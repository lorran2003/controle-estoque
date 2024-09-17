import { afterAll, beforeEach, describe, expect, it, vi } from "vitest"
import * as productHelper from '../../../src/main/helper/productHelper.js'
import fs from 'fs/promises'
import * as fsSync from 'fs'
import path from 'path'
import { DEST_IMG } from "../../../src/main/util/path"


describe("Product Helper", () => {
    const pathImg = path.join(__dirname, '..', '..', 'img', 'banana.jpeg')
    const updateImgPath = path.join(__dirname, '..', '..', 'img', 'water.jpg')


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

    describe('deleteImg', () => {

        it('should call isExistsFile with the correct path when deleting an image', () => {
            const isExistsFileMock = vi.fn(productHelper.isExistsFile)

            const deleteImg = vi.fn((fileName) => {
                const pathImg = path.join(DEST_IMG, fileName)
                if (isExistsFileMock(pathImg)) {
                    fsSync.unlinkSync(pathImg)
                }
            })

            const fileName = productHelper.saveImg(pathImg)
            deleteImg(fileName)
            expect(isExistsFileMock).toBeCalledWith(path.join(DEST_IMG, fileName))
            expect(isExistsFileMock).toHaveLastReturnedWith(true)
        })
    })

    describe("updateImg()", () => {
        it("should update image", async () => {
            const uniqueName = productHelper.saveImg(pathImg)
            const newUniqueName = productHelper.updateImg(uniqueName, updateImgPath)
            expect(uniqueName).not.toBe(newUniqueName)
        })

        it("should call updateImg with image path update incorrect", async () => {
            const uniqueName = productHelper.saveImg(pathImg)

            expect(()=> productHelper.updateImg(uniqueName, 'invalid path'))
                .toThrow("Arquivo de origem não existe")
        })
    })

    describe("handleProductImageUpdate", () => {
        let existingProduct
        let validatedProductData

        beforeEach(() => {
            existingProduct = {}
            validatedProductData = {}
        })
    
        it("should delete the existing image and return null when no new image is provided", () => {
            existingProduct.img = pathImg
            const result = productHelper.handleProductImageUpdate(existingProduct, {})
            expect(result).toBeNull()
        })
    
        it("should return the new image path when a new image is provided", () => {
            const filenameImg = productHelper.saveImg(pathImg)

            existingProduct.img = filenameImg
            validatedProductData.img = pathImg

            const result = productHelper.handleProductImageUpdate(existingProduct, validatedProductData)

            expect(result).not.toBeNull()
            expect(result).not.toBe(filenameImg)
        })
    
       
    
        it("should return the existing image path when the same image is provided", () => {
            const filenameImg = productHelper.saveImg(pathImg)
            existingProduct.img = filenameImg

            const result = productHelper.handleProductImageUpdate(existingProduct,existingProduct)
            expect(result).not.toBeNull()
            expect(result).toBe(existingProduct.img)
        })
    })
})
