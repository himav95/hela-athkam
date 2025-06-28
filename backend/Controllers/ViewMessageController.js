// View Message Controller for admin dashboard
// Handles fetching and deleting contact form messages

const Message = require('../Models/MessageModel');
const { Op } = require('sequelize');

// GET /api/admin/get-messages - Get all messages with pagination and search
const getMessages = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        console.log('📧 Fetching messages with params:', { page, limit, search });

        // Build where clause for search
        let whereClause = {};

        if (search && search.trim() !== '') {
            const searchTerm = search.trim();
            whereClause = {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${searchTerm}%` } },
                    { email: { [Op.iLike]: `%${searchTerm}%` } }
                ]
            };
        }

        // Calculate pagination
        const offset = (page - 1) * limit;

        const { count, rows: messages } = await Message.findAndCountAll({
            where: whereClause,
            attributes: ['id', 'name', 'email', 'subject', 'message', 'created_at'],
            order: [['created_at', 'DESC']],
            limit: parseInt(limit),
            offset: offset
        });

        console.log(`Found ${count} messages, returning ${messages.length} for page ${page}`);

        // Format the response data
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
            }
        });

    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching messages',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// DELETE /api/admin/delete-message/:id - Delete a message
const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Deleting message ${id}`);

        const message = await Message.findByPk(id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        await message.destroy();
        console.log(`Message ${id} deleted successfully`);

        res.json({
            success: true,
            message: 'Message deleted successfully'
        });

    } catch (error) {
        console.error('Delete message error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting message',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    getMessages,
    deleteMessage
};