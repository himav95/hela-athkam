// User management controller
// Handles CRUD operations for user management in admin dashboard are here.

const User = require('../Models/UserModel');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

// GET /api/admin/users - Get all users with pagination and search
const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', role } = req.query;
        console.log('👥 Fetching users with params:', { page, limit, search, role });

        // Build where clause for search
        let whereClause = {};

        // Filter by role if provided
        if (role && role !== '') {
            whereClause.role = role;
        }

        // Add search functionality at database level for better performance
        if (search && search.trim() !== '') {
            const searchTerm = search.trim();
            whereClause[Op.or] = [
                { name: { [Op.iLike]: `%${searchTerm}%` } },
                { email: { [Op.iLike]: `%${searchTerm}%` } },
                { phone: { [Op.iLike]: `%${searchTerm}%` } },
                { role: { [Op.iLike]: `%${searchTerm}%` } }
            ];
        }

        // Calculate pagination but check the usePagination later.
        const offset = (page - 1) * limit;

        const { count, rows: users } = await User.findAndCountAll({
            where: whereClause,
            attributes: [
                'id', 'name', 'email', 'phone', 'address', 'role',
                'created_at', 'updated_at'
                // Explicitly exclude password for security
            ],
            order: [['created_at', 'DESC']],
            limit: parseInt(limit),
            offset: offset
        });

        console.log(`✅ Found ${count} users, returning ${users.length} for page ${page}`);

        // Format the response data
        const formattedUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone || 'N/A',
            address: user.address || 'N/A',
            role: user.role || 'user',
            created_at: user.created_at,
            updated_at: user.updated_at
        }));

        res.json({
            success: true,
            users: formattedUsers,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                totalUsers: count,
                hasNextPage: offset + users.length < count,
                hasPrevPage: page > 1
            }
        });

    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching users',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// GET /api/admin/users/:id - Get single user details
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching user with ID: ${id}`);

        const user = await User.findByPk(id, {
            attributes: [
                'id', 'name', 'email', 'phone', 'address', 'role',
                'created_at', 'updated_at'
                // Exclude password from response for security
            ]
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        console.log('User fetched successfully');

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone || 'N/A',
                address: user.address || 'N/A',
                role: user.role || 'user',
                created_at: user.created_at,
                updated_at: user.updated_at
            }
        });

    } catch (error) {
        console.error('Get user by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// POST /api/admin/users - Create new user
const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, address, role = 'user' } = req.body;
        console.log('Creating new user:', { name, email, role });

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and password are required'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create user - password will be auto-hashed by the model setter
        const newUser = await User.create({
            name,
            email,
            password, // This will be auto-hashed by the UserModel setter
            phone: phone || null,
            address: address || null,
            role
        });

        console.log('User created successfully with ID:', newUser.id);

        // Return user without password
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                address: newUser.address,
                role: newUser.role,
                created_at: newUser.created_at
            }
        });

    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating user',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// PUT /api/admin/users/:id - Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, phone, address, role } = req.body;
        console.log(`Updating user ${id}:`, { name, email, role });

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if email is being changed and if it's already taken
        if (email && email !== user.email) {
            const existingUser = await User.findOne({
                where: {
                    email,
                    id: { [Op.ne]: id } // Exclude current user
                }
            });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is already taken by another user'
                });
            }
        }

        // Prepare update data
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone !== undefined) updateData.phone = phone;
        if (address !== undefined) updateData.address = address;
        if (role) updateData.role = role;

        // Only update password if provided - it will be auto-hashed by model setter
        if (password && password.trim() !== '') {
            updateData.password = password;
        }

        await user.update(updateData);

        console.log('User updated successfully');

        // Return updated user without password
        const updatedUser = await User.findByPk(id, {
            attributes: ['id', 'name', 'email', 'phone', 'address', 'role', 'updated_at']
        });

        res.json({
            success: true,
            message: 'User updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating user',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// DELETE /api/admin/users/:id - Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Deleting user ${id}`);

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Optional: Check if user has orders before deletion
        // const orderCount = await Order.count({ where: { user_id: id } });
        // if (orderCount > 0) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Cannot delete user with existing orders'
        //     });
        // }

        await user.destroy();
        console.log(`User ${id} deleted successfully`);

        res.json({
            success: true,
            message: 'User deleted successfully'
        });

    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting user',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};