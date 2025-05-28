// test-db.js - Run this to test your database connection
require('dotenv').config();
const sequelize = require('./Config/db');

async function testDatabaseConnection() {
    try {
        console.log('Testing database connection...');
        await sequelize.authenticate();
        console.log('✅ Database connection successful!');

        // Test model import
        const User = require('./Models/UserModel');
        console.log('✅ User model imported successfully');

        // Test database sync
        await sequelize.sync({ alter: true });
        console.log('✅ Database sync successful');

        process.exit(0);
    } catch (error) {
        console.error('❌ Database test failed:');
        console.error(error);
        process.exit(1);
    }
}

testDatabaseConnection();