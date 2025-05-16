const Express = require('express');
const loginAuth  = require('../Controllers/AuthController');
const welcome = Express.Router();

welcome.get('/', function (req, res) {
    res.json({
        message: 'Welcome to Peoples Bakers',
    });
}
);

// login authentication
welcome.post('/login', loginAuth);

module.exports = welcome;
