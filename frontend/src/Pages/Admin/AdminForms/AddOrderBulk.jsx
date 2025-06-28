import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Alert, Table } from 'react-bootstrap';

const AddOrderBulk = ({ users, products, onSubmit }) => {
  const [formData, setFormData] = useState({
    user_id: '',
    delivery_date: '',
    delivery_type: 'delivery',
    order_status: 'draft',
    order_type: 'bulk',
    advance_payment: 0,
    comments: '',
    items: []
  });
  const [currentItem, setCurrentItem] = useState({
    product_id: '',
    quantity: 1
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (formData.items.length > 0) {
      const totalAmount = formData.items.reduce((sum, item) => {
        const product = products.find(p => p.product_id === item.product_id);
        return sum + (product.price * item.quantity);
      }, 0);

      setFormData(prev => ({
        ...prev,
        total_amount: totalAmount,
        remaining_payment: totalAmount - (prev.advance_payment || 0)
      }));
    }
  }, [formData.items, formData.advance_payment, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addItem = () => {
    if (!currentItem.product_id) return;

    const product = products.find(p => p.product_id === parseInt(currentItem.product_id));
    if (!product) return;

    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        product_id: currentItem.product_id,
        product_name: product.product_name,
        quantity: parseInt(currentItem.quantity),
        unit_price: product.price
      }]
    }));

    setCurrentItem({
      product_id: '',
      quantity: 1
    });
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      setSuccess(true);
      setFormData({
        user_id: '',
        delivery_date: '',
        delivery_type: 'delivery',
        order_status: 'draft',
        order_type: 'bulk',
        advance_payment: 0,
        comments: '',
        items: []
      });
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.user_id) errors.user_id = 'Customer is required';
    if (!formData.delivery_date) errors.delivery_date = 'Delivery date is required';
    if (formData.items.length === 0) errors.items = 'At least one product is required';
    return errors;
  };

  return (
    <Card>
      <Card.Header>
        <h5>Add Bulk Order</h5>
      </Card.Header>
      <Card.Body>
        {success && <Alert variant="success">Order created successfully!</Alert>}
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
          </Row>

          <Row>
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
          </Row>

          <h6 className="mt-4">Order Items</h6>
          {errors.items && <Alert variant="danger">{errors.items}</Alert>}
          <Row className="mb-3">
            <Col md={8}>
              <Form.Group>
                <Form.Label>Product</Form.Label>
                <Form.Control
                  as="select"
                  name="product_id"
                  value={currentItem.product_id}
                  onChange={handleItemChange}
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product.product_id} value={product.product_id}>
                      {product.product_name} (₹{product.price})
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  name="quantity"
                  value={currentItem.quantity}
                  onChange={handleItemChange}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button variant="outline-primary" onClick={addItem}>
                Add Item
              </Button>
            </Col>
          </Row>

          {formData.items.length > 0 && (
            <Table striped bordered hover className="mb-4">
              <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              {formData.items.map((item, index) => {
                const product = products.find(p => p.product_id === item.product_id);
                return (
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>₹{item.unit_price}</td>
                    <td>{item.quantity}</td>
                    <td>₹{(item.unit_price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
              <tr className="fw-bold">
                <td colSpan="3">Total Amount</td>
                <td>₹{formData.total_amount?.toFixed(2) || '0.00'}</td>
                <td></td>
              </tr>
              </tbody>
            </Table>
          )}

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
                  type="number"
                  name="remaining_payment"
                  value={formData.remaining_payment?.toFixed(2) || '0.00'}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Bulk Order
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddOrderBulk;