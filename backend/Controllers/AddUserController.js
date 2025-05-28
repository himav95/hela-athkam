const userModule = require('../Models/UserModel');     // imports 'AdminModule' from models.

 /* imports 'bcrypt' module for hashing passwords securely. 
    allows hashing before storing passwords in db and comparing hashed passwords in authentication. */
const bcrypt = require('bcrypt');                

const addUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user =  await userModule.create({name, email, password: hashedPassword});

        res.status(201).json({message: 'User created', user});

    } catch(error) {
        res.status(500).json({message: 'Something went wrong'});
        console.log(error);
    }
}

module.exports = addUser;
