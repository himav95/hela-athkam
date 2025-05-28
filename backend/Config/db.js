// config/db.js (Sequelize version) not the pg setup.
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: console.log, // false should be her Disable SQL log spam in console
    }
);

// Test the connection
sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.error('Connection error:', err));

module.exports = sequelize;