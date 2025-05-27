/* import sequelize object and datatypes from "./sequelizeInit" module : To interact with database and 
define the types of data fields in the model. */
const {sequelize, DataTypes} = require("./SequelizeInit");

// defines 'admins' model and specifies the structure of 'admins' table in database.
const Admin = sequelize.define('admins', {
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

// admin.sync ({ alter: true });
module.exports = Admin;