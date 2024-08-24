import { Sequelize } from '@sequelize/core';
import ProductModel from './models/Product';
import path from 'path'
import { DEST_USER } from '../util/path';

const sequelize = new Sequelize({
  dialect: 'sqlite3',
  storage: path.join(DEST_USER,'db','sequelize.sqlite') ,
})

const Product = ProductModel(sequelize)


export default { Product, sequelize }
