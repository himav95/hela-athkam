import { Modal, Button, Container, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function Login ({ isModalOpen, closeLoginModal }) {
  return (
    <Modal show={isModalOpen} onHide={closeLoginModal} backdrop="static" size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Welcome to Hela Athkam!</Modal.Title>
      </Modal.Header>

      {/* login form content */}
      <Modal.Body>
      <Form>

        {/* login email content */}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="helaathkam@example.com" />
      </Form.Group>

      {/* login password content */}
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="Password" />
      </Form.Group>
      </Form>
    </Modal.Body>
    
      <Container>
          <Row>
            <Col xs={6} md={4}></Col>
            <Col xs={6} md={4}>
      <Button variant='success' size='lg' className='justify-content-center mb-4'>Login</Button>
               
            </Col>
          </Row>
      </Container>
    </Modal>

  );
}
export default Login;
