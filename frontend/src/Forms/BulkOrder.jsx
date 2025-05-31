import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

// import form validation js file here.
import { validateBulkOrder } from '../Asset/Script/formValidation';
// import utility functions
import { formatProductId, getProductDisplayTextWithPrice } from '../Asset/Script/Utils/productUtilsHelper';

// import Hela athkam: form css file here.
import '../Asset/Style/Helaathkam_Form.css';

function BulkOrder({ isNormalModalOpen, closeNormalModal }) {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    quantity: '',
    deliveryDate: '',
    deliveryOption: '',
    comments: ''
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

    if (isNormalModalOpen) {
      fetchProducts();
    }
  }, [isNormalModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For product selection, update both id and name
    if (name === 'productId') {
      const selectedProduct = products.find(p => p.product_id === parseInt(value));
      setFormData(prev => ({
        ...prev,
        productId: value,
        productName: selectedProduct ? selectedProduct.product_name : ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateBulkOrder(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setSubmitLoading(true);

        const orderData = {
          productId: parseInt(formData.productId),
          quantity: parseInt(formData.quantity),
          deliveryDate: formData.deliveryDate,
          deliveryOption: formData.deliveryOption,
          comments: formData.comments || null
        };

        const response = await axios.post('/api/orders/bulk', orderData, {
          headers: {
            'Content-Type': 'application/json',
            // Add authorization headers here if needed, later for login checks
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.status === 201) {
          setAlert({
            show: true,
            type: 'success',
            message: 'Bulk order submitted successfully!'
          });

          // Reset form after short delay
          setTimeout(() => {
            handleClose();
          }, 2000);
        }

      } catch (error) {
        console.error('Error submitting bulk order:', error);

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
    closeNormalModal();
    setErrors({});
    setAlert({ show: false, type: '', message: '' });
    setFormData({
      productId: '',
      productName: '',
      quantity: '',
      deliveryDate: '',
      deliveryOption: '',
      comments: ''
    });
  };

  return (
    <>
      {/* Bulk/Normal order modal */}
      <Modal
        show={isNormalModalOpen}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        centered
        scrollable
      >
        <Modal.Header id="normalOrderHeader" closeButton>
          <Modal.Title>
            <h3>Bulk Order</h3>
          </Modal.Title>
        </Modal.Header>

        {/* Bulk/Normal order form content within modal body */}
        <Modal.Body id="normalOrderBody">
          {alert.show && (
            <Alert variant={alert.type} className="mb-3">
              {alert.message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <h6 className="text-muted">Order Details</h6>
              </Col>
            </Row>

            {/* Product Selection */}
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
                    onChange={handleInputChange}
                    isInvalid={!!errors.productId}
                    disabled={loading}
                  >
                    <option value="" disabled>
                      {loading ? 'Loading products...' : 'Select Product'}
                    </option>
                    {products.map(product => (
                      <option key={product.product_id} value={product.product_id}>
                        {getProductDisplayTextWithPrice(product)}
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

            {/* Quantity and Delivery Date */}
            <Row className="mb-3">
              <Col></Col>
              <Col xs={4}>
                <Form.Group controlId="quantity">
                  <Form.Label className="customLabel">
                    Quantity <Form.Label className="required">*</Form.Label>
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    isInvalid={!!errors.quantity}
                    min="1"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.quantity}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={4}>
                <Form.Group controlId="deliveryDate">
                  <Form.Label className="customLabel">
                    Delivery Date <Form.Label className="required">*</Form.Label>
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    isInvalid={!!errors.deliveryDate}
                    min={new Date().toISOString().split('T')[0]} // Prevent past dates
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.deliveryDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>

            {/* Delivery Options */}
            <Row className="mb-3">
              <Col></Col>
              <Col xs={8}>
                <Form.Group>
                  <Form.Label className="customLabel">
                    Delivery Option <Form.Label className="required">*</Form.Label>
                  </Form.Label>
                  <div className="mt-2">
                    <Form.Check
                      type="radio"
                      name="deliveryOption"
                      value="pickup"
                      label="Pick Up"
                      checked={formData.deliveryOption === 'pickup'}
                      onChange={handleInputChange}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      name="deliveryOption"
                      value="delivery"
                      label="Delivery"
                      checked={formData.deliveryOption === 'delivery'}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.deliveryOption && (
                    <div className="text-danger small mt-1">
                      {errors.deliveryOption}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>

            {/* Comments */}
            <Row className="mb-4">
              <Col></Col>
              <Col xs={8}>
                <Form.Group controlId="comments">
                  <Form.Label className="customLabel">Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Any additional comments or special requirements..."
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>

            {/* Bulk/normal order form close and submit buttons. */}
            <Row>
              <Col>
                <Button
                  id="normalClearButton"
                  variant="secondary"
                  className="mx-5"
                  onClick={handleClose}
                  type="button"
                  disabled={submitLoading}
                >
                  Cancel
                </Button>
                <Button
                  id="normalSubmitButton"
                  type="submit"
                  disabled={submitLoading || loading}
                >
                  {submitLoading ? (
                    <>
                      <Spinner size="sm" /> Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BulkOrder;