const messageModel = require('../Models/MessageModel');

const getAllMessages = async (req, res) => {
    try {
        const siteMessages = await messageModel.findAll();
        res.json(siteMessages);
    } catch (error) {
        console.error(error);
    }
}

module.exports = getAllMessages;