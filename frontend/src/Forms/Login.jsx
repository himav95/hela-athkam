import { Modal, Button, Row, Col, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { InputGroup } from 'react-bootstrap';
import { EnvelopeAt, Key } from 'react-bootstrap-icons';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { validateLogin } from '../Asset/Script/authValidation';
import { authService } from '../Services/apiService';
import '../Asset/Style/Helaathkam_Form.css';

function Login({ isModalOpen, closeLoginModal, openSignModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs first
    const validationError = validateLogin(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(""); // Clear previous errors

      const response = await authService.login(email, password);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        closeLoginModal(); // Close modal first

        // Then redirect based on role
        response.data.user.role === 'admin'
          ? navigate('/admin/dashboard')
          : navigate('/user/userprofile');
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message ||
        err.message ||
        'Login failed (server error)';
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Clear error when user starts typing
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  return (
    <Modal
      show={isModalOpen}
      onHide={closeLoginModal}
      backdrop="static"
      size="lg"
      dialogClassName="loginModal"
      centered
    >
      <Modal.Header id="loginModalHeader" closeButton>
        <Modal.Title>
          <h3 className="text-muted ms-3">HELA ATHKAM : Login</h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body id="loginModalBody">
        {error && <div className="alert alert-danger">{error}</div>}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-5"></Row>

          {/* Email Field */}
          <Row className="mb-4">
            <Col></Col>
            <Col xs={6}>
              <InputGroup className="mb-3" size='sm'>
                <InputGroup.Text id="email">
                  <EnvelopeAt size={20} color="#176b87" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Enter Your E-mail Address"
                  type="email"
                  aria-label="UserEmail"
                  aria-describedby="email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={loading}
                  autoFocus
                  required
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

          {/* Password Field */}
          <Row className="mb-5">
            <Col></Col>
            <Col xs={6}>
              <InputGroup className="mb-3" size='sm'>
                <InputGroup.Text id="password1">
                  <Key size={20} color="#176b87" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Enter Your Password"
                  type="password"
                  aria-label="UserPwd1"
                  aria-describedby="password1"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={loading}
                  required
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

          {/* Login Button */}
          <Row className="justify-content-center mb-4">
            <Button
              variant="secondary"
              id="loginButton"
              type="submit"
              disabled={loading}
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
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Row>

          {/* Sign Up Link */}
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <Form.Label className="text-muted mb-0 me-1">
                First visit to Hela Athkam?
              </Form.Label>
              <Nav.Link
                as='span'
                onClick={() => {
                  if (!loading) {
                    closeLoginModal();
                    openSignModal();
                  }
                }}
                style={{
                  cursor: loading ? 'not-allowed' : 'pointer',
                  color: loading ? '#6c757d' : 'blue',
                  opacity: loading ? 0.5 : 1
                }}
              >
                Sign Up
              </Nav.Link>
              <Form.Label className='text-muted mb-0 ms-1'>here.</Form.Label>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;