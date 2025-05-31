const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

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
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    image: {  // Changed from image_url to image
        type: DataTypes.STRING(500),
        allowNull: true
    },
    stock: {  // Changed from stock_quantity to stock
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    craftsman_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'products',
    timestamps: false,  // Changed to false since i don't have created_at/updated_at but later should be revised.
    underscored: true
});

module.exports = Product;