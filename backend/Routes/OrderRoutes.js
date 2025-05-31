const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middleware/AuthMiddleware');
const { uploadSingleImage, handleUploadError } = require('../Middleware/UploadMiddleware');
const {
    createBulkOrder,
    createCustomOrder,
    getOrders,
    getOrderById,
    bulkOrderValidationRules,
    customOrderValidationRules
} = require('../Controllers/OrderController');

// POST /api/orders/bulk - Create bulk order
router.post('/bulk',
    authenticateToken,
    bulkOrderValidationRules,
    createBulkOrder
);

// POST /api/orders/custom - Create custom order (with file upload)
router.post('/custom',
    authenticateToken,
    uploadSingleImage,
    handleUploadError,
    customOrderValidationRules,
    createCustomOrder
);

// GET /api/orders - Get orders (user's own or all for admin)
router.get('/',
    authenticateToken,
    getOrders
);

// GET /api/orders/:id - Get single order by ID
router.get('/:id',
    authenticateToken,
    getOrderById
);

module.exports = router;