import { useState } from 'react';
import { Container, Card, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';

// import Hela athkam: Page css file here.
import '../Asset/Style/Helaathkam_Page.css';

// import Hela athkam: Form css file here.
import '../Asset/Style/Helaathkam_Form.css';

function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [errors, setErrors] = useState({});

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ show: false, type: '', message: '' });
    setErrors({});

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setAlert({
          show: true,
          type: 'success',
          message: data.message
        });

        // Clear form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        if (data.errors) {
          setErrors(data.errors);
        }
        setAlert({
          show: true,
          type: 'danger',
          message: data.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting message:', error);
      setAlert({
        show: true,
        type: 'danger',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle clear form
  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
    setAlert({ show: false, type: '', message: '' });
  };

  return (
    <Row className="componentSpace">
      <Col></Col>

      {/* Hela Athkam contact information */}
      <Col xs={5}>
        <Container id="contactInfo">
          <Row className="mb-2">
            <Col>
              <h3 className="mb-4">
                <u>Hela Athkam</u>
              </h3>
              <h6>No.22/5B,</h6>
              <h6>Galle Road,</h6>
              <h6>Matara,</h6>
              <h6>Sri lanka.</h6>
            </Col>
          </Row>

          <Row id="contactInfoSRowspace">
            <Col>
              <h6>Call Us: +94 41 27567/9</h6>
              <h6>Email: helaathkam@lankan.lk</h6>
            </Col>
          </Row>

          <Row>
            <Col>MAp</Col>
          </Row>
        </Container>
      </Col>

      {/* Contact/Inquiry message form */}
      <Col xs={5}>
        <Card id="contactForm">
          <Card.Header id="contactformHeading">
            <Card.Title>Contact Form</Card.Title>
          </Card.Header>

          <Card.Body>
            <Row>
              <Col></Col>
              <Col xs={10}>
                {/* Alert for success/error messages */}
                {alert.show && (
                  <Alert
                    variant={alert.type}
                    dismissible
                    onClose={() => setAlert({ show: false, type: '', message: '' })}
                    className="mb-4"
                  >
                    {alert.message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  {/* customer name */}
                  <Row className="mb-4">
                    <Col>
                      <Form.Group controlId="name">
                        <Form.Label className="customLabel">Name *</Form.Label>
                        <Form.Control
                          id="Namefm"
                          size="sm"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          isInvalid={!!errors.name}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* customer email */}
                  <Row className="mb-4">
                    <Col>
                      <Form.Group controlId="email">
                        <Form.Label className="customLabel">Email *</Form.Label>
                        <Form.Control
                          id="emailfm"
                          size="sm"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="helaathkam@example.com"
                          isInvalid={!!errors.email}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* message subject */}
                  <Row className="mb-4">
                    <Col>
                      <Form.Group controlId="subject">
                        <Form.Label className="customLabel">Subject *</Form.Label>
                        <Form.Control
                          id="Subjectfm"
                          size="sm"
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          isInvalid={!!errors.subject}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.subject}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* message */}
                  <Row className="componentSpace">
                    <Col>
                      <Form.Group controlId="message">
                        <Form.Label className="customLabel">
                          Inquire/Message *
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          id="Messagefm"
                          size="sm"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          isInvalid={!!errors.message}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.message}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                          {formData.message.length}/1000 characters
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* contact form buttons */}
                  <Row className="mb-3">
                    <Col>
                      <Button
                        id="clearfm"
                        className="mx-5"
                        variant="secondary"
                        type="button"
                        onClick={handleClear}
                        disabled={loading}
                      >
                        Clear
                      </Button>
                      <Button
                        id="submitfm"
                        variant="primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Sending...
                          </>
                        ) : (
                          'Submit'
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col></Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default Contact;