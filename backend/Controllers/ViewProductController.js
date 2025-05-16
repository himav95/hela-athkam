const productModel = require("../Models/ProductModel");

const getAllMessages = async (req, res) => {
    try {
        const products = await productModel.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).jsond({
            message: 'Something went wrong', error
        });
    }
}

module.exports = getAllMessages;