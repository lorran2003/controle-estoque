import path from 'path';
import { app } from 'electron';
import os from 'os';


const isTest = process.env.NODE_ENV === 'test';


const testBaseDir = path.join(os.tmpdir(), 'app-tests');


const picturesPath = isTest ? path.join(testBaseDir, 'pictures') : app.getPath('pictures')
const userPath = isTest ? path.join(testBaseDir, 'userData') : app.getPath('userData')


export const DEST_USER = userPath
export const DEST_IMG = path.join(picturesPath, 'controle-estoque')

