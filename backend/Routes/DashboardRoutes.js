// Dashboard Routes for weekly metrics and modal data is here.
// Admin-only routes for dashboard functionality

const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../Middleware/AuthMiddleware');
const {
    getWeeklyCounts,
    getWeeklyBulkOrders,
    getWeeklyCustomOrders,
    getWeeklyDeliveries,
    getWeeklyMakerRequests,
    getWeeklyMessages
} = require('../Controllers/DashboardController');

// GET /api/dashboard/weekly-counts - Get weekly counts for dashboard cards
router.get('/weekly-counts',
    authenticateToken,
    requireAdmin,
    getWeeklyCounts
);

// GET /api/dashboard/weekly-bulk-orders - Get weekly bulk orders for modal
router.get('/weekly-bulk-orders',
    authenticateToken,
    requireAdmin,
    getWeeklyBulkOrders
);

// GET /api/dashboard/weekly-custom-orders - Get weekly custom orders for modal
router.get('/weekly-custom-orders',
    authenticateToken,
    requireAdmin,
    getWeeklyCustomOrders
);

// GET /api/dashboard/weekly-deliveries - Get weekly completed orders (deliveries) for modal
// router.get('/weekly-deliveries',
//     authenticateToken,
//     requireAdmin,
//     getWeeklyDeliveries
// );

// GET /api/dashboard/weekly-maker-requests - Get weekly craftmaker requests for modal
router.get('/weekly-maker-requests',
    authenticateToken,
    requireAdmin,
    getWeeklyMakerRequests
);

// GET /api/dashboard/weekly-messages - Get weekly messages for modal
router.get('/weekly-messages',
    authenticateToken,
    requireAdmin,
    getWeeklyMessages
);

module.exports = router;