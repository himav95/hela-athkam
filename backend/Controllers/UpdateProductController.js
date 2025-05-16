const productModel = require('../Models/ProductModel');

const updateProduct = async (req, res) => {
    const { id} = req.params;

    try {
        const product = await productModel.findOne({
            where: { id }
        });

        if (!product) {
            return "Product not found";
        } else {
            let {
                name,
                price,
                description,
                category,
                image,
                imageType
            } = req.body;

            const imageBuffer = Buffer.from(image, 'base64');

            const updateProduct = await productModel.update({
                name,
                price,
                description,
                category,
                image: imageBuffer,
                imageType,
            }, {where: {id}
        });

        res.status(201).json({
            message: 'Product updated successfullu',
            updatedProduct
        });

        }

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}

module.exports = updateProduct;