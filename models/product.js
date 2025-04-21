import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:        DataTypes.STRING,
    code:        DataTypes.STRING,
    quantity:    DataTypes.INTEGER,
    category:    DataTypes.STRING,
    price:       DataTypes.FLOAT
}, {
    tableName: 'products',
    timestamps: false
});

export default Product;
