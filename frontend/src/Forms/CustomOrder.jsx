import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

// import form validation js file here.
import { validateCustomOrder } from '../Asset/Script/formValidation';
// import utility functions
import { formatProductId, getProductDisplayText } from '../Asset/Script/Utils/productUtilsHelper';

// import Hela athkam: form css file here.
import '../Asset/Style/Helaathkam_Form.css';

function CustomOrder({ isCustomModalOpen, closeCustomModal }) {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    quantity: '',
    deliveryDate: '',
    imageSketch: null,
    comments: '',
    orderType: 'existing' // 'existing' or 'custom'
  });

  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products');
        console.log('Products fetched:', response.data); // Debug log
        setProducts(response.data.products || response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setAlert({
          show: true,
          type: 'danger',
          message: 'Failed to load products. Please try again.'
        });
      } finally {
        setLoading(false);
      }
    };

    if (isCustomModalOpen) {
      fetchProducts();
    }
  }, [isCustomModalOpen]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'imageSketch') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (name === 'orderType') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        productId: value === 'existing' ? prev.productId : '',
        productName: value === 'existing' ? prev.productName : '',
        imageSketch: value === 'custom' ? prev.imageSketch : null
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Clear alert
    if (alert.show) {
      setAlert({ show: false, type: '', message: '' });
    }
  };

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    const selectedProduct = products.find(p => p.product_id === parseInt(selectedProductId));

    setFormData(prev => ({
      ...prev,
      productId: selectedProductId,
      productName: selectedProduct ? selectedProduct.product_name : ''
    }));

    // Clear errors
    if (errors.productId) {
      setErrors(prev => ({ ...prev, productId: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateCustomOrder(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setSubmitLoading(true);

        // Create FormData for file upload
        const orderFormData = new FormData();
        orderFormData.append('orderType', formData.orderType);
        orderFormData.append('quantity', formData.quantity);
        orderFormData.append('deliveryDate', formData.deliveryDate);
        orderFormData.append('comments', formData.comments || '');

        if (formData.orderType === 'existing') {
          orderFormData.append('productId', formData.productId);
          orderFormData.append('productName', formData.productName);
        } else {
          orderFormData.append('productName', formData.productName || 'Custom Design');
          if (formData.imageSketch) {
            orderFormData.append('imageSketch', formData.imageSketch);
          }
        }

        const response = await axios.post('/api/orders/custom', orderFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Add authorization headers here if needed. later for login checks and what not.
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.status === 201) {
          setAlert({
            show: true,
            type: 'success',
            message: 'Custom order submitted successfully!'
          });

          // Reset form after short delay
          setTimeout(() => {
            handleClose();
          }, 2000);
        }

      } catch (error) {
        console.error('Error submitting custom order:', error);

        let errorMessage = 'Failed to submit order. Please try again.';
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        }

        setAlert({
          show: true,
          type: 'danger',
          message: errorMessage
        });
      } finally {
        setSubmitLoading(false);
      }
    }
  };

  const handleClose = () => {
    closeCustomModal();
    setErrors({});
    setAlert({ show: false, type: '', message: '' });
    setFormData({
      productId: '',
      productName: '',
      quantity: '',
      deliveryDate: '',
      imageSketch: null,
      comments: '',
      orderType: 'existing'
    });
  };

  return (
    <>
      {/* Custom order modal */}
      <Modal
        show={isCustomModalOpen}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        scrollable
        centered
      >
        <Modal.Header id="customOrderHeader" closeButton>
          <Modal.Title>
            <h3>Custom Order</h3>
          </Modal.Title>
        </Modal.Header>

        {/* Custom order content within modal body. */}
        <Modal.Body>
          {alert.show && (
            <Alert variant={alert.type} className="mb-3">
              {alert.message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <h6 className="text-muted">Order Type</h6>
            </Row>

            {/* Order Type Selection */}
            <Row className="mb-4">
              <Col>
                <Form.Check
                  type="radio"
                  name="orderType"
                  id="existingProduct"
                  value="existing"
                  label="Select from existing products"
                  checked={formData.orderType === 'existing'}
                  onChange={handleInputChange}
                  inline
                />
                <Form.Check
                  type="radio"
                  name="orderType"
                  id="customDesign"
                  value="custom"
                  label="Create custom design"
                  checked={formData.orderType === 'custom'}
                  onChange={handleInputChange}
                  inline
                />
              </Col>
            </Row>

            {formData.orderType === 'existing' ? (
              <>
                {/* Existing Product Selection */}
                <Row className="mb-3">
                  <h6 className="text-muted">Existing Product Details</h6>
                </Row>
                <Row className="mb-3">
                  <Col></Col>
                  <Col xs={8}>
                    <Form.Group controlId="productId">
                      <Form.Label className="customLabel">
                        Product <Form.Label className="required">*</Form.Label>
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        name="productId"
                        value={formData.productId}
                        onChange={handleProductChange}
                        isInvalid={!!errors.productId}
                        disabled={loading}
                      >
                        <option value="" disabled>
                          {loading ? 'Loading products...' : 'Select a product'}
                        </option>
                        {products.map((product) => (
                          <option key={product.product_id} value={product.product_id}>
                            {getProductDisplayText(product)}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.productId}
                      </Form.Control.Feedback>
                      {loading && (
                        <Form.Text className="text-muted">
                          <Spinner size="sm" /> Loading products...
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col></Col>
                </Row>
              </>
            ) : (
              <>
                {/* Custom Design Section */}
                <Row className="mb-3">
                  <h6 className="text-muted">Custom Design Details</h6>
                </Row>
                <Row className="mb-3">
                  <Col></Col>
                  <Col xs={8}>
                    <Form.Group controlId="productName">
                      <Form.Label className="customLabel">
                        Product Name <Form.Label className="required">*</Form.Label>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                        isInvalid={!!errors.productName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.productName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mb-3">
                  <Col></Col>
                  <Col xs={8}>
                    <Form.Group controlId="imageSketch">
                      <Form.Label className="customLabel">
                        Design Sketch/Image <Form.Label className="required">*</Form.Label>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        size="sm"
                        name="imageSketch"
                        onChange={handleInputChange}
                        accept="image/*"
                        isInvalid={!!errors.imageSketch}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.imageSketch}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Upload an image or sketch of your custom design
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col></Col>
                </Row>
              </>
            )}

            {/* Common Fields */}
            <Row className="mb-3">
              <h6 className="text-muted">Order Details</h6>
            </Row>
            <Row className="mb-3">
              <Col></Col>
              <Col xs={8}>
                <Form.Group controlId="quantity">
                  <Form.Label className="customLabel">
                    Quantity <Form.Label className="required">*</Form.Label>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    size="sm"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter quantity"
                    min="1"
                    isInvalid={!!errors.quantity}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.quantity}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
            <Row className="mb-3">
              <Col></Col>
              <Col xs={8}>
                <Form.Group controlId="deliveryDate">
                  <Form.Label className="customLabel">
                    Preferred Delivery Date <Form.Label className="required">*</Form.Label>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    size="sm"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    isInvalid={!!errors.deliveryDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.deliveryDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
            <Row className="mb-3">
              <Col></Col>
              <Col xs={8}>
                <Form.Group controlId="comments">
                  <Form.Label className="customLabel">Additional Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    size="sm"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    placeholder="Any special requirements or notes..."
                  />
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            id="customSubmitButton"
            type="submit"
            variant="primary"
            onClick={handleSubmit}
            disabled={submitLoading}
          >
            {submitLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>

          <Button id="customClearButton" variant="secondary" onClick={handleClose} disabled={submitLoading}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomOrder;