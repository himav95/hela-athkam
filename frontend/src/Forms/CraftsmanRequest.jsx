// Craftmaker request form content in join us page is here.
import React, { useState } from 'react';
import { Row, Col, Modal, Button, Toast, ToastContainer } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import requestService from '../Services/requestService';

// import Hela athkam: form css file here.
import '../Asset/Style/Helaathkam_Form.css';

function CraftsmanRequest({ isRequestModalOpen, closeRequestModal }) {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    email: '',
    phone: '',
    address: '',
    product_name: '',
    product_category: '',
    description: ''
  });

  // File state
  const [productImages, setProductImages] = useState([]);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: '', message: '' });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Show toast notification
  const showToastNotification = (type, message) => {
    setToastMessage({ type, message });
    setShowToast(true);
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate file count (max 5 as per backend config)
    if (files.length > 5) {
      setErrors(prev => ({
        ...prev,
        productImages: 'Maximum 5 images allowed'
      }));
      return;
    }

    // Validate file types and sizes
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const invalidFiles = files.filter(file =>
      !allowedTypes.includes(file.type) || file.size > maxSize
    );

    if (invalidFiles.length > 0) {
      setErrors(prev => ({
        ...prev,
        productImages: 'Only JPEG, PNG, GIF, and WebP images under 10MB are allowed'
      }));
      return;
    }

    setProductImages(files);
    setErrors(prev => ({
      ...prev,
      productImages: ''
    }));
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.nic.trim()) newErrors.nic = 'NIC is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.product_name.trim()) newErrors.product_name = 'Product name is required';
    if (!formData.product_category) newErrors.product_category = 'Product category is required';

    // Format validation
    if (formData.name && !/^[a-zA-Z\s\.]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters, spaces, and dots';
    }

    if (formData.nic && !/^([0-9]{9}[xXvV]|[0-9]{12})$/.test(formData.nic)) {
      newErrors.nic = 'Invalid NIC format';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.phone && !/^(\+94|0)?[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    // Length validation
    if (formData.name && (formData.name.length < 2 || formData.name.length > 255)) {
      newErrors.name = 'Name must be between 2-255 characters';
    }

    if (formData.address && (formData.address.length < 10 || formData.address.length > 500)) {
      newErrors.address = 'Address must be between 10-500 characters';
    }

    if (formData.description && formData.description.length > 2000) {
      newErrors.description = 'Description must be less than 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToastNotification('error', 'Please fix the errors above');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Append form fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      // Append files
      productImages.forEach(file => {
        submitData.append('productImages', file);
      });

      // Submit to backend
      const response = await requestService.submitCraftmakerApplication(submitData);

      if (response.success) {
        showToastNotification('success', 'Application submitted successfully! We will review your request soon.');

        // Reset form after successful submission
        setTimeout(() => {
          resetForm();
          closeRequestModal();
        }, 2000);

      } else {
        showToastNotification('error', response.message || 'Submission failed');
      }

    } catch (error) {
      console.error('Submission error:', error);

      // Handle validation errors from backend
      if (error.message.includes('Validation failed')) {
        showToastNotification('error', 'Please check your information and try again');
      } else if (error.message.includes('duplicate') || error.message.includes('already exists')) {
        showToastNotification('error', 'An application with this NIC already exists');
      } else {
        showToastNotification('error', 'Something went wrong. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      nic: '',
      email: '',
      phone: '',
      address: '',
      product_name: '',
      product_category: '',
      description: ''
    });
    setProductImages([]);
    setErrors({});
    setToastMessage({ type: '', message: '' });
  };

  // Handle modal close
  const handleClose = () => {
    resetForm();
    closeRequestModal();
  };

  return (
    <>
      <Modal
        show={isRequestModalOpen}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        scrollable
        centered
      >
        <Modal.Header id="craftsmanHeader" closeButton>
          <Modal.Title>Craft-Maker Request</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <Row className="mb-3">
              <h6 className="text-muted">Craft-Designer Details</h6>
            </Row>

            {/* Craftsman request form: Craft designer details. */}
            <Row className="mb-3">
              <Col></Col>
              {/* Craftsman name */}
              <Col xs={3}>
                <Form.Group controlId="name">
                  <Form.Label className="customLabel">
                    Name <Form.Label className="required">*</Form.Label>
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    isInvalid={!!errors.name}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Craftsman NIC */}
              <Col xs={3}>
                <Form.Group controlId="nic">
                  <Form.Label className="customLabel">
                    NIC <Form.Label className="required">*</Form.Label>
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleInputChange}
                    isInvalid={!!errors.nic}
                    placeholder="123456789V"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nic}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Craftsman email */}
              <Col xs={3}>
                <Form.Group controlId="email">
                  <Form.Label className="customLabel mb-1">
                    Email <Form.Label></Form.Label>
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    isInvalid={!!errors.email}
                    placeholder="helaathkam@example.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>

            <Row className="mb-3">
              <Col></Col>
              {/* Craftsman phone number */}
              <Col xs={3}>
                <Form.Group controlId="phone">
                  <Form.Label className="customLabel">
                    Phone Number <Form.Label className="required">*</Form.Label>
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    isInvalid={!!errors.phone}
                    placeholder="0771234567"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Craftsman address */}
              <Col xs={6}>
                <Form.Group controlId="address">
                  <Form.Label className="customLabel">
                    Address <Form.Label className="required">*</Form.Label>
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    as="textarea"
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    isInvalid={!!errors.address}
                    placeholder="Enter your full address"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>

            <hr />

            {/* Craftsman's product details */}
            <Row className="mb-2">
              <h6 className="text-muted">Product Details</h6>
            </Row>

            <Row className="mb-3">
              <Col></Col>
              {/* product name */}
              <Col xs={4}>
                <Form.Group controlId="product_name">
                  <Form.Label className="customLabel">
                    Name of the Product{' '}
                    <Form.Label className="required">*</Form.Label>
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    isInvalid={!!errors.product_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.product_name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* product category */}
              <Col xs={4}>
                <Form.Group controlId="product_category">
                  <Form.Label className="customLabel">
                    Product Category{' '}
                    <Form.Label className="required">*</Form.Label>
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    name="product_category"
                    value={formData.product_category}
                    onChange={handleInputChange}
                    isInvalid={!!errors.product_category}
                  >
                    <option value="">Select Category</option>
                    <option value="houseware">Houseware</option>
                    <option value="tableware">Tableware</option>
                    <option value="kitchenware">Kitchenware</option>
                    <option value="bags">Bags</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.product_category}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>

            <Row className="mb-3">
              <Col></Col>
              <Col xs={8}>
                <Form.Group controlId="productImages" className="mb-3">
                  <Form.Label className="customLabel">
                    Product Images <Form.Label className="required">*</Form.Label>
                    <Form.Label className="text-muted inputHelp">
                      <i>You can choose up to 5 images (max 10MB each). JPEG, PNG, GIF, WebP formats allowed.</i>
                    </Form.Label>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.gif,.webp"
                    onChange={handleFileChange}
                    isInvalid={!!errors.productImages}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.productImages}
                  </Form.Control.Feedback>
                  {productImages.length > 0 && (
                    <small className="text-muted">
                      {productImages.length} file(s) selected
                    </small>
                  )}
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>

            <Row className="mb-4">
              <Col></Col>
              <Col xs={8}>
                <Form.Group controlId="description">
                  <Form.Label className="customLabel">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    isInvalid={!!errors.description}
                    placeholder="Describe your product: size, color, material, or any message you want to share..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>

            {/* Craftsman request form close and submit buttons. */}
            <Row>
              <Col>
                <Button
                  id="craftClearButton"
                  variant="secondary"
                  className="mx-5"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Close
                </Button>
                <Button
                  id="craftSubmitButton"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Toast Container for notifications */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={4000}
          autohide
          bg={toastMessage.type === 'success' ? 'success' : 'danger'}
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastMessage.type === 'success' ? 'Success' : 'Error'}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {toastMessage.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default CraftsmanRequest;