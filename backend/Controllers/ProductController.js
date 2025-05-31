const Product = require('../Models/ProductModel');

// Test endpoint to verify route is working
const testProducts = async (req, res) => {
    res.json({
        success: true,
        message: 'Products API is working!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
};

// GET /api/products - Get all active products
const getAllProducts = async (req, res) => {
    try {
        console.log('getAllProducts called - fetching products...');

        const products = await Product.findAll({
            // REMOVED: is_active filter since this column doesn't exist in  database bt later check again!!!
            attributes: ['product_id', 'product_name', 'price', 'description', 'category', 'stock'],
            order: [['product_name', 'ASC']]
        });

        console.log(`Found ${products.length} active products`);

        res.json({
            success: true,
            products: products,
            count: products.length
        });

    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching products',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET /api/products/:id - Get single product
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findOne({
            where: {
                product_id: id
                // REMOVED: is_active filter since this column doesn't exist in database
            },
            // FIXED: Changed 'stock_quantity' to 'stock' to match database schema.  remember to check if problem occur with other files cause it did before.
            attributes: ['product_id', 'product_name', 'price', 'description', 'category', 'stock']
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            product: product
        });

    } catch (error) {
        console.error('Get product by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching product',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    testProducts,
    getAllProducts,
    getProductById
};