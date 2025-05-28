import { Modal, Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { InputGroup } from 'react-bootstrap';
import { EnvelopeAt, Key } from 'react-bootstrap-icons';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { validateLogin } from '../Asset/Script/authValidation';
import axios from "axios";
import '../Asset/Style/Helaathkam_Form.css'; // hela athkam form css file is here.

function Login({ isModalOpen, closeLoginModal, openSignModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
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
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email, password
      });

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
      console.error("Login error:", err); // Debugging
    }
  }


  return (
    <Modal show={isModalOpen} onHide={closeLoginModal} backdrop="static" size="lg" dialogClassName="loginModal" centered>
      <Modal.Header id="loginModalHeader" closeButton>
        <Modal.Title>
          <h3 className="text-muted ms-3">HELA ATHKAM : Login</h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body id="loginModalBody">
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-5"></Row>

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
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

          <Row className="justify-content-center mb-4">
            <Button variant="secondary" id="loginButton" type="submit">
              Login
            </Button>
          </Row>

          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <Form.Label className="text-muted mb-0 me-1">
                First visit to Hela Athkam?
              </Form.Label>
              <Nav.Link
                as='span'
                onClick={() => { closeLoginModal(); openSignModal(); }}
                style={{cursor: 'pointer', color: 'blue'}}
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