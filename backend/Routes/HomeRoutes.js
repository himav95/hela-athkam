const Express = require('express');
const HomeRoutes = Express.Router();
const getAllProducts = require("../Controllers/ViewProductController");
const addMessages = require('../Controllers/AddMessageController');

HomeRoutes.get('/get-products', getAllProducts);
HomeRoutes.post('/add-message', addMessages);

module.exports = HomeRoutes;