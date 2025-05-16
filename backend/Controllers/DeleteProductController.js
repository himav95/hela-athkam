const productModel = require("../Models/ProductModel");

const deleteProduct = async(req, res) => {
    const { id } = req.params;

    try {
        const product = await productModel.findOne({
            where: { id }
        });

        if(!product) {
            throw "Product not found"
        }

        await product.destroy();
        res.status(statusCodes.statusCodes.OK).json({
            message: "Product deleted"
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong"});
    }
}

module.exports = deleteProduct;