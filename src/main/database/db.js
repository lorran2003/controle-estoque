import { Sequelize } from 'sequelize';
import ProductModel from './models/Product';
import path from 'path'
import { DEST_USER } from '../util/path';
import StockMovementModel from './models/StockMovement';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(DEST_USER, 'db', 'sequelize.sqlite'),
})

const initAssociate = (models) => {
  for(let model in models){
      models[model].associate(models)
  }
}

const Product = ProductModel(sequelize)
const StockMovement = StockMovementModel(sequelize)

initAssociate(sequelize.models)
export default { Product, StockMovement, sequelize }