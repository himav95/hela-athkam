import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';

const AddOrderCustom = ({ users, craftsmen, onSubmit }) => {
  const [formData, setFormData] = useState({
    user_id: '',
    product_name: '',
    craftsman_id: '',
    quantity: 1,
    unit_price: '',
    total_amount: '',
    delivery_date: '',
    delivery_type: 'delivery',
    order_status: 'draft',
    order_type: 'custom',
    advance_payment: 0,
    remaining_payment: 0,
    image_sketch_url: '',
    comments: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate total amount when quantity or unit price changes
    if (name === 'quantity' || name === 'unit_price') {
      const quantity = name === 'quantity' ? parseInt(value) || 0 : parseInt(prev.quantity) || 0;
      const unitPrice = name === 'unit_price' ? parseFloat(value) || 0 : parseFloat(prev.unit_price) || 0;
      const total = quantity * unitPrice;
      const remaining = total - (parseFloat(prev.advance_payment) || 0);

      setFormData(prev => ({
        ...prev,
        total_amount: total,
        remaining_payment: remaining
      }));
    }

    // Update remaining payment when advance payment changes
    if (name === 'advance_payment') {
      const advance = parseFloat(value) || 0;
      const total = parseFloat(prev.total_amount) || 0;
      setFormData(prev => ({
        ...prev,
        remaining_payment: total - advance
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      setSuccess(true);
      setFormData({
        user_id: '',
        product_name: '',
        craftsman_id: '',
        quantity: 1,
        unit_price: '',
        total_amount: '',
        delivery_date: '',
        delivery_type: 'delivery',
        order_status: 'draft',
        order_type: 'custom',
        advance_payment: 0,
        remaining_payment: 0,
        image_sketch_url: '',
        comments: ''
      });
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.user_id) errors.user_id = 'Customer is required';
    if (!formData.product_name) errors.product_name = 'Product name is required';
    if (!formData.craftsman_id) errors.craftsman_id = 'Craftsman is required';
    if (!formData.quantity || isNaN(formData.quantity)) errors.quantity = 'Valid quantity is required';
    if (!formData.unit_price || isNaN(formData.unit_price)) errors.unit_price = 'Valid unit price is required';
    if (!formData.delivery_date) errors.delivery_date = 'Delivery date is required';
    return errors;
  };

  return (
    <Card>
      <Card.Header>
        <h5>Add Custom Order</h5>
      </Card.Header>
      <Card.Body>
        {success && <Alert variant="success">Custom order created successfully!</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Customer *</Form.Label>
                <Form.Control
                  as="select"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  isInvalid={!!errors.user_id}
                >
                  <option value="">Select Customer</option>
                  {users.map(user => (
                    <option key={user.user_id} value={user.user_id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.user_id}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  isInvalid={!!errors.product_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.product_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Craftsman *</Form.Label>
                <Form.Control
                  as="select"
                  name="craftsman_id"
                  value={formData.craftsman_id}
                  onChange={handleChange}
                  isInvalid={!!errors.craftsman_id}
                >
                  <option value="">Select Craftsman</option>
                  {craftsmen.map(craftsman => (
                    <option key={craftsman.id} value={craftsman.id}>
                      {craftsman.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.craftsman_id}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Quantity *</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  isInvalid={!!errors.quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Unit Price (₹) *</Form.Label>
                <Form.Control
                  type="number"
                  name="unit_price"
                  value={formData.unit_price}
                  onChange={handleChange}
                  isInvalid={!!errors.unit_price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.unit_price}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Delivery Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="delivery_date"
                  value={formData.delivery_date}
                  onChange={handleChange}
                  isInvalid={!!errors.delivery_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.delivery_date}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Delivery Type</Form.Label>
                <Form.Control
                  as="select"
                  name="delivery_type"
                  value={formData.delivery_type}
                  onChange={handleChange}
                >
                  <option value="delivery">Delivery</option>
                  <option value="pickup">Pickup</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Order Status</Form.Label>
                <Form.Control
                  as="select"
                  name="order_status"
                  value={formData.order_status}
                  onChange={handleChange}
                >
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Total Amount (₹)</Form.Label>
                <Form.Control
                  type="text"
                  name="total_amount"
                  value={formData.total_amount?.toFixed(2) || '0.00'}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Advance Payment (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="advance_payment"
                  value={formData.advance_payment}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Remaining Payment (₹)</Form.Label>
                <Form.Control
                  type="text"
                  name="remaining_payment"
                  value={formData.remaining_payment?.toFixed(2) || '0.00'}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Design Sketch URL</Form.Label>
            <Form.Control
              type="text"
              name="image_sketch_url"
              value={formData.image_sketch_url}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Custom Order
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddOrderCustom;