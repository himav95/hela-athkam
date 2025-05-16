const productModel = require('../Models/ProductModel');     // imports ProductModel module from Models.

const addProduct = async(req, res) => {                   // defines an asynchronous function, 'addProduct' lilely to be end point handler for adding an product to the database.
    try {
        let {
            name,
            price,
            description,
            category,
            image,
            imageType,
        } = req.body;                              // extracts properties from request body assuming it containes mentioned properties.

        const imageBuffer = Buffer.from(image, 'base64');        // creates buffer from image data, provided in request body and expected to be encoded in base64 format.

        const product = await productModel.create({
            name,
            price,
            description,
            category,
            image: imageBuffer,
            imageType
        });

        res.status(201).json({ message: 'Product created', status: 201, product});

    } catch(error) {
        res.status(500).json({ message: 'Something went wrong', error});   // sends http response with status code 500 indicating an internal server error.
    }
}


module.exports = addProduct