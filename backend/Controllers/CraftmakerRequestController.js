// Craftmaker request form component logic and admin dashboard craftmaker request view table logics are here.
const CraftmakerRequest = require('../Models/RequestModel');
const { body, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const sequelize = require('../Config/db');

// Validation rules for craftmaker applications
const craftmakerApplicationValidationRules = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 255 })
        .withMessage('Name must be between 2-255 characters')
        .matches(/^[a-zA-Z\s\.]+$/)
        .withMessage('Name can only contain letters, spaces, and dots'),

    body('nic')
        .trim()
        .notEmpty()
        .withMessage('NIC is required')
        .isLength({ min: 10, max: 20 })
        .withMessage('NIC must be between 10-20 characters')
        .matches(/^([0-9]{9}[xXvV]|[0-9]{12})$/)
        .withMessage('Invalid NIC format'),

    body('email')
        .optional({ nullable: true, checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),

    body('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required')
        .matches(/^(\+94|0)?[0-9]{9}$/)
        .withMessage('Invalid phone number format'),

    body('address')
        .trim()
        .notEmpty()
        .withMessage('Address is required')
        .isLength({ min: 10, max: 500 })
        .withMessage('Address must be between 10-500 characters'),

    body('product_name')
        .trim()
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ min: 2, max: 255 })
        .withMessage('Product name must be between 2-255 characters'),

    body('product_category')
        .notEmpty()
        .withMessage('Product category is required')
        .isIn(['houseware', 'kitchenware', 'tableware', 'bags', 'other'])
        .withMessage('Invalid product category'),

    body('description')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ max: 2000 })
        .withMessage('Description must be less than 2000 characters')
];

