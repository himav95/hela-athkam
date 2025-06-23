// Add this function to your existing OrderController.js file

const User = require('../Models/UserModel'); // Add this import at the top with other imports

// GET /api/orders/bulk - Get bulk orders with user and product details
const getBulkOrders = async (req, res) => {
    try {
        const userRole = req.user.role;
        const { page = 1, limit = 10, search = '', status } = req.query;

        // Only admin can access bulk orders
        if (userRole !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Only admins can view bulk orders.'
            });
        }

        // Build where clause for orders
        let whereClause = {
            order_type: 'bulk'
        };

        // Filter by status if provided
        if (status && status !== '') {
            whereClause.order_status = status;
        }

        // Calculate pagination
        const offset = (page - 1) * limit;

        const { count, rows: orders } = await Order.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'user', // We'll need to set up this association
                    attributes: ['name', 'email', 'phone'],
                    required: true
                },
                {
                    model: Product,
                    as: 'product', // We'll need to set up this association
                    attributes: ['product_name', 'price'],
                    required: false // Left join since some orders might not have product_id
                }
            ],
            attributes: [
                'order_id', 'product_id', 'product_name', 'quantity',
                'unit_price', 'total_amount', 'delivery_date', 'delivery_type',
                'order_status', 'advance_payment', 'remaining_payment',
                'is_fully_paid', 'manager_approved', 'created_at', 'comments'
            ],
            order: [['created_at', 'DESC']],
            limit: parseInt(limit),
            offset: offset
        });

        // Filter by search term if provided (after getting results)
        let filteredOrders = orders;
        if (search && search.trim() !== '') {
            const searchTerm = search.toLowerCase();
            filteredOrders = orders.filter(order =>
                order.user.name.toLowerCase().includes(searchTerm) ||
                order.user.email.toLowerCase().includes(searchTerm) ||
                order.product_name.toLowerCase().includes(searchTerm) ||
                order.order_id.toString().includes(searchTerm)
            );
        }

        // Format the response data
        const formattedOrders = filteredOrders.map(order => ({
            order_id: order.order_id,
            customer_name: order.user.name,
            customer_email: order.user.email,
            customer_phone: order.user.phone || 'N/A',
            product_display: order.product_id ?
                `${order.product_name} (ID: ${order.product_id})` :
                order.product_name,
            product_id: order.product_id,
            product_name: order.product_name,
            quantity: order.quantity,
            unit_price: order.unit_price,
            total_amount: order.total_amount,
            delivery_date: order.delivery_date,
            delivery_type: order.delivery_type,
            order_status: order.order_status,
            advance_payment: order.advance_payment,
            remaining_payment: order.remaining_payment,
            is_fully_paid: order.is_fully_paid,
            manager_approved: order.manager_approved,
            comments: order.comments,
            created_at: order.created_at
        }));

        res.json({
            success: true,
            orders: formattedOrders,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                totalOrders: count,
                hasNextPage: offset + orders.length < count,
                hasPrevPage: page > 1
            }
        });

    } catch (error) {
        console.error('Get bulk orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching bulk orders',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Add this to your exports at the bottom of the file
module.exports = {
    createBulkOrder,
    createCustomOrder,
    getOrders,
    getOrderById,
    getBulkOrders, // Add this new function
    updateOrderStatus,
    bulkOrderValidationRules,
    customOrderValidationRules
};