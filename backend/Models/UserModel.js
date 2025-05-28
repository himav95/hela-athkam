const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password_hash', // Maps to database column name
        set(value) {
            // Auto-hash password when setting
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(value, saltRounds);
            this.setDataValue('password', hashedPassword);
        }
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
});

module.exports = User;