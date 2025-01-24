import { Modal, Button } from 'react-bootstrap';
function CraftsmanRequest ({ isRequestModalOpen, closeRequestModal }) {
  return (

    
    <Modal show={isRequestModalOpen} onHide={closeRequestModal} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Welcome to Hela Athkam!</Modal.Title>
      </Modal.Header>
      {/* sign up form content */}
      <Modal.Body>
        <p>This is your login form.</p>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={closeRequestModal}>
          Close
        </Button>
        {/* Add additional buttons if needed */}
      </Modal.Footer>
    </Modal>
    

  );
};
export default CraftsmanRequest;