const userModel = require('../Models/AdminModel');   // imports 'AdminModel from Models. contains functionalities regarding managing user accounts.
const bcrypt = require('bcrypt');                   // imports 'bycrypt' module: comparing hashed passwords for authentication.

const loginAuth = async(req, res) => {
    try {
        const {email, password} =  req.body;
        const user = await userModel.findOne({     // queries database using 'findOne' method of 'userModel' to find a user with a specified email.
            where: {email:email}
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                status: 404,
            });

        } else if (!password || !user.password) {         // this block checks, if the password or hased password of the user is missing.
            res.status(400).json({
                message: 'Missing required fields',
                status: 400,
            });

        } else {
            const isMatch = await bcrypt.compare(password, user.password);   // 'bycrypt.compare' function compare the plain-text password in the request with the hased password, stored in the db.
            if (isMatch) {                                                     // this block checks if the passwords match and responds accordingly.
                res.status(200).json({
                    message: 'Login Succesful',
                    status: 200,
                    user: {
                        name: user.name,
                        email: user.email,
                    }
                });
            } else {
                res.status(401).json({
                    message: 'Invalid Credentials',
                    status: 401,
                });
            }
        }

    } catch(error) {
        res.status(500).json({
            message: 'Something went wrong',
            status: 500,
        });
        console.log(error);
    }
};


module.exports = loginAuth;