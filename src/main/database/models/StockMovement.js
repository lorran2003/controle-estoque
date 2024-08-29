import { DataTypes } from "sequelize"

const StockMovementModel = (sequelize) => {
  const StockMovement = sequelize.define('StockMovement', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM('INPUT', 'OUTPUT'),
            allowNull: false
        },
        category:{
            type: DataTypes.ENUM('INVENTORY', 'ADJUSTMENT','INITIAL_STOCK'),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
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
        const Product = models.Product
        StockMovement.belongsTo(Product,{ foreignKey: 'productId',onDelete:'CASCADE'})
    }

    return StockMovement
}

export default StockMovementModel
