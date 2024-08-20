import { Sequelize } from '@sequelize/core';
import ProductModel from './models/Product';
import path from 'path';
import { ROOT_DIR } from '../util/path';

const sequelize = new Sequelize({
  dialect: 'sqlite3',
  storage: path.join(ROOT_DIR,'data','sequelize.sqlite'),
})

const Product = ProductModel(sequelize)


export default { Product, sequelize }
