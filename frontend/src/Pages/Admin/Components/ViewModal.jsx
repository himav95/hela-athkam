import { Modal, Row, Col, ToggleButtonGroup, ToggleButton, Badge, Image, Spinner } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import adminOrderService from '../../../Services/adminOrderService';

function ViewModal({ show, onHide, order, onStatusUpdate }) {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Load order data when modal opens
  useEffect(() => {
    if (show && order) {
      setOrderData(order);
      setApprovalStatus(order.order_status);
      setLoading(false);
    }
  }, [show, order]);

  const handleApprovalChange = async (newStatus) => {
    try {
      setUpdating(true);

      // Use adminOrderService to update status
      const action = newStatus === 'pending' ? 'approve' :
        newStatus === 'completed' ? 'approve' : 'reject';

      await adminOrderService.updateOrder(orderData.order_id, action);

      setApprovalStatus(newStatus);
      setOrderData(prev => ({
        ...prev,
        order_status: newStatus,
        manager_approved: newStatus === 'pending' || newStatus === 'completed'
      }));

      // Notify parent component about the update
      if (onStatusUpdate) {
        onStatusUpdate(orderData.order_id, newStatus);
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'draft': return 'secondary';
      case 'pending': return 'warning';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleClose = () => {
    setOrderData(null);
    setError('');
    setApprovalStatus(null);
    onHide();
  };

  // Determine order type - from order_type field
  const getOrderType = (order) => {
    // If order_type exists, use it
    if (order.order_type) {
      return order.order_type;
    }

    // Since OrderBulk only shows bulk orders,
    return 'bulk';
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size='xl'
      backdrop='static'
      centered
    >
      <Modal.Header id='ViewModalHeader' closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>

      <Modal.Body id='ViewModalBody'>
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-2">Loading order details...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : orderData ? (
          <Card>
            <Card.Body>
              {/* Header Row - Order ID, Type and Status */}
              <Row className='mb-4 align-items-center'>
                <Col md={4}>
                  <h5 className="mb-0">
                    Order ID: <span className="text-primary">#{orderData.order_id}</span>
                  </h5>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">Type:</span>
                    <Badge bg="info" className="fs-6">
                      {getOrderType(orderData).toUpperCase()}
                    </Badge>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center justify-content-end">
                    <span className="me-2">Status:</span>
                    <Badge bg={getStatusVariant(orderData.order_status)} className="fs-6">
                      {orderData.order_status?.toUpperCase()}
                    </Badge>
                  </div>
                </Col>
              </Row>

              <hr />

              {/* Customer Information */}
              <Row className='mb-4'>
                <Col md={12}>
                  <h6 className="text-muted mb-3">Customer Information</h6>
                </Col>
                <Col md={4}>
                  <div className="mb-2">
                    <strong>Customer Name:</strong>
                    <p className="mb-1">{orderData.customer_name}</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="mb-2">
                    <strong>Email:</strong>
                    <p className="mb-1">{orderData.customer_email}</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="mb-2">
                    <strong>Phone:</strong>
                    <p className="mb-1">{orderData.customer_phone}</p>
                  </div>
                </Col>
              </Row>

              <hr />

              {/* Product & Order Details - 3 Column Layout */}
              <Row className='mb-4'>
                <Col md={4}>
                  <h6 className="text-muted mb-3">Product Information</h6>
                  <div className="mb-2">
                    <strong>Product Name:</strong>
                    <p className="mb-1">{orderData.product_name}</p>
                  </div>
                  {orderData.product_display && (
                    <div className="mb-2">
                      <strong>Product Display:</strong>
                      <p className="mb-1">{orderData.product_display}</p>
                    </div>
                  )}
                  <div className="mb-2">
                    <strong>Product ID:</strong>
                    <p className="mb-1">{orderData.product_id}</p>
                  </div>
                  <div className="mb-2">
                    <strong>Quantity:</strong>
                    <p className="mb-1">{orderData.quantity} units</p>
                  </div>
                </Col>

                <Col md={4}>
                  <h6 className="text-muted mb-3">Pricing Details</h6>
                  <div className="mb-2">
                    <strong>Unit Price:</strong>
                    <p className="mb-1">{formatCurrency(orderData.unit_price)}</p>
                  </div>
                  <div className="mb-2">
                    <strong>Total Amount:</strong>
                    <p className="mb-1 text-success fw-bold">{formatCurrency(orderData.total_amount)}</p>
                  </div>
                  <div className="mb-2">
                    <strong>Advance Payment:</strong>
                    <p className="mb-1">{formatCurrency(orderData.advance_payment)}</p>
                  </div>
                  {orderData.remaining_payment && (
                    <div className="mb-2">
                      <strong>Remaining Payment:</strong>
                      <p className="mb-1">{formatCurrency(orderData.remaining_payment)}</p>
                    </div>
                  )}
                  <div className="mb-2">
                    <strong>Fully Paid:</strong>
                    <p className="mb-1">
                      <Badge bg={orderData.is_fully_paid ? 'success' : 'warning'}>
                        {orderData.is_fully_paid ? 'Yes' : 'No'}
                      </Badge>
                    </p>
                  </div>
                </Col>

                <Col md={4}>
                  <h6 className="text-muted mb-3">Delivery Information</h6>
                  <div className="mb-2">
                    <strong>Delivery Date:</strong>
                    <p className="mb-1">{formatDate(orderData.delivery_date)}</p>
                  </div>
                  <div className="mb-2">
                    <strong>Delivery Type:</strong>
                    <p className="mb-1">
                      <Badge bg="outline-primary">
                        {orderData.delivery_type?.toUpperCase()}
                      </Badge>
                    </p>
                  </div>
                  <div className="mb-2">
                    <strong>Order Created:</strong>
                    <p className="mb-1">{formatDate(orderData.created_at)}</p>
                  </div>
                </Col>
              </Row>

              {/* Comments */}
              {orderData.comments && (
                <Row className='mb-4'>
                  <Col>
                    <h6 className="text-muted mb-2">Comments</h6>
                    <div className="bg-light p-3 rounded">
                      {orderData.comments}
                    </div>
                  </Col>
                </Row>
              )}

              <hr />

              {/* Admin Actions - Order Status Update */}
              <Row className='mb-3'>
                <Col md={6}>
                  <h6 className="text-muted mb-3">Update Order Status</h6>
                </Col>
                <Col md={6}>
                  <ToggleButtonGroup
                    type='radio'
                    name='approval'
                    value={approvalStatus}
                    onChange={handleApprovalChange}
                    className="w-100"
                  >
                    <ToggleButton
                      id='pending'
                      value='pending'
                      variant={approvalStatus === 'pending' ? 'warning' : 'outline-warning'}
                      disabled={updating}
                    >
                      {updating && approvalStatus === 'pending' ? (
                        <Spinner size="sm" className="me-1" />
                      ) : null}
                      Pending
                    </ToggleButton>

                    <ToggleButton
                      id='completed'
                      value='completed'
                      variant={approvalStatus === 'completed' ? 'success' : 'outline-success'}
                      disabled={updating}
                    >
                      {updating && approvalStatus === 'completed' ? (
                        <Spinner size="sm" className="me-1" />
                      ) : null}
                      Completed
                    </ToggleButton>

                    <ToggleButton
                      id='cancelled'
                      value='cancelled'
                      variant={approvalStatus === 'cancelled' ? 'danger' : 'outline-danger'}
                      disabled={updating}
                    >
                      {updating && approvalStatus === 'cancelled' ? (
                        <Spinner size="sm" className="me-1" />
                      ) : null}
                      Cancelled
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Col>
              </Row>

              {/* Manager Approval Info */}
              {orderData.manager_approved && (
                <Row className='mb-2'>
                  <Col>
                    <div className="bg-success bg-opacity-10 p-2 rounded border-start border-success border-3">
                      <small className="text-success">
                        <strong>Manager Approved:</strong> Yes
                      </small>
                    </div>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        ) : (
          <div className="text-center py-4">
            <p>No order data available</p>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={handleClose}
          disabled={updating}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewModal;