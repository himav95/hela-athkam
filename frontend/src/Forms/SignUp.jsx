import { Modal, Button, Nav } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { EnvelopeAt, Key, Person } from 'react-bootstrap-icons';

// import Hela athkam: form css file here.
import '../Asset/Style/Helaathkam_Form.css';

function SignUp({ isModalOpen, closeSignModal, openLoginModal }) {
  return (
    <>
      {/* sign up modal */}
      <Modal
        show={isModalOpen}
        onHide={closeSignModal}
        backdrop="static"
        size="lg"
        id="signUpModal"
        centered
      >
        <Modal.Header id="signUpModalHeader" closeButton>
          <Modal.Title>
            <h3 className="text-muted ms-3">HELA ATHKAM : Sign Up</h3>
          </Modal.Title>
        </Modal.Header>

        {/* sign up form content within modal body. */}
        <Modal.Body id="signUpModalBody">
          <Row className="mb-4"></Row>

          {/* full name. */}
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
                  aria-label="Username"
                  aria-describedby="fullName"
                  autoFocus
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

          {/* email. */}
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
                  aria-label="UserEmail"
                  aria-describedby="email"
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

          {/* password */}
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
                  aria-label="UserPwd1"
                  aria-describedby="password1"
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

          {/* confirm password */}
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
                  aria-label="UserPwd2"
                  aria-describedby="password2"
                />
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>

          {/* sign up button. */}
          <Row className="justify-content-center mb-3">
            <Button
              variant="secondary"
              onClick={closeSignModal}
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

            <Nav.Link as="span" onClick={() => {closeSignModal(); openLoginModal(); }}
            style={{cursor: 'pointer', color: 'blue'}} > Login
            </Nav.Link>

            <Form.Label className='text-muted mb-0 ms-1'>here.</Form.Label>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignUp;
