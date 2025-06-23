import { Row, Col, Card, Button, Form, Table, Pagination, Badge } from 'react-bootstrap';
import { PencilSquare, TrashFill, Check2Circle, XCircle, Eye, PlusLg } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
// uncomment this line after ViewModal updates are done.
// import ViewModal from '../Admin/Components/ViewModal';
import adminOrderService from "../../Services/adminOrderService";
import axios from 'axios';
import '../../Asset/Style/Helaathkam_Page.css';

function OrderBulk() {
  // should uncomment these lines if ViewModal is working. but check the viewmodal fields for bulk and custom. just in case.
  // const [isViewModalopen, setViewModalOpen] = useState(false);
  // const [selectedOrder, setSelectedOrder] = useState(null);

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // uncomment only  if ViewModal is working.
  // const openViewModal = (order) => {
  //   setSelectedOrder(order);
  //   setViewModalOpen(true);
  // };
  // const closeViewModal = () => {
  //   setViewModalOpen(false);
  //   setSelectedOrder(null);
  // };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await adminOrderService.getOrdersByType(
          'bulk',
          { page: 1, limit: 10 }
        );

        // check for success and orders
        if (response.success && response.orders) {
          setOrders(response.orders);
          setFilteredOrders(response.orders); // Initialize filtered orders
        } else {
          setOrders([]); // Fallback to empty array
          setFilteredOrders([]);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleApprove = async (orderId) => {
    try {
      await adminOrderService.updateOrder(orderId, 'approve');
      // Refresh orders after approval
      const response = await adminOrderService.getOrdersByType('bulk', { page: 1, limit: 10 });
      if (response.success && response.orders) {
        setOrders(response.orders);
        setFilteredOrders(response.orders); // Update filtered orders too
      }
    } catch (err) {
      console.error('Failed to approve order:', err);
    }
  };

  const handleReject = async (orderId) => {
    try {
      await adminOrderService.updateOrder(orderId, 'reject');
      // Refresh orders after rejection
      const response = await adminOrderService.getOrdersByType('bulk', { page: 1, limit: 10 });
      if (response.success && response.orders) {
        setOrders(response.orders);
        setFilteredOrders(response.orders); // Update filtered orders too
      }
    } catch (err) {
      console.error('Failed to reject order:', err);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await adminOrderService.deleteOrder(orderId);
      // Refresh orders after deletion
      const response = await adminOrderService.getOrdersByType('bulk', { page: 1, limit: 10 });
      if (response.success && response.orders) {
        setOrders(response.orders);
        setFilteredOrders(response.orders); // Update filtered orders too
      }
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      draft: 'secondary',
      pending: 'warning',
      completed: 'success',
      cancelled: 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  // Search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = orders.filter(order =>
      order.order_id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If search is empty, show all orders
    if (value === '') {
      setFilteredOrders(orders);
    }
  };

  const handleAddNewOrder = () => {
    // Add navigation logic here
    // For example: navigate('/admin/orders/new') or open the modal for this
    alert('Add New Order functionality - implement navigation here');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Card className='mt-4'>
        <Card.Header>
          <h5>Bulk Orders</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive striped>
            <thead>
            <tr>
              {/*try id customization here and custom like order forms.*/}
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {filteredOrders && filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.product_name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.total_amount}</td>
                  <td>{getStatusBadge(order.order_status)}</td>
                  <td>
                    <Button
                      variant='outline-success'
                      size='sm'
                      className='ms-1'
                      onClick={() => handleApprove(order.order_id)}
                    >
                      <Check2Circle />
                    </Button>
                    <Button
                      variant='outline-secondary'
                      size='sm'
                      className='ms-1'
                      onClick={() => handleReject(order.order_id)}
                    >
                      <XCircle />
                    </Button>
                    <Button
                      variant='outline-info'
                      size='sm'
                      className='ms-1'
                      // Keeping the working alert version for now ok.
                      onClick={() => alert('View details: ' + JSON.stringify(order, null, 2))}
                      // after ViewModal is fixed, replace above line with:
                      // onClick={() => openViewModal(order)}
                    >
                      <Eye />
                    </Button>
                    <Button variant='outline-warning' size='sm' className='ms-1'>
                      <PencilSquare />
                    </Button>
                    <Button
                      variant='outline-danger'
                      size='sm'
                      className='ms-1 me-1'
                      onClick={() => handleDelete(order.order_id)}
                    >
                      <TrashFill />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No orders found
                </td>
              </tr>
            )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Only uncomment this section when ViewModal is working properly */}
      {/*
      {isViewModalopen && selectedOrder && (
        <ViewModal
          show={isViewModalopen}
          onHide={closeViewModal}
          order={selectedOrder}
        />
      )}
      */}
    </>
  );
}

export default OrderBulk;