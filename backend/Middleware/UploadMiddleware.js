const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuration constants
const CONFIG = {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB to match frontend validation
    ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    MAX_FILES: 1
};

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/orders/sketches');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        try {
            // Create unique filename: timestamp-userId-originalname
            const userId = req.user ? req.user.id : 'anonymous';
            const timestamp = Date.now();
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext)
                .replace(/[^a-zA-Z0-9]/g, '_') // Replace special chars with underscore
                .substring(0, 50); // Limit name length

            const filename = `${timestamp}-${userId}-${name}${ext}`;
            cb(null, filename);
        } catch (error) {
            cb(error, null);
        }
    }
});

// File filter - only allow images
const fileFilter = (req, file, cb) => {
    // Check file type
    if (!CONFIG.ALLOWED_TYPES.includes(file.mimetype)) {
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

// Configure multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: CONFIG.MAX_FILE_SIZE,
        files: CONFIG.MAX_FILES
    }
});

// Middleware for single file upload (for custom orders)
const uploadSingleImage = upload.single('imageSketch');

// Enhanced error handling middleware for multer
const handleUploadError = (error, req, res, next) => {
    console.error('Upload error:', error);

    if (error instanceof multer.MulterError) {
        switch (error.code) {
            case 'LIMIT_FILE_SIZE':
                return res.status(400).json({
                    success: false,
                    message: `File too large. Maximum size is ${CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB.`,
                    error: 'FILE_TOO_LARGE'
                });

            case 'LIMIT_FILE_COUNT':
                return res.status(400).json({
                    success: false,
                    message: `Too many files. Only ${CONFIG.MAX_FILES} file allowed.`,
                    error: 'TOO_MANY_FILES'
                });

            case 'LIMIT_UNEXPECTED_FILE':
                return res.status(400).json({
                    success: false,
                    message: 'Unexpected field name for file upload.',
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

// Utility function to clean up uploaded files in case of errors
const cleanupUploadedFile = (filePath) => {
    try {
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log('Cleaned up uploaded file:', filePath);
        }
    } catch (error) {
        console.error('Error cleaning up file:', error);
    }
};

// Middleware to validate file after upload (additional security)
const validateUploadedFile = (req, res, next) => {
    if (req.file) {
        const filePath = req.file.path;
        const fileSize = req.file.size;

        // Double-check file size
        if (fileSize > CONFIG.MAX_FILE_SIZE) {
            cleanupUploadedFile(filePath);
            return res.status(400).json({
                success: false,
                message: 'File too large.',
                error: 'FILE_TOO_LARGE'
            });
        }

    }

    next();
};

module.exports = {
    uploadSingleImage,
    handleUploadError,
    validateUploadedFile,
    cleanupUploadedFile,
    CONFIG
};