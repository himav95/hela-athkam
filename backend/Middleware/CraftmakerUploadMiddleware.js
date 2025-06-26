const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuration constants for craftmaker application uploads
const CRAFTMAKER_CONFIG = {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB per file
    ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    MAX_FILES: 5 // Allow up to 5 product images
};

// Ensure upload directory exists for craftmaker applications
const craftmakerUploadDir = path.join(__dirname, '../Uploads/craftmaker-applications/products');
if (!fs.existsSync(craftmakerUploadDir)) {
    fs.mkdirSync(craftmakerUploadDir, { recursive: true });
    console.log('Created craftmaker upload directory:', craftmakerUploadDir);
}

// Configure multer storage for craftmaker applications
const craftmakerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, craftmakerUploadDir);
    },
    filename: (req, file, cb) => {
        try {
            // Create unique filename: timestamp-nic-originalname
            const timestamp = Date.now();
            const nic = req.body.nic ? req.body.nic.replace(/[^a-zA-Z0-9]/g, '') : 'unknown';
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext)
                .replace(/[^a-zA-Z0-9]/g, '_') // Replace special chars with underscore
                .substring(0, 30); // Limit name length

            const filename = `${timestamp}-${nic}-${name}${ext}`;
            cb(null, filename);
        } catch (error) {
            cb(error, null);
        }
    }
});

// File filter for craftmaker product images
const craftmakerFileFilter = (req, file, cb) => {
    // Check file type
    if (!CRAFTMAKER_CONFIG.ALLOWED_TYPES.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'), false);
    }

    // Additional validation for file extension (security measure)
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    if (!allowedExtensions.includes(ext)) {
        return cb(new Error('Invalid file extension.'), false);
    }

    cb(null, true);
};

// Configure multer for craftmaker applications
const craftmakerUpload = multer({
    storage: craftmakerStorage,
    fileFilter: craftmakerFileFilter,
    limits: {
        fileSize: CRAFTMAKER_CONFIG.MAX_FILE_SIZE,
        files: CRAFTMAKER_CONFIG.MAX_FILES
    }
});

// Middleware for multiple file upload (for craftmaker product images)
const uploadCraftmakerProductImages = craftmakerUpload.array('productImages', CRAFTMAKER_CONFIG.MAX_FILES);

// Enhanced error handling middleware for craftmaker uploads
const handleCraftmakerUploadError = (error, req, res, next) => {
    console.error('Craftmaker upload error:', error);

    if (error instanceof multer.MulterError) {
        switch (error.code) {
            case 'LIMIT_FILE_SIZE':
                return res.status(400).json({
                    success: false,
                    message: `File too large. Maximum size is ${CRAFTMAKER_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB per file.`,
                    error: 'FILE_TOO_LARGE'
                });

            case 'LIMIT_FILE_COUNT':
                return res.status(400).json({
                    success: false,
                    message: `Too many files. Maximum ${CRAFTMAKER_CONFIG.MAX_FILES} files allowed.`,
                    error: 'TOO_MANY_FILES'
                });

            case 'LIMIT_UNEXPECTED_FILE':
                return res.status(400).json({
                    success: false,
                    message: 'Unexpected field name for file upload. Use "productImages".',
                    error: 'UNEXPECTED_FIELD'
                });

            default:
                return res.status(400).json({
                    success: false,
                    message: 'File upload error occurred.',
                    error: 'UPLOAD_ERROR'
                });
        }
    }

    // Handle custom file filter errors
    if (error.message.includes('Invalid file type') || error.message.includes('Invalid file extension')) {
        return res.status(400).json({
            success: false,
            message: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.',
            error: 'INVALID_FILE_TYPE'
        });
    }

    // Handle other upload-related errors
    if (error.message.includes('upload') || error.message.includes('file')) {
        return res.status(400).json({
            success: false,
            message: 'File upload failed. Please try again.',
            error: 'UPLOAD_FAILED'
        });
    }

    // Pass other errors to next middleware
    next(error);
};

// Utility function to clean up uploaded craftmaker files in case of errors
const cleanupCraftmakerUploadedFiles = (filePaths) => {
    try {
        if (filePaths && Array.isArray(filePaths)) {
            filePaths.forEach(filePath => {
                if (filePath && fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log('Cleaned up craftmaker uploaded file:', filePath);
                }
            });
        }
    } catch (error) {
        console.error('Error cleaning up craftmaker files:', error);
    }
};

// Middleware to validate craftmaker files after upload (additional security)
const validateCraftmakerUploadedFiles = (req, res, next) => {
    if (req.files && req.files.length > 0) {
        // Check total file count
        if (req.files.length > CRAFTMAKER_CONFIG.MAX_FILES) {
            const filePaths = req.files.map(file => file.path);
            cleanupCraftmakerUploadedFiles(filePaths);
            return res.status(400).json({
                success: false,
                message: `Too many files. Maximum ${CRAFTMAKER_CONFIG.MAX_FILES} files allowed.`,
                error: 'TOO_MANY_FILES'
            });
        }

        // Check individual file sizes
        for (let file of req.files) {
            if (file.size > CRAFTMAKER_CONFIG.MAX_FILE_SIZE) {
                const filePaths = req.files.map(f => f.path);
                cleanupCraftmakerUploadedFiles(filePaths);
                return res.status(400).json({
                    success: false,
                    message: 'One or more files are too large.',
                    error: 'FILE_TOO_LARGE'
                });
            }
        }
    }

    next();
};

module.exports = {
    uploadCraftmakerProductImages,
    handleCraftmakerUploadError,
    validateCraftmakerUploadedFiles,
    cleanupCraftmakerUploadedFiles,
    CRAFTMAKER_CONFIG
};