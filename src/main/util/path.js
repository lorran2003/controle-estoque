import { app } from 'electron';
import path from 'path'

const picturesPath = app.getPath('pictures')
const userPath = app.getPath('userData')

export const DEST_USER = userPath
export const DEST_IMG = path.join(picturesPath,'controle-estoque')

