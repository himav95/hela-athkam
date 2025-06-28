// Routes for contact form message submissions
// Public routes - no authentication required

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { messageValidationRules, createMessage } = require('../Controllers/MessageController');

// Rate limiting for contact form - 3 messages per 15 minutes per IP
const messageRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 3 requests per 15 minutes
    message: {
        success: false,
        message: 'Too many messages sent. Please wait 15 minutes before sending another message.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// POST /api/messages - Submit contact form message
router.post('/',
    messageRateLimit,
    messageValidationRules,
    createMessage
);

module.exports = router;