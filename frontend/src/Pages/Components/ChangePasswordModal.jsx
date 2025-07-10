// user change password modal jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../../Asset/Script/AuthContext';

const ChangePasswordModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const { logout } = useAuth();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'New password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.oldPassword && formData.newPassword && formData.oldPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Check if token exists
    const token = localStorage.getItem('token'); // Fixed: use 'token' key consistently
    if (!token) {
      setAlertMessage('Authentication required. Please log in again.');
      setAlertVariant('danger');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    setShowAlert(false);

    try {
      const response = await fetch('http://localhost:5000/api/password/change', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use token from AuthContext
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage('Password changed successfully! You will be logged out for security.');
        setAlertVariant('success');
        setShowAlert(true);

        // Clear form
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });

        // Close modal and logout after 3 seconds for security
        setTimeout(() => {
          onHide();
          setShowAlert(false);
          logout(); // Log out user to force re-authentication with new password
        }, 3000);
      } else {
        setAlertMessage(data.message || 'Failed to change password');
        setAlertVariant('danger');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Password change error:', error);
      setAlertMessage('An error occurred. Please try again.');
      setAlertVariant('danger');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    setShowAlert(false);
    onHide();
  };

  return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {showAlert && (
              <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                {alertMessage}
              </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Current Password */}
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.oldPassword}
                  placeholder="Enter your current password"
              />
              <Form.Control.Feedback type="invalid">
                {errors.oldPassword}
              </Form.Control.Feedback>
            </Form.Group>

            {/* New Password */}
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.newPassword}
                  placeholder="Enter your new password"
              />
              <Form.Control.Feedback type="invalid">
                {errors.newPassword}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Confirm New Password */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                  placeholder="Confirm your new password"
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={loading}
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default ChangePasswordModal;