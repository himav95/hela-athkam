// this contains the model for Craftmaker Request.

const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const CraftmakerRequest = sequelize.define('CraftmakerRequest', {
    craftsman_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'craftsman_id'
    },

    // Personal Information
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 255]
        }
    },

    nic: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [10, 20]
        }
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isEmail: true
        }
    },

    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [10, 20]
        }
    },

    address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [10, 500]
        }
    },

    // Product Information
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 255]
        }
    },

    product_category: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['houseware', 'kitchenware', 'tableware', 'bags', 'other']] // Updated categories
        }
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 2000]
        }
    },

    // Status Field
    request_status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'approved', 'rejected']]
        }
    },

    // Timestamp (automatic on form submission)
    request_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    // Image Storage - Using ARRAY to match database
    product_images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: []
    }

}, {
    tableName: 'craftmakers',
    timestamps: false, // Using custom request_date instead
    underscored: true,
    indexes: [
        {
            fields: ['nic'],
            unique: true
        },
        {
            fields: ['request_status']
        },
        {
            fields: ['product_category']
        }
    ]
});

module.exports = CraftmakerRequest;