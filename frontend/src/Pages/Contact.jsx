import { Container, Card, Form, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

// import Hela athkam: Page css file here.
import '../Asset/Style/Helaathkam_Page.css';

// import Hela athkam: Form css file here.
import '../Asset/Style/Helaathkam_Form.css';

function Contact() {
  return (
    
      <Row className="componentSpace">
        <Col></Col>

        {/* Hela Athkam contact information */}
        <Col xs={5}>
          <Container id="contactInfo">
            <Row className="mb-2">
              <Col>
                <h3 className="mb-4">
                  <u>Hela Athkam</u>
                </h3>
                <h6>No.22/5B,</h6>
                <h6>Galle Road,</h6>
                <h6>Matara,</h6>
                <h6>Sri lanka.</h6>
              </Col>
            </Row>

            <Row id="contactInfoSRowspace">
              <Col>
                <h6>Call Us: +94 41 27567/9</h6>
                <h6>Email: helaathkam@lankan.lk</h6>
              </Col>
            </Row>

            <Row>
              <Col>MAp</Col>
            </Row>
          </Container>
        </Col>

        {/* Contact/Inquiry message form */}
        <Col xs={5}>
          <Card id="contactForm">
            <Card.Header id="contactformHeading">
              <Card.Title>Contact Form</Card.Title>
            </Card.Header>

            <Card.Body>
              <Row>
                <Col></Col>
                <Col xs={10}>
                  {/* customer name */}
                  <Row className="mb-4">
                    <Col>
                      <Form.Group ControlId="name">
                        <Form.Label className="customLabel">Name</Form.Label>
                        <Form.Control
                          id="Namefm"
                          size="sm"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* customer email */}
                  <Row className="mb-4">
                    <Col>
                      <Form.Group controlId="email">
                        <Form.Label className="customLabel">Email</Form.Label>
                        <Form.Control
                          id="emailfm"
                          size="sm"
                          type="email"
                          placeholder="helaathkam@example.com"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* message subject */}
                  <Row className="mb-4">
                    <Col>
                      <Form.Group ControlId="subject">
                        <Form.Label className="customLabel">Subject</Form.Label>
                        <Form.Control
                          id="Subjectfm"
                          size="sm"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* message */}
                  <Row className="componentSpace">
                    <Col>
                      <Form.Group ControlId="message">
                        <Form.Label className="customLabel">
                          Inquire/Message
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          id="Messagefm"
                          size="sm"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* contact form buttons */}
                  <Row className="mb-3">
                    <Col>
                      <Button id="clearfm" className="mx-5">
                        Clear
                      </Button>
                      <Button id="submitfm">Submit</Button>
                    </Col>
                  </Row>
                </Col>
                <Col></Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    
  );
}

export default Contact;
