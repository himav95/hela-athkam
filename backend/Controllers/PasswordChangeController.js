// user password changing logic is here.

const userModule = require('../Models/UserModel');
const bcrypt = require('bcrypt');

const updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // Validate input
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide both old and new password",
            });
        }

        // Basic password validation
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 6 characters long",
            });
        }

        // Check if new password is same as old password
        if (oldPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: "New password must be different from old password",
            });
        }

        // Find user
        const user = await userModule.findOne({ where: { id: req.user.id } });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Verify old password
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // Hash new password manually before updating
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password using raw query to avoid double hashing
        await userModule.sequelize.query(
            'UPDATE users SET password_hash = ?, updated_at = NOW() WHERE id = ?',
            {
                replacements: [hashedPassword, req.user.id],
                type: userModule.sequelize.QueryTypes.UPDATE
            }
        );

        res.json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        console.error('Change password error:', error);
        next(error);
    }
}

module.exports = updatePassword;