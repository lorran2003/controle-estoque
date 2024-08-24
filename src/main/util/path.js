import path from 'path';
import { fileURLToPath } from 'url';


export const __filename = fileURLToPath(import.meta.url)

export const __dirname = path.dirname(__filename)


const isTestEnv = process.env.TEST_ENV === 'true'


export const ROOT_DIR = isTestEnv
    ? path.resolve(__dirname, '../../../')
    : path.resolve(__dirname, '../../')

export const DEST_DIR = path.join(ROOT_DIR, 'resources', 'img')
