const Express = require('express');
const AdminRoutes = Express.Router();
const addProduct = require('../Controllers/AddProductController');
const deleteProduct = require('../Controllers/DeleteProductController');
const updateProduct = require('../Controllers/UpdateProductController');
const getAllProducts = require('../Controllers/ViewProductController');
const updatePassword = require('../Controllers/UpdatePasswordController');
const addUser = require('../Controllers/AddUserController');
const viewMessageController = require('../Controllers/ViewMessageController');

AdminRoutes.get('/', function (req, res) {
    res.json({
        message: 'Welcome to the admin page',
    });
}
);

AdminRoutes.post('/add-product', addProduct);
AdminRoutes.get('/get-products', getAllProducts);
AdminRoutes.delete('/delete-product/:id', deleteProduct);
AdminRoutes.put('/update-product/:id', updateProduct);
AdminRoutes.put('/update-password/:email', updatePassword);
AdminRoutes.post('/add-user', addUser);
AdminRoutes.get('/get-messages', viewMessageController);


module.exports = AdminRoutes;