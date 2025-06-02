// express app configuration file.
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./Routes/AuthRoutes');  // Importing auth routes
app.use('/api/auth', authRoutes);

const userRoutes = require('./Routes/userRoutes'); // Importing user routes
app.use('/api/users', userRoutes);

// import and register product routes
app.use('/api/products', require('./Routes/ProductRoutes')); // Importing product routes

// import and register order routes
const orderRoutes = require('./Routes/OrderRoutes'); // Importing order routes
app.use('/api/orders', orderRoutes);

// Exporting the the app. server does not start up here.
module.exports = app;