const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

const app = express();

// CORS Configuration (Dev-only simplified version)
app.use(cors({
    origin: 'http://localhost:3000', // Your React frontend URL
    credentials: true, // Allow cookies/auth headers if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Middleware to parse JSON requests
app.use(express.json());

// Auth Routes (Login/Register)
const authRoutes = require('./Routes/AuthRoutes'); // Path to your auth routes
app.use('/api/auth', authRoutes);

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});