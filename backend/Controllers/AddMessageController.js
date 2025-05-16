const messageModel = require("../Models/MessageModel");   // imports MessageModel from Models.

const addMessages = async (req, res) => {                // defines asynchronous function 'addMessages' with request(req) and response(res) parameters. handles incoming HTTP requests in Express.js app.
    try {                                                // try-catch block for error handling.
        const {
            name,
            email,
            subject,
            message
        } = req.body;                             // extract name, email, ... properties from req.body object. assumes incoming request includes mentioned properties.

        console.log(req.body);                    // logs entire request body to console. inspect the content of the incoming request.


        console.log(req.body);

        const siteMessage = await messageModel.create({        // creates a new message object in database. containing mentioned properties.
            name,
            email,
            subject,
            message
        });

        res.status(201).json({success:true, message:'Message created', siteMessage});   // message creation successful: sends HTTP response with status code 201.

    } catch(error) {                                  
        console.error(error);
        res.status(500).json({success:false, message:'Failed to create message'});      // message creation failure: sends HTTP response with status code 500.
    }
}


module.exports = addMessages;