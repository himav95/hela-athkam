const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const PaymentRoutes = require('./PaymentRoutes');

dotenv.config();

const app = express();

// Enable CORS for all routes
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['https://localhost:3000', 'https://yourotherdomain.com'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());

// Mount the payment routes.
app.use('/api/payments', Payme);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




