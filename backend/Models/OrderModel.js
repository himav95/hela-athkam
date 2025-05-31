const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Order = sequelize.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER, // Changed from STRING(50) to INTEGER
        allowNull: true, // For existing products from products table
        references: {
            model: 'products',
            key: 'product_id'
        }
    },
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    total_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    order_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    delivery_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    delivery_type: {
        type: DataTypes.ENUM('pickup', 'delivery'),
        allowNull: false
    },
    order_status: {
        type: DataTypes.ENUM('draft', 'pending', 'completed', 'cancelled'),
        defaultValue: 'draft'
    },
    order_type: {
        type: DataTypes.ENUM('bulk', 'custom'),
        allowNull: false
    },

    // Payment tracking
    advance_payment: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    remaining_payment: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    is_fully_paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    // Custom order specific fields
    image_sketch_url: {
        type: DataTypes.STRING(500),
        allowNull: true // For custom orders
    },

    // Additional fields
    comments: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    manager_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    manager_approved_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    manager_approved_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
});

module.exports = Order;