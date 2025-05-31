// test-order-model.js (temporary file)
const Order = require('./Models/OrderModel');
const User = require('./Models/UserModel');

console.log('Order model loaded successfully!');
console.log('Order attributes:', Object.keys(Order.rawAttributes));