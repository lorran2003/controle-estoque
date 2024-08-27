import { afterAll, describe, expect, it } from "vitest";
import { isExistsFile } from "../../../src/main/util/productHelper";
import fs from 'fs/promises'
import path from 'path'
import { DEST_IMG } from "../../../src/main/util/path";

describe("Product Helper", () => {
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


})
