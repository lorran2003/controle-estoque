import path from 'path';
import { fileURLToPath } from 'url';


export const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.resolve(__dirname, '../../')