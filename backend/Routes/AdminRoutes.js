// admin routes for managing products, orders, and users are here.

const Express = require('express');
const AdminRoutes = Express.Router();
const addProduct = require('../Controllers/AddProductController');
const deleteProduct = require('../Controllers/DeleteProductController');
const updateProduct = require('../Controllers/UpdateProductController');
const getAllProducts = require('../Controllers/ViewProductController');
const updatePassword = require('../Controllers/UpdatePasswordController');
const addUser = require('../Controllers/AddUserController');
const viewMessageController = require('../Controllers/ViewMessageController');

// Import the AdminController for order management
const {
    getBulkOrders,
    getCustomOrders,
    approveOrder,
    rejectOrder,
    deleteOrder,
    updateOrderStatus,
    getCraftsmen,
    getDashboardStats
} = require('../Controllers/AdminController');

// Import the UserManagementController
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,

} = require('../Controllers/UserManagementController');

AdminRoutes.get('/', function (req, res) {
        res.json({
            message: 'Welcome to the admin page',
        });
    }
);

// admin action routes.
AdminRoutes.post('/add-product', addProduct);
AdminRoutes.get('/get-products', getAllProducts);
AdminRoutes.delete('/delete-product/:id', deleteProduct);
AdminRoutes.put('/update-product/:id', updateProduct);
AdminRoutes.put('/update-password/:email', updatePassword);
AdminRoutes.post('/add-user', addUser);
AdminRoutes.get('/get-messages', viewMessageController);

// order management routes.
AdminRoutes.get('/orders/bulk', getBulkOrders);
AdminRoutes.get('/orders/custom', getCustomOrders);
AdminRoutes.put('/orders/:id/approve', approveOrder);
AdminRoutes.put('/orders/:id/reject', rejectOrder);
AdminRoutes.delete('/orders/:id', deleteOrder);
AdminRoutes.put('/orders/:id/status', updateOrderStatus);
AdminRoutes.get('/craftsmen', getCraftsmen);
AdminRoutes.get('/dashboard/stats', getDashboardStats);

// user management routes.
AdminRoutes.get('/users', getUsers);
AdminRoutes.get('/users/:id', getUserById);
AdminRoutes.post('/users', createUser);
AdminRoutes.put('/users/:id', updateUser);
AdminRoutes.delete('/users/:id', deleteUser);


module.exports = AdminRoutes;