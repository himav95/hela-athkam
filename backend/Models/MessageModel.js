// imports sequelize and DataTypes from './SequelizeInit' assuming it exports an object containing mentioned two objects.
const {sequelize, DataTypes} = require('./SequelizeInit');

// defines sequelize model 'Message'
const Message = sequelize.define('Messages', {                
    name: {                                                   // properties and configurations on Messages table/model.
        type: DataTypes.STRING,                               // columns as name, email and so on.
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

// Message.sync({alter:true});

module.exports = Message;