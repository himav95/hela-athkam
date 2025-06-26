// CraftmakerRequestRoutes.js on join us page for craftmaker requests form routes is here.

const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../Middleware/AuthMiddleware');
const {
    uploadCraftmakerProductImages,
    handleCraftmakerUploadError,
    validateCraftmakerUploadedFiles
} = require('../Middleware/CraftmakerUploadMiddleware');
const {
    submitCraftmakerApplication,
    getCraftmakerApplications,
    getCraftmakerApplicationById,
    updateApplicationStatus,
    getApplicationStats,
    craftmakerApplicationValidationRules
} = require('../Controllers/CraftmakerRequestController');

// POST /api/craftmaker-applications - Submit new craftmaker application (Public)
router.post('/',
    uploadCraftmakerProductImages,
    handleCraftmakerUploadError,
    validateCraftmakerUploadedFiles,
    craftmakerApplicationValidationRules,
    submitCraftmakerApplication
);

// GET /api/craftmaker-applications - Get all applications (Admin only)
router.get('/',
    authenticateToken,
    requireAdmin,
    getCraftmakerApplications
);

// GET /api/craftmaker-applications/stats - Get application statistics (Admin only)
router.get('/stats',
    authenticateToken,
    requireAdmin,
    getApplicationStats
);

// GET /api/craftmaker-applications/:id - Get single application by ID (Admin only)
router.get('/:id',
    authenticateToken,
    requireAdmin,
    getCraftmakerApplicationById
);

// PUT /api/craftmaker-applications/:id/status - Update application status (Admin only)
router.put('/:id/status',
    authenticateToken,
    requireAdmin,
    updateApplicationStatus
);

module.exports = router;