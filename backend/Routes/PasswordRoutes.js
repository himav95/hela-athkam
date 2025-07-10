// Routes/PasswordRoutes.js
// user password change routing is here.
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middleware/AuthMiddleware');
const updatePassword = require('../Controllers/PasswordChangeController');

// PUT /api/password/change - Change user password
router.put('/change', authenticateToken, updatePassword);

module.exports = router;