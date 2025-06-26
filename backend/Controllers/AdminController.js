// Admin panel order management controller
// Handles bulk and custom order operations for admin dashboard

const Order = require('../Models/OrderModel');
const User = require('../Models/UserModel');
const Product = require('../Models/ProductModel');
const { Op } = require('sequelize');

// GET /api/admin/orders/bulk - Get bulk orders with user and product details
const getBulkOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', status } = req.query;
        console.log('📊 Fetching bulk orders with params:', { page, limit, search, status });

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
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'phone'],
                    required: true
                },
                {
                    model: Product,
                    as: 'product',
                    attributes: ['product_id', 'product_name', 'price'],
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

        console.log(`Found ${count} bulk orders, returning ${orders.length} for page ${page}`);

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

// GET /api/admin/orders/custom - Get custom and edition orders
const getCustomOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', status } = req.query;
        console.log('Fetching custom orders with params:', { page, limit, search, status });

        // Include both 'custom' and 'edition' order types
        let whereClause = {
            order_type: {
                [Op.in]: ['custom', 'edition'] // Gets both custom and edition orders
            }
        };

        if (status && status !== '') {
            whereClause.order_status = status;
        }

        const offset = (page - 1) * limit;

        const { count, rows: orders } = await Order.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'phone'],
                    required: true
                },
                {
                    model: Product,
                    as: 'product',
                    attributes: ['product_id', 'product_name', 'price'],
                    required: false // Left join since some orders might not have product_id
                }
            ],
            attributes: [
                'order_id', 'product_id', 'product_name', 'quantity',
                'unit_price', 'total_amount', 'delivery_date', 'delivery_type',
                'order_status', 'advance_payment', 'remaining_payment',
                'is_fully_paid', 'manager_approved', 'created_at', 'comments',
                'order_type' // Include order type to differentiate custom vs edition
            ],
            order: [['created_at', 'DESC']],
            limit: parseInt(limit),
            offset: offset
        });

        console.log(`Found ${count} custom/edition orders, returning ${orders.length} for page ${page}`);

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
            order_type: order.order_type, // Include order type
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
        console.error('Get custom orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching custom orders',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};


// Order actions for admin management

// PUT /api/admin/orders/:id/approve - Approve an order
const approveOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const adminId = req.user.id;
        console.log(`Admin ${adminId} approving order ${id}`);

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        await order.update({
            manager_approved: true,
            manager_approved_by: adminId,
            manager_approved_at: new Date(),
            order_status: 'pending' // Change status to pending after approval
        });

        console.log(`Order ${id} approved successfully`);

        res.json({
            success: true,
            message: 'Order approved successfully'
        });

    } catch (error) {
        console.error('Approve order error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while approving order',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// PUT /api/admin/orders/:id/reject - Reject an order
const rejectOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const adminId = req.user.id;
        console.log(`Admin ${adminId} rejecting order ${id}`);

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        await order.update({
            manager_approved: false,
            manager_approved_by: adminId,
            manager_approved_at: new Date(),
            order_status: 'cancelled' // Change status to cancelled after rejection
        });

        console.log(`Order ${id} rejected successfully`);

        res.json({
            success: true,
            message: 'Order rejected successfully'
        });

    } catch (error) {
        console.error('Reject order error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while rejecting order',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// DELETE /api/admin/orders/:id - Delete an order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Deleting order ${id}`);

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        await order.destroy();
        console.log(`Order ${id} deleted successfully`);

        res.json({
            success: true,
            message: 'Order deleted successfully'
        });

    } catch (error) {
        console.error('Delete order error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting order',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// PUT /api/admin/orders/:id/status - Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['draft', 'pending', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid order status'
            });
        }

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        await order.update({ order_status: status });
        console.log(`Order ${id} status updated to ${status}`);

        res.json({
            success: true,
            message: 'Order status updated successfully'
        });

    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating order status',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};



// GET /api/admin/craftsmen - Get all craftsmen (placeholder)
const getCraftsmen = async (req, res) => {
    try {
        console.log('Fetching craftsmen data');
        // This would fetch from craftsmen table/model. aka craftmakers table.
        // For now, returning a placeholder response
        res.json({
            success: true,
            craftsmen: [],
            message: 'Craftsmen endpoint - to be implemented'
        });
    } catch (error) {
        console.error('Get craftsmen error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching craftsmen'
        });
    }
};



// GET /api/admin/dashboard/stats - Get dashboard statistics
const getDashboardStats = async (req, res) => {
    try {
        console.log('Fetching dashboard statistics');

        const totalOrders = await Order.count();
        const pendingOrders = await Order.count({ where: { order_status: 'pending' } });
        const completedOrders = await Order.count({ where: { order_status: 'completed' } });
        const bulkOrders = await Order.count({ where: { order_type: 'bulk' } });
        const customOrders = await Order.count({
            where: {
                order_type: {
                    [Op.in]: ['custom', 'edition']
                }
            }
        });

        const stats = {
            totalOrders,
            pendingOrders,
            completedOrders,
            bulkOrders,
            customOrders
        };

        console.log('Dashboard stats fetched:', stats);

        res.json({
            success: true,
            stats
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching dashboard statistics'
        });
    }
};

module.exports = {
    getBulkOrders,
    getCustomOrders,
    approveOrder,
    rejectOrder,
    deleteOrder,
    updateOrderStatus,
    getCraftsmen,
    getDashboardStats
};