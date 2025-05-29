import React from 'react';
import { Form, Button, Card, Alert, Container, Spinner } from 'react-bootstrap';
import { UserProfileValidation } from '../../Asset/Script/UserProfileValidation';

function UserProfileEdit() {
  const {
    formData,
    isEditing,
    errors,
    success,
    loading,
    fetchLoading,
    handleChange,
    handleSave,
    handleCancel,
    setIsEditing,
    hasChanges
  } = UserProfileValidation();

  // Show loading spinner while fetching data
  if (fetchLoading) {
    return (
      <Container className="mt-5 ms-5">
        <Card style={{ width: "70%" }}>
          <Card.Header style={{ backgroundColor: "#176B87", color: "white" }}>
            <h3>User Profile</h3>
          </Card.Header>
          <Card.Body className="text-center py-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Loading profile...</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-5 ms-5">
      <Card style={{ width: "70%" }}>
        <Card.Header style={{ backgroundColor: "#176B87", color: "white" }}>
          <h3>User Profile</h3>
        </Card.Header>
        <Card.Body>
          {/* Success Message */}
          {success && <Alert variant="success">{success}</Alert>}

          {/* General Error Message */}
          {errors.general && <Alert variant="danger">{errors.general}</Alert>}

          <Form>
            {/* Name Field */}
            <Form.Group className="mb-3">
              <Form.Label>Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing || loading}
                isInvalid={!!errors.name}
                placeholder="Enter your full name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Email Field */}
            <Form.Group className="mb-3">
              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing || loading}
                isInvalid={!!errors.email}
                placeholder="Enter your email address"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Phone Field */}
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing || loading}
                isInvalid={!!errors.phone}
                placeholder="Enter your phone number (optional)"
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Address Field */}
            <Form.Group className="mb-4">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing || loading}
                isInvalid={!!errors.address}
                placeholder="Enter your delivery address (optional)"
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Action Buttons */}
            <div className="d-flex gap-2 align-items-center">
              {!isEditing ? (
                <Button
                  variant="primary"
                  onClick={() => setIsEditing(true)}
                  disabled={loading}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant="success"
                    onClick={handleSave}
                    disabled={loading || !hasChanges}
                  >
                    {loading && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                    )}
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  {!hasChanges && (
                    <small className="text-muted ms-2">
                      No changes to save
                    </small>
                  )}
                </>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserProfileEdit;