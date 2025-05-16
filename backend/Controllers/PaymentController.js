const PayHere = require("payhere-node");

// initializing PayHere with merchent credentials. (not included in)
const payhere = PayHere({
    merchant_id: 'include here',
    merchant_secret: 'include here',
    sandbox: true,
});

exports.initiatePayment = async (req, res) => {
    try {
        const { amount, /* include other data that necessary  */ } = req.body;

        // creating PayHere payment request.
        const paymentRequest = await payhere.payment.create({
            amount,
            currency: 'LKR',
            orderId: 'Your_order_ID',
            items: 'Item Details',
            returnUrl: 'https://website.com/payment-succcess', // URL for successful payment.
            cancelUrl: 'https://website.com/payment-cancel', // URL for cancel payment.

        });



        // sending the PayHere payment URL back to the frontend.
        res.json({ paymentUrl: paymentRequest.payment_url});

    } catch (error) {
        console.error('Error initiating payment:',);
        res.status(500).json({ error: 'Failed to initiate payment'});
    }
};