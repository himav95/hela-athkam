// imports sequelize and DataTypes objects form './SequelizeInit'
const {sequelize, DataTypes} = require('./SequelizeInit');

// defines sequelize model 'Product'
const Product = sequelize.define('Products', {
    name: {                                           // properties and configurations on 'Products' table/model. colums as name, proce and so on.
        type: DataTypes.STRING,
        allowNull: false,
    },

    Price: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    image: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
    },

    imageType: {
        type: DataTypes.STRING,
        allowNull: true,
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


// Product.sync({alter:true}).then(r=>{});

module.exports = Product;