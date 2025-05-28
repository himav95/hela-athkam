const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;