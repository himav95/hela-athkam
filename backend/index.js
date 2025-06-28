const app = require('./app');
const sequelize = require('./Config/db');
const { setupAssociations } = require('./Models/ModelAssociation');

async function initializeServer() {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log('Database connected!');

        // Set up model associations
        setupAssociations();

        // Safe sync options for development
        const syncOptions = {
            alter: process.env.NODE_ENV === 'development',
            force: false // NEVER use force:true in production
        };

        // await sequelize.sync(syncOptions);
// Temporarily disable sync to prevent table modifications
        console.log('Database sync disabled - using existing tables');


        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Server initialization failed:', err);
        process.exit(1);
    }
}

initializeServer();