// POST /api/craftmaker-applications - Submit craftmaker application
const submitCraftmakerApplication = async (req, res) => {
    try {
        console.log('=== CRAFTMAKER APPLICATION SUBMISSION DEBUG ===');
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        // Check validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());

            // Clean up uploaded files if validation fails
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => {
                    const filePath = file.path;
                    fs.unlink(filePath, (err) => {
                        if (err) console.error('Error deleting file:', err);
                    });
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
            });
        }

        const {
            name,
            nic,
            email,
            phone,
            address,
            product_name,
            product_category,
            description
        } = req.body;

        console.log('Extracted form data:', {
            name, nic, email, phone, address, product_name, product_category, description
        });

        // Check if NIC already exists
        console.log('Checking for existing NIC:', nic);
        const existingApplication = await CraftmakerRequest.findOne({
            where: { nic: nic }
        });

        if (existingApplication) {
            console.log('Found existing application:', existingApplication.craftsman_id);

            // Clean up uploaded files
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => {
                    const filePath = file.path;
                    fs.unlink(filePath, (err) => {
                        if (err) console.error('Error deleting file:', err);
                    });
                });
            }

            return res.status(409).json({
                success: false,
                message: 'An application with this NIC already exists',
                error: 'DUPLICATE_NIC'
            });
        }

        // Handle uploaded images
        let productImages = [];
        if (req.files && req.files.length > 0) {
            productImages = req.files.map(file => `/Uploads/craftmaker-applications/products/${file.filename}`);
            console.log('Product images:', productImages);
        }

        // Prepare data for database insertion - matching exact database structure
        const applicationData = {
            name: name,
            nic: nic,
            email: email || null,
            phone: phone,
            address: address,
            product_name: product_name,
            product_category: product_category,
            description: description || null,
            product_images: productImages,
            request_status: 'pending', // Initial status as requested
            request_date: new Date()
        };

        console.log('Data to be inserted:', applicationData);

        // Test database connection
        console.log('Testing database connection...');
        await sequelize.authenticate();
        console.log('Database connection OK');

        // Create craftmaker application
        console.log('Creating craftmaker application...');
        const craftmakerApplication = await CraftmakerRequest.create(applicationData);
        console.log('Created application:', craftmakerApplication.toJSON());

        // Verify the record was actually created
        console.log('Verifying record creation...');
        const verifyRecord = await CraftmakerRequest.findByPk(craftmakerApplication.craftsman_id);
        console.log('Verification result:', verifyRecord ? verifyRecord.toJSON() : 'NOT FOUND');

        res.status(201).json({
            success: true,
            message: 'Craftmaker application submitted successfully',
            application: {
                craftsman_id: craftmakerApplication.craftsman_id,
                name: craftmakerApplication.name,
                nic: craftmakerApplication.nic,
                product_name: craftmakerApplication.product_name,
                product_category: craftmakerApplication.product_category,
                request_status: craftmakerApplication.request_status,
                request_date: craftmakerApplication.request_date
            }
        });

    } catch (error) {
        console.error('=== CRAFTMAKER APPLICATION ERROR ===');
        console.error('Error details:', error);
        console.error('Error stack:', error.stack);

        // Clean up uploaded files if application creation failed
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                const filePath = file.path;
                fs.unlink(filePath, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while submitting application',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET /api/craftmaker-applications - Get all applications (Admin only)
const getCraftmakerApplications = async (req, res) => {
    try {
        const { status, category, page = 1, limit = 10, search } = req.query;

        // Build where clause for filtering
        let whereClause = {};

        if (status) {
            whereClause.request_status = status;
        }

        if (category) {
            whereClause.product_category = category;
        }

        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { nic: { [Op.iLike]: `%${search}%` } },
                { product_name: { [Op.iLike]: `%${search}%` } }
            ];
        }

        // Calculate pagination
        const offset = (page - 1) * limit;

        const { count, rows: applications } = await CraftmakerRequest.findAndCountAll({
            where: whereClause,
            attributes: [
                'craftsman_id', 'name', 'nic', 'email', 'phone', 'address',
                'product_name', 'product_category', 'description',
                'product_images', 'request_status', 'request_date'
            ],
            order: [['request_date', 'DESC']],
            limit: parseInt(limit),
            offset: offset
        });

        res.json({
            success: true,
            applications: applications,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                totalApplications: count,
                hasNextPage: offset + applications.length < count,
                hasPrevPage: page > 1
            }
        });

    } catch (error) {
        console.error('Get craftmaker applications error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching applications',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET /api/craftmaker-applications/:id - Get single application by ID
const getCraftmakerApplicationById = async (req, res) => {
    try {
        const { id } = req.params;

        const application = await CraftmakerRequest.findByPk(id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.json({
            success: true,
            application: application
        });

    } catch (error) {
        console.error('Get craftmaker application by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching application',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// PUT /api/craftmaker-applications/:id/status - Update application status (Admin only)
const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log(`Updating application ${id} status to: ${status}`);

        // Validate status
        const validStatuses = ['pending', 'approved', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
            });
        }

        const application = await CraftmakerRequest.findByPk(id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Update application status
        await application.update({
            request_status: status
        });

        console.log(`Application ${id} status updated to ${status}`);

        res.json({
            success: true,
            message: `Application ${status} successfully`,
            application: {
                craftsman_id: application.craftsman_id,
                name: application.name,
                request_status: application.request_status
            }
        });

    } catch (error) {
        console.error('Update application status error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating application status',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// DELETE /api/craftmaker-applications/:id - Delete application (Admin only)
const deleteCraftmakerApplication = async (req, res) => {
    try {
        const { id } = req.params;

        console.log(`Deleting craftmaker application ${id}`);

        const application = await CraftmakerRequest.findByPk(id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Delete associated files if they exist
        if (application.product_images && application.product_images.length > 0) {
            application.product_images.forEach(imagePath => {
                const fullPath = path.join(__dirname, '..', imagePath);
                fs.unlink(fullPath, (err) => {
                    if (err) console.error('Error deleting image file:', err);
                });
            });
        }

        // Delete the application record
        await application.destroy();

        console.log(`Application ${id} deleted successfully`);

        res.json({
            success: true,
            message: 'Application deleted successfully'
        });

    } catch (error) {
        console.error('Delete craftmaker application error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting application',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET /api/craftmaker-applications/stats - Get application statistics (Admin only)
const getApplicationStats = async (req, res) => {
    try {
        const totalApplications = await CraftmakerRequest.count();
        const pendingApplications = await CraftmakerRequest.count({
            where: { request_status: 'pending' }
        });
        const approvedApplications = await CraftmakerRequest.count({
            where: { request_status: 'approved' }
        });
        const rejectedApplications = await CraftmakerRequest.count({
            where: { request_status: 'rejected' }
        });

        // Get applications by category
        const categoryStats = await CraftmakerRequest.findAll({
            attributes: [
                'product_category',
                [sequelize.fn('COUNT', sequelize.col('product_category')), 'count']
            ],
            group: ['product_category'],
            raw: true
        });

        res.json({
            success: true,
            stats: {
                total: totalApplications,
                pending: pendingApplications,
                approved: approvedApplications,
                rejected: rejectedApplications,
                categoryBreakdown: categoryStats
            }
        });

    } catch (error) {
        console.error('Get application stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching stats',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    submitCraftmakerApplication,
    getCraftmakerApplications,
    getCraftmakerApplicationById,
    updateApplicationStatus,
    deleteCraftmakerApplication, // Added delete function
    getApplicationStats,
    craftmakerApplicationValidationRules
};