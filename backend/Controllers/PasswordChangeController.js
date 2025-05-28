const userModule = require('../Models/UserModel');

const updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword} = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "Please provide both old and new password",
            });
        }


        const user = await userModule.findOne({ where: { id: req.user.id } });

        const isPasswordCorrect = await bycrypt.compare(oldPassword, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                messsage: "Old password is incorrect",
            });
        }

        const hashedPassword = await bycrypt.hash(newPassword, 10);
        await userModule.update({ password: hashedPassword}, { where: {id: req.user.id}});

        res.json({ 
            message: "Password updated successfully",
        });

    } catch (error) {
        next(error);
    }
}

module.exports = updatePassword;