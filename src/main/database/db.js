import { Sequelize } from '@sequelize/core';
import ProductModel from './models/Product';
import path from 'path';

const sequelize = new Sequelize({
  dialect: 'sqlite3',
  storage: path.join(__dirname,'data/sequelize.sqlite'),
})


const Product = ProductModel(sequelize)

const SyncDb = async (sequelize) => {
  await sequelize.sync({force:true})
}

SyncDb(sequelize)


export default { Product, sequelize }
