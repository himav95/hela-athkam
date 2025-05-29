// routes/userRoutes.js regarding user profile management
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middleware/authMiddleware');
const User = require('../Models/UserModel');
const { body, validationResult } = require('express-validator');

// Validation rules for profile update
const profileValidationRules = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2-50 characters'),

    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email format'),

    body('phone')
        .optional({ nullable: true, checkFalsy: true })
        .matches(/^[\+]?[\d\s\-\(\)]{10,20}$/)
        .withMessage('Invalid phone number format'),

    body('address')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ max: 500 })
        .withMessage('Address must be less than 500 characters')
];

// GET /api/users/profile - Get current user's profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email', 'phone', 'address', 'role', 'created_at']
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
                created_at: user.created_at
            }
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching profile'
        });
    }
});

// PUT /api/users/profile - Update current user's profile
router.put('/profile', authenticateToken, profileValidationRules, async (req, res) => {
    try {
        // Check validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
            });
        }

        const { name, email, phone, address } = req.body;

        // Check if email is already taken by another user
        if (email !== req.user.email) {
            const existingUser = await User.findOne({
                where: {
                    email: email,
                    id: { [require('sequelize').Op.ne]: req.user.id }
                }
            });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already in use',
                    errors: { email: 'This email is already registered' }
                });
            }
        }

        // Update user profile
        const [updatedRowsCount] = await User.update(
            {
                name: name.trim(),
                email: email.toLowerCase(),
                phone: phone?.trim() || null,
                address: address?.trim() || null
            },
            {
                where: { id: req.user.id },
                returning: true
            }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Fetch updated user data
        const updatedUser = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email', 'phone', 'address', 'role']
        });

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
                role: updatedUser.role
            }
        });

    } catch (error) {
        console.error('Update profile error:', error);

        // Handle unique constraint errors
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                message: 'Email already in use',
                errors: { email: 'This email is already registered' }
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while updating profile'
        });
    }
});

// GET /api/users/me - Get minimal current user info (for navbar, etc.)
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email', 'role']
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

module.exports = router;