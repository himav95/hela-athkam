// Message table model. join us page contact form messages.

const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Message = sequelize.define('Message', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 100],
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    subject: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            len: [5, 200],
            notEmpty: true
        }
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [10, 1000],
            notEmpty: true
        }
    }
}, {
    tableName: 'messages',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false, // No updated_at field as messages shouldn't be updated
    underscored: true
});

module.exports = Message;