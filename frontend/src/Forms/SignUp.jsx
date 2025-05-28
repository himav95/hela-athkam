import { Modal, Button, Nav } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { EnvelopeAt, Key, Person } from 'react-bootstrap-icons';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validateSignUp } from '../Asset/Script/authValidation';
import '../Asset/Style/Helaathkam_Form.css';

function SignUp({ isModalOpen, closeSignModal, openLoginModal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Validate inputs
    const validationError = validateSignUp(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        closeSignModal(); // Close modal first
        // Redirect to user profile (new users are 'user' role by default)
        navigate('/user/userprofile');
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message ||
        err.message ||
        'Registration failed (server error)';
      setError(errorMessage);
      console.error("Registration error:", err);
    }
  };

  return (
    <Modal show={isModalOpen} onHide={closeSignModal} backdrop="static" size="lg" centered>
      <Modal.Header id="signUpModalHeader" closeButton>
        <Modal.Title>
          <h3 className="text-muted ms-3">HELA ATHKAM : Sign Up</h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body id="signUpModalBody">
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-4"></Row>

          {/* Full Name */}
          <Row className="mb-3">
            <Col></Col>
            <Col xs={6}>
              <InputGroup className="mb-3" size='sm'>
                <InputGroup.Text id="fullName">
                  <Person size={22} color="#176b87" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Enter your Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-label="Username"
                  aria-describedby="fullName"
                  autoFocus
                  required
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

          {/* Email */}
          <Row className='mb-3'>
            <Col></Col>
            <Col xs={6}>
              <InputGroup className="mb-3" size='sm'>
                <InputGroup.Text id="email">
                  <EnvelopeAt size={20} color="#176b87" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Enter Your E-mail Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-label="UserEmail"
                  aria-describedby="email"
                  required
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

          {/* Password */}
          <Row className="mb-3">
            <Col></Col>
            <Col xs={6}>
              <InputGroup className="mb-3" size='sm'>
                <InputGroup.Text id="password1">
                  <Key size={20} color="#176b87" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  aria-label="UserPwd1"
                  aria-describedby="password1"
                  required
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

          {/* Confirm Password */}
          <Row className='mb-5'>
            <Col></Col>
            <Col xs={6}>
              <InputGroup className="mb-3" size='sm'>
                <InputGroup.Text id="password2">
                  <Key size={20} color="#176b87" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  aria-label="UserPwd2"
                  aria-describedby="password2"
                  required
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

          {/* Sign Up Button */}
          <Row className="justify-content-center mb-3">
            <Button
              variant="secondary"
              type="submit"
              id="signUpButton"
            >
              Sign Up
            </Button>
          </Row>

          <Row>
            <Col className='d-flex justify-content-center align-items-center'>
              <Form.Label className='text-muted mb-0 me-1'>
                Already have an account?
              </Form.Label>

              <Nav.Link
                as="span"
                onClick={() => {closeSignModal(); openLoginModal(); }}
                style={{cursor: 'pointer', color: 'blue'}}
              >
                Login
              </Nav.Link>

              <Form.Label className='text-muted mb-0 ms-1'>here.</Form.Label>
            </Col>
          </Row>

        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUp;