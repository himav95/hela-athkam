import { Modal, Button, Card, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

// import Helaathkam_Form.css for SignUp.css contents.
import '../Asset/Style/Helaathkam_Form.css';

function SignUp ({ isModalOpen, closeSignModal }) {
  return (
    <Modal show={isModalOpen} onHide={closeSignModal} backdrop="static" size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Welcome to Hela Athkam!</Modal.Title>
      </Modal.Header>

      {/* sign up form content */}
      <Modal.Body>
        <p>This is your login form.</p>
        <Card size='sm'>
        <Form>
            <Row>
              {/* sign up name content */}
              <Col>
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              </Col>
               {/* sign up email content  */}
              <Col>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* sign up password content */}
              <Col>
              <Form.Group className="mb-3" controlId="password1">
                <Form.Label>password</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              </Col>
              
              {/* sign up re-enter password content */}
              <Col>
              <Form.Group className="mb-3" controlId="password2">
                <Form.Label>Re-Password</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              </Col>
            </Row>
        </Form>
        </Card>
      </Modal.Body>

      <Modal.Footer>
      <Button variant="secondary" onClick={closeSignModal}>
         Close
        </Button>
        {/* Add additional buttons if needed */}
      </Modal.Footer>
    </Modal>
  );
}
export default SignUp;
