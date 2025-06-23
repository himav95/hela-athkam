// Create this file: Models/ModelAssociations.js
// This file sets up the relationships between your models

const Order = require('./OrderModel');
const User = require('./UserModel');
const Product = require('./ProductModel');

// Set up associations
const setupAssociations = () => {
    // Order belongs to User (many orders can belong to one user)
    Order.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user'
    });

    // User has many Orders (one user can have many orders)
    User.hasMany(Order, {
        foreignKey: 'user_id',
        as: 'orders'
    });

    // Order belongs to Product (many orders can belong to one product)
    Order.belongsTo(Product, {
        foreignKey: 'product_id',
        as: 'product'
    });

    // Product has many Orders (one product can have many orders)
    Product.hasMany(Order, {
        foreignKey: 'product_id',
        as: 'orders'
    });

    // Self-referencing for manager approval
    Order.belongsTo(User, {
        foreignKey: 'manager_approved_by',
        as: 'approver'
    });

    console.log('Model associations have been set up successfully');
};

module.exports = { setupAssociations };