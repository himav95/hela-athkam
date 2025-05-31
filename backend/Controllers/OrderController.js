const Order = require('../Models/OrderModel');
const Product = require('../Models/ProductModel');
const { body, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

// Validation rules for bulk orders
const bulkOrderValidationRules = [
    body('productId')
        .isInt({ min: 1 })
        .withMessage('Valid product ID is required'),

    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),

    body('deliveryDate')
        .isISO8601()
        .withMessage('Valid delivery date is required')
        .custom((value) => {
            const deliveryDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (deliveryDate < today) {
                throw new Error('Delivery date cannot be in the past');
            }
            return true;
        }),

    body('deliveryOption')
        .isIn(['pickup', 'delivery'])
        .withMessage('Delivery option must be either pickup or delivery'),

    body('comments')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('Comments must be less than 1000 characters')
];

// Validation rules for custom orders
const customOrderValidationRules = [
    body('orderType')
        .isIn(['existing', 'custom'])
        .withMessage('Order type must be either existing or custom'),

    body('productId')
        .if(body('orderType').equals('existing'))
        .isInt({ min: 1 })
        .withMessage('Valid product ID is required for existing products'),

    body('productName')
        .if(body('orderType').equals('custom'))
        .notEmpty()
        .withMessage('Product name is required for custom orders'),

    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),

    body('deliveryDate')
        .isISO8601()
        .withMessage('Valid delivery date is required')
        .custom((value) => {
            const deliveryDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (deliveryDate < today) {
                throw new Error('Delivery date cannot be in the past');
            }
            return true;
        }),

    body('comments')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('Comments must be less than 1000 characters')
];

// POST /api/orders/bulk - Create bulk order
const createBulkOrder = async (req, res) => {
    try {
        // Check validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
            });
        }

        const { productId, quantity, deliveryDate, deliveryOption, comments } = req.body;
        const userId = req.user.id;

        // Find the product to get price and name
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Calculate total amount
        const unitPrice = product.price;
        const totalAmount = unitPrice * quantity;

        // Create bulk order
        const order = await Order.create({
            user_id: userId,
            product_id: productId,
            product_name: product.product_name,
            quantity: quantity,
            unit_price: unitPrice,
            total_amount: totalAmount,
            delivery_date: deliveryDate,
            delivery_type: deliveryOption,
            order_type: 'bulk',
            order_status: 'pending',
            comments: comments || null
        });

        res.status(201).json({
            success: true,
            message: 'Bulk order created successfully',
            order: {
                order_id: order.order_id,
                product_name: order.product_name,
                quantity: order.quantity,
                total_amount: order.total_amount,
                delivery_date: order.delivery_date,
                delivery_type: order.delivery_type,
                order_status: order.order_status,
                created_at: order.created_at
            }
        });

    } catch (error) {
        console.error('Create bulk order error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating bulk order',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// POST /api/orders/custom - Create custom order
const createCustomOrder = async (req, res) => {
    try {
        // Check validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
            });
        }

        const { orderType, productId, productName, quantity, deliveryDate, comments } = req.body;
        const userId = req.user.id;

        let finalProductId = null;
        let finalProductName = '';
        let unitPrice = 0;

        if (orderType === 'existing') {
            // Find the existing product
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            finalProductId = productId;
            finalProductName = product.product_name;
            unitPrice = product.price;
        } else {
            // Custom design
            finalProductName = productName || 'Custom Design';
            unitPrice = 0; // Price to be determined later
        }

        // Handle uploaded image
        let imageSketchUrl = null;
        if (req.file) {
            imageSketchUrl = `/uploads/orders/sketches/${req.file.filename}`;
        }

        // Calculate total amount
        const totalAmount = unitPrice * quantity;

        // Create custom order
        const order = await Order.create({
            user_id: userId,
            product_id: finalProductId,
            product_name: finalProductName,
            quantity: quantity,
            unit_price: unitPrice,
            total_amount: totalAmount,
            delivery_date: deliveryDate,
            delivery_type: 'pickup', // Default for custom orders
            order_type: 'custom',
            order_status: 'pending',
            image_sketch_url: imageSketchUrl,
            comments: comments || null
        });

        res.status(201).json({
            success: true,
            message: 'Custom order created successfully',
            order: {
                order_id: order.order_id,
                product_name: order.product_name,
                quantity: order.quantity,
                total_amount: order.total_amount,
                delivery_date: order.delivery_date,
                order_type: order.order_type,
                order_status: order.order_status,
                image_sketch_url: order.image_sketch_url,
                created_at: order.created_at
            }
        });

    } catch (error) {
        console.error('Create custom order error:', error);

        // Clean up uploaded file if order creation failed
        if (req.file) {
            const filePath = path.join(__dirname, '../uploads/orders/sketches', req.file.filename);
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while creating custom order',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET /api/orders - Get orders (user's own orders or all orders for admin)
const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        const { status, type, page = 1, limit = 10 } = req.query;

        // Build where clause
        let whereClause = {};

        // If not admin, only show user's own orders
        if (userRole !== 'admin') {
            whereClause.user_id = userId;
        }

        // Filter by status if provided
        if (status) {
            whereClause.order_status = status;
        }

        // Filter by order type if provided
        if (type) {
            whereClause.order_type = type;
        }

        // Calculate pagination
        const offset = (page - 1) * limit;

        const { count, rows: orders } = await Order.findAndCountAll({
            where: whereClause,
            attributes: [
                'order_id', 'product_name', 'quantity', 'unit_price', 'total_amount',
                'delivery_date', 'delivery_type', 'order_type', 'order_status',
                'image_sketch_url', 'comments', 'created_at'
            ],
            order: [['created_at', 'DESC']],
            limit: parseInt(limit),
            offset: offset
        });

        res.json({
            success: true,
            orders: orders,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                totalOrders: count,
                hasNextPage: offset + orders.length < count,
                hasPrevPage: page > 1
            }
        });

    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching orders',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET /api/orders/:id - Get single order
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        let whereClause = { order_id: id };

        // If not admin, only allow access to user's own orders
        if (userRole !== 'admin') {
            whereClause.user_id = userId;
        }

        const order = await Order.findOne({
            where: whereClause,
            attributes: [
                'order_id', 'product_id', 'product_name', 'quantity', 'unit_price',
                'total_amount', 'delivery_date', 'delivery_type', 'order_type',
                'order_status', 'image_sketch_url', 'comments', 'advance_payment',
                'remaining_payment', 'is_fully_paid', 'created_at'
            ]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            order: order
        });

    } catch (error) {
        console.error('Get order by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching order',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    createBulkOrder,
    createCustomOrder,
    getOrders,
    getOrderById,
    bulkOrderValidationRules,
    customOrderValidationRules
};