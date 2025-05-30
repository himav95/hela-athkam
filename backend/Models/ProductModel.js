const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db'); // database config

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    craftsman_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'products',
    timestamps: false // since we didn't add created_at/updated_at
});

module.exports = Product;