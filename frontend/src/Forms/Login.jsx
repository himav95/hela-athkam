import { Modal, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { InputGroup } from 'react-bootstrap';
import { EnvelopeAt, Key } from 'react-bootstrap-icons';
// For form management and data validation import - formik yup.

// import Hela athkam: form css file.
import '../Asset/Style/Helaathkam_Form.css';

function Login({ isModalOpen, closeLoginModal, openSignModal}) {
  return (
    <>
      {/* login modal */}
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

        {/* login form content within modal body. */}
        <Modal.Body id="loginModalBody">
          <Row className="mb-5"></Row>

          {/* login form email */}
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
                  autoFocus
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

          {/* login form password */}
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
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

          {/* login button */}
          <Row className="justify-content-center mb-4">
            <Button
              variant="secondary"
              onClick={closeLoginModal}
              id="loginButton"
            >
              Login
            </Button>
          </Row>

          <Row>
            <Col className="d-flex justify-content-center align-items-center" >
              <Form.Label className="text-muted mb-0 me-1">
                First visit to Hela Athkam?
              </Form.Label>

              <Nav.Link 
              as='span' 
              onClick={() => {closeLoginModal(); openSignModal(); }} 
              style={{cursor: 'pointer', color: 'blue'}}>Sign Up</Nav.Link>

              <Form.Label className='text-muted mb-0 ms-1'>here.</Form.Label>
            </Col>
          </Row>
        </Modal.Body>

      </Modal>
    </>
  );
}

export default Login;
