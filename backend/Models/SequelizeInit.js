// imports 'dotenv' package(node.js module), which allows to load environment variables from a '.env' to 'process.env'
const dotenv = require('dotenv');

// calls config and enables access to environment variables throughout application.
dotenv.config();

const { DataTypes, Sequelize } = require('sequelize');         // imports datatypes and sequelize objects from sequelize package.
const sequelize = new Sequelize(process.env.DATABASE_URL, {     // creates new instance.
    dialect: 'postgres'                                         // indicates sequelize should use postgrSQL.
});

module.exports = { DataTypes, sequelize}                     // makes objects available for other modules to import and use.