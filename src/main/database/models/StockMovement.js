import { DataTypes } from '@sequelize/core';

const StockMovementModel = (sequelize) => {
  const StockMovement = sequelize.define('StockMovement', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM('INPUT', 'OUTPUT', 'ADJUSTMENT'),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        priceUnit: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }
    })

    StockMovement.associate = (models) => {
        const Product = models.get('Product')
        StockMovement.belongsTo(Product,{ foreignKey: 'productId' })
    }
}

export default StockMovementModel
