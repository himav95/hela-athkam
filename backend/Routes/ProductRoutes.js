const express = require('express');
const router = express.Router();
const Product = require('../Models/ProductModel');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// GET products by category
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.findAll({
            where: { category: req.params.category }
        });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

module.exports = router;