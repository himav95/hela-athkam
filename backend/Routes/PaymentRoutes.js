const express = require('express');
const router = express.router();
const PaymentController = require('../PaymentController');


router.post('/initiate-payment', PaymentController.initiatePayment);


module.exports = router;