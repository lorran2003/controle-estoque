import { DataTypes} from '@sequelize/core';

const ProductModel = (sequelize) => {
 return sequelize.define('Product',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            unique:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        img:{
            type:DataTypes.STRING,
            allowNull:true
        },
        priceSale:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        priceCost:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        stock:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
}

export default ProductModel