// Services/adminOrderService.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AdminOrderService {
  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Order methods are here.

  // Get orders by type (bulk or custom) - FIXED TO MATCH BACKEND ROUTES
  async getOrdersByType(orderType, filters = {}) {
    try {
      // Remove order_type from filters since it's now in the URL path
      const { order_type, ...otherFilters } = filters;

      const queryParams = new URLSearchParams(otherFilters);

      // Use the correct endpoint paths that match your AdminController
      const endpoint = orderType === 'bulk'
        ? `${API_BASE_URL}/admin/orders/bulk?${queryParams.toString()}`
        : `${API_BASE_URL}/admin/orders/custom?${queryParams.toString()}`;

      console.log('Making API call to:', endpoint); // Debug log

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Debug log
      return data;
    } catch (error) {
      console.error(`Error fetching ${orderType} orders:`, error);
      throw error;
    }
  }

  // Update order status (approve/reject/status change)
  async updateOrder(orderId, action, data = {}) {
    try {
      const endpoint = action === 'status'
        ? `${API_BASE_URL}/admin/orders/${orderId}/status`
        : `${API_BASE_URL}/admin/orders/${orderId}/${action}`;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error ${action} order:`, error);
      throw error;
    }
  }

  // Delete order
  async deleteOrder(orderId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/orders/${orderId}`,
        {
          method: 'DELETE',
          headers: this.getAuthHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }

  // Get order details for view modal
  async getOrderDetails(orderId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/orders/${orderId}`,
        {
          method: 'GET',
          headers: this.getAuthHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  }

  // Get dashboard statistics
  async getDashboardStats() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/dashboard/stats`,
        {
          method: 'GET',
          headers: this.getAuthHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  // product methods are here.

  // Get all products with filters
  async getProducts(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters);
      // Using existing route first, then fallback to new route
      const endpoint = `${API_BASE_URL}/admin/get-products?${queryParams.toString()}`;

      console.log('Making API call to:', endpoint);

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Products API Response:', data);

      // Handling current response structure
      // check ViewProductController. adjust here if needed,
      return {
        success: true,
        products: Array.isArray(data) ? data : (data.products || data.data || [])
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Add new product
  async addProduct(productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/add-product`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  // Update product
  async updateProduct(productId, productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/update-product/${productId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Delete product
  async deleteProduct(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/delete-product/${productId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // User methods are here.

  // Get all users with filters
  async getUsers(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters);
      const endpoint = `${API_BASE_URL}/admin/users?${queryParams.toString()}`;

      console.log('Making API call to:', endpoint);

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Users API Response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Add new user.
  async addUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/add-user`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  // Update user here.
  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete user.
  async deleteUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Get user details.
  async getUserDetails(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  }
}

const adminOrderService = new AdminOrderService();
export default adminOrderService;