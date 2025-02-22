import { Modal, Button, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

// import Helaathkam_Form.css for Login.jsx css contents.
import "../Asset/Style/Helaathkam_Form.css";

function Login ({isModalOpen, closeLoginModal}) {
  return (
    <Modal show={isModalOpen}
           onHide={closeLoginModal} 
           backdrop="static"
           size='lg'
           dialogClassName='loginModal'
           centered>
            
      <Modal.Header id='loginModalHeader' closeButton>
        <Modal.Title><h2>Welcome to Hela Athkam!</h2></Modal.Title>
      </Modal.Header>

      {/* login form content */}
      <Modal.Body id='loginModalBody'>
        <Row className='mb-5'></Row>

        {/* login form email */}
        <Row className="mb-4">
          <Col></Col>
          <Col xs={6}>
              <Form.Group controlId="email">
                <Form.Label>Email <Form.Label className='required'>*</Form.Label></Form.Label>
                <Form.Control type="email" placeholder='helaathkam@example.com' autoFocus/>
              </Form.Group>
              </Col>
          <Col></Col>
        </Row> 

        {/* login form password */}
        <Row className="mb-5">
          <Col></Col>
          <Col xs={6}>
          <Form.Group controlId="password1">
                <Form.Label>password <Form.Label className='required'>*</Form.Label></Form.Label>
                <Form.Control type="password" />
              </Form.Group>
          </Col>
          <Col></Col>
        </Row>

        {/* login button */}
        <Row className='justify-content-center mb-5' > 
        <Button variant="secondary"  onClick={closeLoginModal} id='loginButton'>Login</Button>
        </Row>
      </Modal.Body>

      <Modal.Footer id='loginModalFooter'>
         {/* link to sign up form. */}
         <Row>
          <Form.Label><i className='text-muted'>First visit to Hela Athlam?
            
            here.</i>
          </Form.Label>
        </Row>

         
      </Modal.Footer>
    </Modal>

  );
}

export default Login;
