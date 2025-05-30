// This file contains the API service for handling authentication and user profile operations. server starts up here.
const app = require('./app');
const sequelize = require('./Config/db');

// Test database connection
sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.error('Database connection failed:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});