const AdminModel = require('../Models/UserModel');
const bcrypt = require("bcrypt");

const updatePassword = async (req, res) => {
    const {
        email
    } = req.params;

    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: 'Please provide both old and new password',
            });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({
                message: 'Old and new password cannot be the same',
            });
        }

        // const user = await userModule.findOne({ where: { email } });

        const user = await AdminModel.findOne({
            where: {
                email
            }
        });

        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Old password is incorrect',
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await AdminModel.update({ password: hashedPassword }, { where: { email: user.email } });

        res.status(201).json({
            status: 201,
            message: 'Password updated successfully',
        });

    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong"
        });
        console.log(error);
    }
}

module.exports = updatePassword;