const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');
const passwordChangeController = require('../Controllers/PasswordChangeController'); // Import password controller
const { authenticateToken } = require('../Middleware/AuthMiddleware'); // Import auth middleware

// AUTHENTICATION ROUTES (no auth required)
router.post('/login', authController.login);
router.post('/register', authController.register);

// PASSWORD CHANGE ROUTE (auth required)
router.put('/change-password', authenticateToken, passwordChangeController);

module.exports = router;