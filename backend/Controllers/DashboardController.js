// Dashboard Controller for weekly metrics and modal data in admin dashboard is here.
// Handles fetching current week's data for dashboard cards

const Order = require('../Models/OrderModel');
const User = require('../Models/UserModel');
const Product = require('../Models/ProductModel');
const CraftmakerRequest = require('../Models/RequestModel');
const Message = require('../Models/MessageModel');
const { Op } = require('sequelize');

// Helper function to get current week date range
const getCurrentWeekRange = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Calculate start of week (Monday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    startOfWeek.setHours(0, 0, 0, 0);

    // Calculate end of week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek };
};

// GET /api/dashboard/weekly-counts - Get weekly counts for dashboard cards
const getWeeklyCounts = async (req, res) => {
    try {
        console.log('Fetching weekly dashboard counts');

        const { startOfWeek, endOfWeek } = getCurrentWeekRange();
        console.log('Week range:', { startOfWeek, endOfWeek });

        // Get weekly counts for each metric
        const [
            bulkOrdersCount,
            customOrdersCount,
            deliveriesCount,
            makerRequestsCount,
            messagesCount,
            // Previous week counts for comparison
            prevBulkOrdersCount,
            prevCustomOrdersCount,
            prevDeliveriesCount,
            prevMakerRequestsCount,
            prevMessagesCount
        ] = await Promise.all([
            // Current week counts
            Order.count({
                where: {
                    order_type: 'bulk',
                    created_at: {
                        [Op.between]: [startOfWeek, endOfWeek]
                    }
                }
            }),
            Order.count({
                where: {
                    order_type: { [Op.in]: ['custom', 'edition'] },
                    created_at: {
                        [Op.between]: [startOfWeek, endOfWeek]
                    }
                }
            }),
            Order.count({
                where: {
                    order_status: 'completed',
                    created_at: {
                        [Op.between]: [startOfWeek, endOfWeek]
                    }
                }
            }),
            CraftmakerRequest.count({
                where: {
                    request_date: {
                        [Op.between]: [startOfWeek, endOfWeek]
                    }
                }
            }),
            Message.count({
                where: {
                    created_at: {
                        [Op.between]: [startOfWeek, endOfWeek]
                    }
                }
            }),
            // Previous week counts for comparison
            Order.count({
                where: {
                    order_type: 'bulk',
                    created_at: {
                        [Op.between]: [
                            new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000),
                            new Date(endOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000)
                        ]
                    }
                }
            }),
            Order.count({
                where: {
                    order_type: { [Op.in]: ['custom', 'edition'] },
                    created_at: {
                        [Op.between]: [
                            new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000),
                            new Date(endOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000)
                        ]
                    }
                }
            }),
            Order.count({
                where: {
                    order_status: 'completed',
                    created_at: {
                        [Op.between]: [
                            new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000),
                            new Date(endOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000)
                        ]
                    }
                }
            }),
            CraftmakerRequest.count({
                where: {
                    request_date: {
                        [Op.between]: [
                            new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000),
                            new Date(endOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000)
                        ]
                    }
                }
            }),
            Message.count({
                where: {
                    created_at: {
                        [Op.between]: [
                            new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000),
                            new Date(endOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000)
                        ]
                    }
                }
            })
        ]);

        // Calculate changes from previous week
        const dashboardData = {
            bulkOrders: {
                count: bulkOrdersCount,
                change: bulkOrdersCount - prevBulkOrdersCount
            },
            customOrders: {
                count: customOrdersCount,
                change: customOrdersCount - prevCustomOrdersCount
            },
            deliveries: {
                count: deliveriesCount,
                change: deliveriesCount - prevDeliveriesCount
            },
            makerRequests: {
                count: makerRequestsCount,
                change: makerRequestsCount - prevMakerRequestsCount
            },
            messages: {
                count: messagesCount,
                change: messagesCount - prevMessagesCount
            }
        };

        console.log('Weekly counts fetched:', dashboardData);

        res.json({
            success: true,
            data: dashboardData,
            weekRange: {
                startOfWeek: startOfWeek.toISOString(),
                endOfWeek: endOfWeek.toISOString()
            }
        });

    } catch (error) {
        console.error('Get weekly counts error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching weekly counts',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET /api/dashboard/weekly-bulk-orders - Get weekly bulk orders for modal
const getWeeklyBulkOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { startOfWeek, endOfWeek } = getCurrentWeekRange();

        const offset = (page - 1) * limit;

        const { count, rows: orders } = await Order.findAndCountAll({
            where: {
                order_type: 'bulk',
                created_at: {
                    [Op.between]: [startOfWeek, endOfWeek]
                }
            },
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
                    required: false
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

        const formattedOrders = orders.map(order => ({
            order_id: order.order_id,
            customer_name: order.user.name,
            customer_email: order.user.email,
            customer_phone: order.user.phone || 'N/A',
            product_display: order.product_id ?
                `${order.product_name} (ID: ${order.product_id})` :
                order.product_name,
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
            },
            weekRange: {
                startOfWeek: startOfWeek.toISOString(),
                endOfWeek: endOfWeek.toISOString()
            }
        });

    } catch (error) {
        console.error('Get weekly bulk orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching weekly bulk orders',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET /api/dashboard/weekly-custom-orders - Get weekly custom orders for modal
const getWeeklyCustomOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { startOfWeek, endOfWeek } = getCurrentWeekRange();

        const offset = (page - 1) * limit;

        const { count, rows: orders } = await Order.findAndCountAll({
            where: {
                order_type: { [Op.in]: ['custom', 'edition'] },
                created_at: {
                    [Op.between]: [startOfWeek, endOfWeek]
                }
            },
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
                    required: false
                }
            ],
            attributes: [
                'order_id', 'product_id', 'product_name', 'quantity',
                'unit_price', 'total_amount', 'delivery_date', 'delivery_type',
                'order_status', 'advance_payment', 'remaining_payment',
                'is_fully_paid', 'manager_approved', 'created_at', 'comments', 'order_type'
            ],
            order: [['created_at', 'DESC']],
            limit: parseInt(limit),
            offset: offset
        });

        const formattedOrders = orders.map(order => ({
            order_id: order.order_id,
            customer_name: order.user.name,
            customer_email: order.user.email,
            customer_phone: order.user.phone || 'N/A',
            order_type: order.order_type,
            product_display: order.product_id ?
                `${order.product_name} (ID: ${order.product_id})` :
                order.product_name,
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
            },
            weekRange: {
                startOfWeek: startOfWeek.toISOString(),
                endOfWeek: endOfWeek.toISOString()
            }
        });

    } catch (error) {
        console.error('Get weekly custom orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching weekly custom orders',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET /api/dashboard/weekly-deliveries - Get weekly completed orders (deliveries) for modal
// const getWeeklyDeliveries = async (req, res) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         const { startOfWeek, endOfWeek } = getCurrentWeekRange();
//
//         const offset = (page - 1) * limit;
//
//         const { count, rows: orders } = await Order.findAndCountAll({
//             where: {
//                 order_status: 'completed',
//                 created_at: {
//                     [Op.between]: [startOfWeek, endOfWeek]
//                 }
//             },
//             include: [
//                 {
//                     model: User,
//                     as: 'user',
//                     attributes: ['id', 'name', 'email', 'phone'],
//                     required: true
//                 },
//                 {
//                     model: Product,
//                     as: 'product',
//                     attributes: ['product_id', 'product_name', 'price'],
//                     required: false
//                 }
//             ],
//             attributes: [
//                 'order_id', 'product_id', 'product_name', 'quantity',
//                 'unit_price', 'total_amount', 'delivery_date', 'delivery_type',
//                 'order_status', 'advance_payment', 'remaining_payment',
//                 'is_fully_paid', 'manager_approved', 'created_at', 'comments', 'order_type'
//             ],
//             order: [['created_at', 'DESC']],
//             limit: parseInt(limit),
//             offset: offset
//         });
//
//         const formattedOrders = orders.map(order => ({
//             order_id: order.order_id,
//             customer_name: order.user.name,
//             customer_email: order.user.email,
//             customer_phone: order.user.phone || 'N/A',
//             order_type: order.order_type,
//             product_display: order.product_id ?
//                 `${order.product_name} (ID: ${order.product_id})` :
//                 order.product_name,
//             quantity: order.quantity,
//             unit_price: order.unit_price,
//             total_amount: order.total_amount,
//             delivery_date: order.delivery_date,
//             delivery_type: order.delivery_type,
//             order_status: order.order_status,
//             advance_payment: order.advance_payment,
//             remaining_payment: order.remaining_payment,
//             is_fully_paid: order.is_fully_paid,
//             manager_approved: order.manager_approved,
//             created_at: order.created_at
//         }));
//
//         res.json({
//             success: true,
//             orders: formattedOrders,
//             pagination: {
//                 currentPage: parseInt(page),
//                 totalPages: Math.ceil(count / limit),
//                 totalOrders: count,
//                 hasNextPage: offset + orders.length < count,
//                 hasPrevPage: page > 1
//             },
//             weekRange: {
//                 startOfWeek: startOfWeek.toISOString(),
//                 endOfWeek: endOfWeek.toISOString()
//             }
//         });
//
//     } catch (error) {
//         console.error('Get weekly deliveries error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error while fetching weekly deliveries',
//             error: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// };

// GET /api/dashboard/weekly-maker-requests - Get weekly craftmaker requests for modal
const getWeeklyMakerRequests = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { startOfWeek, endOfWeek } = getCurrentWeekRange();

        const offset = (page - 1) * limit;

        const { count, rows: requests } = await CraftmakerRequest.findAndCountAll({
            where: {
                request_date: {
                    [Op.between]: [startOfWeek, endOfWeek]
                }
            },
            attributes: [
                'craftsman_id', 'name', 'nic', 'email', 'phone', 'address',
                'product_name', 'product_category', 'description',
                'request_status', 'request_date'
            ],
            order: [['request_date', 'DESC']],
            limit: parseInt(limit),
            offset: offset
        });

        const formattedRequests = requests.map(request => ({
            craftsman_id: request.craftsman_id,
            name: request.name,
            nic: request.nic,
            email: request.email || 'N/A',
            phone: request.phone,
            address: request.address,
            product_name: request.product_name,
            product_category: request.product_category,
            description: request.description || 'N/A',
            request_status: request.request_status,
            request_date: request.request_date
        }));

        res.json({
            success: true,
            requests: formattedRequests,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                totalRequests: count,
                hasNextPage: offset + requests.length < count,
                hasPrevPage: page > 1
            },
            weekRange: {
                startOfWeek: startOfWeek.toISOString(),
                endOfWeek: endOfWeek.toISOString()
            }
        });

    } catch (error) {
        console.error('Get weekly maker requests error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching weekly maker requests',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET /api/dashboard/weekly-messages - Get weekly messages for modal
const getWeeklyMessages = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { startOfWeek, endOfWeek } = getCurrentWeekRange();

        const offset = (page - 1) * limit;

        const { count, rows: messages } = await Message.findAndCountAll({
            where: {
                created_at: {
                    [Op.between]: [startOfWeek, endOfWeek]
                }
            },
            attributes: ['id', 'name', 'email', 'subject', 'message', 'created_at'],
            order: [['created_at', 'DESC']],
            limit: parseInt(limit),
            offset: offset
        });

        const formattedMessages = messages.map(message => ({
            id: message.id,
            name: message.name,
            email: message.email,
            subject: message.subject,
            message: message.message,
            created_at: message.created_at
        }));

        res.json({
            success: true,
            messages: formattedMessages,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                totalMessages: count,
                hasNextPage: offset + messages.length < count,
                hasPrevPage: page > 1
            },
            weekRange: {
                startOfWeek: startOfWeek.toISOString(),
                endOfWeek: endOfWeek.toISOString()
            }
        });

    } catch (error) {
        console.error('Get weekly messages error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching weekly messages',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    getWeeklyCounts,
    getWeeklyBulkOrders,
    getWeeklyCustomOrders,
    // getWeeklyDeliveries,
    getWeeklyMakerRequests,
    getWeeklyMessages
};