import { Sequelize } from '@sequelize/core';
import ProductModel from './models/Product';
import path from 'path'
import { DEST_USER } from '../util/path';
import StockMovementModel from './models/StockMovement';

const sequelize = new Sequelize({
  dialect: 'sqlite3',
  storage: path.join(DEST_USER, 'db', 'sequelize.sqlite'),
})

const initAssociate = (models) => {
  for(let model of models){
      model.associate(models)
  }
}

const Product = ProductModel(sequelize)
const StockMovement = StockMovementModel(sequelize)

initAssociate(sequelize.models)
export default { Product, StockMovement, sequelize }
