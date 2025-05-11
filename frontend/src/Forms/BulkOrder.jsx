import { useState } from 'react';
import { Modal, Card, Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

// import form validation js file here.
import validateForm from '../Asset/Script/formValidation';

// import Hela athkam: form css file here.
import '../Asset/Style/Helaathkam_Form.css';

function BulkOrder({ isNormalModalOpen, closeNormalModal }) {
  // Noice tost state and function.
  const [showToast, setShowToast] = useState(true);
  const toggleShowToast = () => setShowToast(!showToast);


  // form state.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    productCategory: '',
    product: '',
    quantity: '',
    deliveryDate: '',
    deliveryOption: 'pickup',
    companyName: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateForm(formData, 'bulk');
    setErrors(validation.errors);

    if (validation.isValid) {

      // submit form logic here. API call to backend.
      console.log('Form submitted:', formData);
      closeNormalModal();
    }
  };



  return (
    <>
      {/* Bulk/Normal order modal */}
      <Modal
        show={isNormalModalOpen}
        onHide={closeNormalModal}
        backdrop="static"
        size="lg"
        centered
        scrollable
      >
        <Modal.Header id="normalOrderHeader" closeButton>
          <Modal.Title>
            <h3>Bulk Order</h3>
          </Modal.Title>
        </Modal.Header>

        {/* Bulk/Normal order form content within modal body */}
        <Modal.Body id="normalOrderBody">
          <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <h6 className="text-muted">Customer Details</h6>
            </Col>
          </Row>

          {/* Bulk/normal order form: customer details  */}
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
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  autoFocus
                ></Form.Control>

                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  placeholder="helaathkam@example.com"
                ></Form.Control>

                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
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
                <Form.Control size="sm" 
                type="text"
                name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.phoneNumber}
                ></Form.Control>

                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={4}></Col>
            <Col></Col>
          </Row>

          <hr />

          {/* Bulk/normal order form: order request details */}
          <Row className="mb-3">
            <Col>
              <h6 className="text-muted">Order Details</h6>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col></Col>

            {/* product category */}
            <Col xs={4}>
              <Form.Group ControlId="ProdocutCategory">
                <Form.Label className="customLabel">
                  Product Category{' '}
                  <Form.Label className="required">*</Form.Label>
                </Form.Label>
                <Form.Select size="sm" aria-label="categoryOptions"
                name="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
                  isInvalid={!!errors.productCategory}
                >
                  <option selected disabled>
                    Select Category
                  </option>
                  <option>Houseware</option>
                  <option>Tableware</option>
                  <option>Kitchenware</option>
                  <option>Bags</option>
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.productCategory}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* product */}
            <Col xs={4}>
              <Form.Group ControlId="Product">
                <Form.Label className="customLabel">
                  Product <Form.Label className="required">*</Form.Label>
                </Form.Label>
                <Form.Select size="sm" 
                aria-label="product"
                name="product"
                  value={formData.product}
                  onChange={handleChange}
                  isInvalid={!!errors.product}
                >
                  <option selected disabled>
                    Select Product
                  </option>
                  <option></option>
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.product}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>

          {/* Bulk/normal order form product quantity and delivery date and delivery option */}
          <Row className="mb-5">
            <Col></Col>

            {/* quantity */}
            <Col xs={4}>
              <Form.Group ControlId="quantity" className="mb-3">
                <Form.Label className="customLabel">
                  Quantity <Form.Label className="required">*</Form.Label>
                </Form.Label>
                <Form.Control size="sm" type="text"
                name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  isInvalid={!!errors.quantity}
                ></Form.Control>

                 <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>

              {/* delivery date */}
              <Form.Group ControlId="deliveryDate">
                <Form.Label className="customLabel">
                  delivery Date <Form.Label className="required">*</Form.Label>
                </Form.Label>
                <Form.Control size="sm" type="date"
                name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  isInvalid={!!errors.deliveryDate}
                ></Form.Control>

                 <Form.Control.Feedback type="invalid">
                  {errors.deliveryDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* delivery option and notice toast. */}
            <Col xs={4}>
              <Card id="deliveryOptionCard" className="justify-content-center">
                <Row></Row>
                <Row className="mb-5">
                  <Col></Col>

                  <Col xs={6}>
                    {/* Delivery Notice (shows upperside of the deliver option card) */}
                    <Toast
                      onClose={toggleShowToast}
                      show={showToast}
                      animation={false}
                      id="noticeToast"
                      delay={7200}
                      autohide
                    >
                      {/* delay={3600} autohide : using seems not okay?! */}
                      <Toast.Header>
                        <img src="" className="rounded me-2" alt="" />
                        <strong className="me-auto">Notice</strong>
                        {/* <small>1 mins ago</small> */}
                      </Toast.Header>
                      <Toast.Body>
                        Hela Athkam delivery service is Only active within the
                        City.
                      </Toast.Body>
                    </Toast>

                    {/* pickup */}
                    <Form.Group ControlId="deliverRadio1" className="mb-3">
                      <Form.Check
                        type="radio"
                        name="deliver"
                        value="pickup"
                        checked={formData.deliveryOption === 'pickup'}
                        onChange={handleChange}
                        inline
                      ></Form.Check>
                      <Form.Label className="customLabel">Pick Up</Form.Label>
                    </Form.Group>

                    {/* delivery */}
                    <Form.Group controlId="deliverRadio2">
                      <Form.Check
                        type="radio"
                        name="deliver"
                        value="delivery"
                        checked={formData.deliveryOption === 'delivery'}
                        onChange={handleChange}
                        onClick={toggleShowToast}
                        inline
                      ></Form.Check>
                      <Form.Label className="customLabel">Delivery</Form.Label>
                    </Form.Group>
                  </Col>
                  <Col></Col>
                </Row>
                <Row></Row>
              </Card>
            </Col>
            <Col></Col>
          </Row>

          {/* Bulk/normal order form close and submit buttons. */}
          <Row>
            <Col>
              <Button
                id="normalClearButton"
                variant="secondary"
                className="mx-5"
                onClick={closeNormalModal}
              >
                Close
              </Button>
              <Button id="normalSubmitButton">Submit</Button>
            </Col>
          </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BulkOrder;
