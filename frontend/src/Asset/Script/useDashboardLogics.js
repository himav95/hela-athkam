// Custom React Hook for Dashboard Logic is  here.
import { useState, useEffect } from 'react';

const useDashboardLogics = () => {
  const [dashboardData, setDashboardData] = useState({
    bulkOrders: { count: 0, change: 0 },
    customOrders: { count: 0, change: 0 },
    deliveries: { count: 0, change: 0 },
    makerRequests: { count: 0, change: 0 },
    messages: { count: 0, change: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get weekly dashboard counts
  const getWeeklyCounts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard/weekly-counts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weekly counts');
      }

      const result = await response.json();
      if (result.success) {
        setDashboardData(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching weekly counts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get weekly bulk orders for modal
  const getWeeklyBulkOrders = async (page = 1, limit = 10) => {
    try {
      const response = await fetch(`/api/dashboard/weekly-bulk-orders?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weekly bulk orders');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching weekly bulk orders:', error);
      throw error;
    }
  };

  // Get weekly custom orders for modal
  const getWeeklyCustomOrders = async (page = 1, limit = 10) => {
    try {
      const response = await fetch(`/api/dashboard/weekly-custom-orders?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weekly custom orders');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching weekly custom orders:', error);
      throw error;
    }
  };

  // Get weekly deliveries for modal
  const getWeeklyDeliveries = async (page = 1, limit = 10) => {
    try {
      const response = await fetch(`/api/dashboard/weekly-deliveries?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weekly deliveries');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching weekly deliveries:', error);
      throw error;
    }
  };

  // Get weekly maker requests for modal
  const getWeeklyMakerRequests = async (page = 1, limit = 10) => {
    try {
      const response = await fetch(`/api/dashboard/weekly-maker-requests?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weekly maker requests');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching weekly maker requests:', error);
      throw error;
    }
  };

  // Get weekly messages for modal
  const getWeeklyMessages = async (page = 1, limit = 10) => {
    try {
      const response = await fetch(`/api/dashboard/weekly-messages?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weekly messages');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching weekly messages:', error);
      throw error;
    }
  };

  // Fetch weekly counts on mount
  useEffect(() => {
    getWeeklyCounts();
  }, []);

  // Legacy function for backward compatibility
  const getDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  };

  return {
    dashboardData,
    loading,
    error,
    getWeeklyCounts,
    getWeeklyBulkOrders,
    getWeeklyCustomOrders,
    getWeeklyDeliveries,
    getWeeklyMakerRequests,
    getWeeklyMessages,
    getDashboardData // Keep for backward compatibility
  };
};

export default useDashboardLogics;