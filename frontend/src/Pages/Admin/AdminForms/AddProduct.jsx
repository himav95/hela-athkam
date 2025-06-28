import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';

const AddProduct = ({ craftsmen, onSubmit }) => {
  const [formData, setFormData] = useState({
    product_name: '',
    category: '',
    image: '',
    craftsman_id: '',
    price: '',
    stock: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      setSuccess(true);
      setFormData({
        product_name: '',
        category: '',
        image: '',
        craftsman_id: '',
        price: '',
        stock: '',
        description: ''
      });
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.product_name) errors.product_name = 'Product name is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.craftsman_id) errors.craftsman_id = 'Craftsman is required';
    if (!formData.price || isNaN(formData.price)) errors.price = 'Valid price is required';
    if (formData.stock && isNaN(formData.stock)) errors.stock = 'Stock must be a number';
    return errors;
  };

  return (
    <Card>
      <Card.Header>
        <h5>Add New Product</h5>
      </Card.Header>
      <Card.Body>
        {success && <Alert variant="success">Product added successfully!</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
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
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category *</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                >
                  <option value="">Select Category</option>
                  <option value="furniture">Furniture</option>
                  <option value="decor">Decor</option>
                  <option value="textiles">Textiles</option>
                  <option value="pottery">Pottery</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
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
                <Form.Label>Price (₹) *</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  isInvalid={!!errors.stock}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.stock}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddProduct;