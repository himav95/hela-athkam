// express app configuration file.
// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import models to ensure they're registered before associations
require('./Models/OrderModel');
require('./Models/UserModel');
require('./Models/ProductModel');
require('./Models/RequestModel');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./Routes/AuthRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./Routes/userRoutes');
app.use('/api/users', userRoutes);

app.use('/api/products', require('./Routes/ProductRoutes'));

// order routes (public access for submissions)
const orderRoutes = require('./Routes/OrderRoutes');
app.use('/api/orders', orderRoutes);

const adminRoutes = require('./Routes/AdminRoutes');
app.use('/api/admin', adminRoutes);

// Craftmaker request routes (public access for submissions)
const craftmakerRequestRoutes = require('./Routes/CraftmakerRequestRoutes');
app.use('/api/craftmaker-applications', craftmakerRequestRoutes);

// Serve uploaded files statically
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

// Admin dashboard routes
const dashboardRoutes = require('./routes/DashboardRoutes'); // Adjust path as needed
app.use('/api/dashboard', dashboardRoutes);

module.exports = app;