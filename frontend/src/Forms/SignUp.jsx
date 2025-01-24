import { Modal, Button } from 'react-bootstrap';
function SignUp ({ isModalOpen, closeFormModal }) {
  return (
    
    <Modal show={isModalOpen} onHide={closeFormModal} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Welcome to Hela Athkam!</Modal.Title>
      </Modal.Header>
      {/* sign up form content */}
      <Modal.Body>
        <p>This is your login form.</p>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={closeFormModal}>
          Close
        </Button>
        {/* Add additional buttons if needed */}
      </Modal.Footer>
    </Modal>
    

  );
};
export default SignUp;