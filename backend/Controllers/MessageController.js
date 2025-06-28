// Controller for handling contact form message submissions
// Only handles public contact form submissions (non-logged in users)

const Message = require('../Models/MessageModel');
const { body, validationResult } = require('express-validator');

// Validation rules for message submission
const messageValidationRules = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2-100 characters')
        .matches(/^[a-zA-Z\s'-]+$/)
        .withMessage('Name can only contain letters, spaces, hyphens and apostrophes'),

    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address')
        .isLength({ max: 255 })
        .withMessage('Email is too long'),

    body('subject')
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Subject must be between 5-200 characters')
        .notEmpty()
        .withMessage('Subject is required'),

    body('message')
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Message must be between 10-1000 characters')
        .notEmpty()
        .withMessage('Message is required')
];

// POST /api/messages - Submit contact form message
const createMessage = async (req, res) => {
    try {
        // Check validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Message validation failed:', errors.array());
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
            });
        }

        const { name, email, subject, message } = req.body;
        console.log('Creating new contact message from:', email);

        // Create new message
        const newMessage = await Message.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            subject: subject.trim(),
            message: message.trim()
        });

        console.log('Message created successfully with ID:', newMessage.id);

        // Return success response without sensitive data
        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully. We will get back to you soon!',
            messageId: newMessage.id,
            submittedAt: newMessage.created_at
        });

    } catch (error) {
        console.error('Create message error:', error);

        // Handle database constraint errors
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = {};
            error.errors.forEach(err => {
                validationErrors[err.path] = err.message;
            });

            return res.status(400).json({
                success: false,
                message: 'Please check your input and try again',
                errors: validationErrors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Export validation rules and controller function
module.exports = {
    messageValidationRules,
    createMessage
};