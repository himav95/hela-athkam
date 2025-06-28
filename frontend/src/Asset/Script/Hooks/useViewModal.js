// useViewModal.js - Custom hook for ViewModal operations in order management.
import { useState, useCallback } from 'react';
import orderService from './orderService';

export const useViewModal = (currentUser = null, onDataChange = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Clear error after a few seconds
  const clearError = useCallback(() => {
    if (error) {
      setTimeout(() => setError(null), 5000);
    }
  }, [error]);

  // Handle save order changes
  const handleSave = useCallback(async (orderId, updatedData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await orderService.updateOrder(orderId, updatedData);

      // Call the onDataChange callback to refresh parent component data
      if (onDataChange) {
        onDataChange();
      }

      return true;
    } catch (err) {
      setError(`Failed to save changes: ${err.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [onDataChange]);

  // Handle approve order
  const handleApprove = useCallback(async (orderId) => {
    setIsLoading(true);
    setError(null);

    try {
      const approvedBy = currentUser?.name || currentUser?.email || 'Admin';
      await orderService.approveOrder(orderId, approvedBy);

      if (onDataChange) {
        onDataChange();
      }

      return true;
    } catch (err) {
      setError(`Failed to approve order: ${err.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, onDataChange]);

  // Handle reject order
  const handleReject = useCallback(async (orderId) => {
    setIsLoading(true);
    setError(null);

    try {
      const rejectedBy = currentUser?.name || currentUser?.email || 'Admin';
      await orderService.rejectOrder(orderId, rejectedBy);

      if (onDataChange) {
        onDataChange();
      }

      return true;
    } catch (err) {
      setError(`Failed to reject order: ${err.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, onDataChange]);

  // Handle delete order
  const handleDelete = useCallback(async (orderId) => {
    setIsLoading(true);
    setError(null);

    try {
      await orderService.deleteOrder(orderId);

      if (onDataChange) {
        onDataChange();
      }

      return true;
    } catch (err) {
      setError(`Failed to delete order: ${err.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [onDataChange]);

  // Fetch single order data
  const fetchOrder = useCallback(async (orderId) => {
    setIsLoading(true);
    setError(null);

    try {
      const orderData = await orderService.getOrderById(orderId);
      return orderData;
    } catch (err) {
      setError(`Failed to fetch order: ${err.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    clearError,
    handleSave,
    handleApprove,
    handleReject,
    handleDelete,
    fetchOrder
  };
};