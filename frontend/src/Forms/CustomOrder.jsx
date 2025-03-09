import { Modal, Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function CustomOrder () {
    return (
    
      
    <Modal>
     
      {/* className='modal modal-dialog-scrollable' : not sure what suit the most */}
      <Modal.Header id="customOrderHeader" closeButton>
        <Modal.Title>
          <h3>Custom-Order</h3>
        </Modal.Title>
      </Modal.Header>

      {/* Custom order content within modal body. */}
      <Modal.Body>
        <Row className="mb-3">
          <h6 className="text-muted">Customer Details</h6>
        </Row>

        {/* Custom order form: Customer details */}
        <Row className="mb-3">
          <Col></Col>
          {/* customer name */}
          <Col xs={4}>
            <Form.Group ControlId="name">
              <Form.Label className="customLabel">
                Name <Form.Label className="required">*</Form.Label>
              </Form.Label>
              <Form.Control
                className="customControl"
                id="fullName"
                size="sm"
                type="text"
                autoFocus
              ></Form.Control>
            </Form.Group>
          </Col>

          {/* customer email address */}
          <Col xs={4}>
            <Form.Group controlId="email">
              <Form.Label className="customLabel">
                Email <Form.Label className="required">*</Form.Label>
              </Form.Label>
              <Form.Control
                size="sm"
                type="email"
                placeholder="helaathkam@example.com"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>

        {/* customer phone number */}
        <Row className="mb-3">
          <Col></Col>
          <Col xs={4}>
            <Form.Group ControlId="phoneNumber">
              <Form.Label className="customLabel">
                Phone Number <Form.Label className="required">*</Form.Label>
              </Form.Label>
              <Form.Control size="sm" type="text"></Form.Control>
            </Form.Group>
          </Col>
          <Col xs={4}></Col>
          <Col></Col>
        </Row>

        <hr />

        {/* Custom order form: Order request details */}
        <Row className="mb-3">
          <h6 className="text-muted">Order Details</h6>
        </Row>
        <Row className="mb-3">
          <Col></Col>

          {/* order describe label */}
          <Col xs={2}>
            <Form.Label className="customLabel" htmlFor="describeTextArea">
              Describe:
            </Form.Label>
          </Col>

          {/* order describing text area */}
          <Col xs={6}>
            <Form.Control
              as="textarea"
              placeholder="Describe the item you have in mind. Size, Color, Shape.."
              id="describeTextArea"
            />
          </Col>
          <Col></Col>
        </Row>

        {/* order sketch or image input */}
        <Row>
          <Col></Col>
          <Col xs={8}>
            <Form.Group controlId="orderSketch" className="mb-3">
              <Form.Label className="customLabel">Image/Sketch</Form.Label>
              <Form.Control type="file" size="sm" />
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>

        {/* order quantity and delivery date */}
        <Row className="mb-4">
          <Col></Col>
          {/* quantity */}
          <Col xs={4}>
            <Form.Group ControlId="Quantity" className="mb-3">
              <Form.Label className="customLabel">
                Quantity <Form.Label className="required">*</Form.Label>
              </Form.Label>
              <Form.Control size="sm" type="text"></Form.Control>
            </Form.Group>
          </Col>

          {/* delivery date */}
          <Col xs={4}>
            <Form.Group ControlId="deliveryDate">
              <Form.Label className="customLabel">
                delivery Date <Form.Label className="required">*</Form.Label>
              </Form.Label>
              <Form.Control size="sm" type="date"></Form.Control>
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>

        {/* Custom order form close and submit buttons. */}
        <Row>
          <Col>
            <Button
              id="customClearButton"
              variant="secondary"
              className="mx-5"
              onClick={closeCustomModal}
            >
              Close
            </Button>
            <Button id="customSubmitButton">Submit</Button>
          </Col>
        </Row>

        <Button> </Button>
      </Modal.Body>
    </Modal>
    
    
    );
}

export default CustomOrder;