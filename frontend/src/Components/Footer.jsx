import { Container, Nav } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

// import footer css file here.
import '../Asset/Style/Footer.css';
import { EnvelopeAt, Telephone } from 'react-bootstrap-icons';

function Footer() {
  return (
    
      <Container fluid id="pageFooter">
        <Row></Row>
        <Row className="mt-5">
          <Col></Col>
          {/* hela athkam page links */}
          <Col xs={3} className="footerHeading">
            <Form.Label>
              <h3>
                <u>Links</u>
              </h3>
            </Form.Label>
          </Col>

          {/* hela athkam categories */}
          <Col xs={3} className="footerHeading">
            <h3>
              <u>Categories</u>
            </h3>
          </Col>

          {/* hela athkam address and contact information. */}
          <Col xs={3} className="footerHeading">
            <h3>
              <u>Hela Athkam</u>
            </h3>
          </Col>
          <Col></Col>
        </Row>

        {/* footer heading-content accordingly. */}
        <Row className="mt-3 mb-5">
          <Col></Col>
          {/* nav  links */}
          <Col xs={3}>
            <Nav className="flex-column" defaultActiveKey="/home">
              <Nav.Link className="navLink2" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="navLink2" href="/about">
                About
              </Nav.Link>
              <Nav.Link className="navLink2" href="/products">
                Products
              </Nav.Link>
              <Nav.Link className="navLink2" href="/services">
                Services
              </Nav.Link>
              <Nav.Link className="navLink2" href="/orderonline">
                Order Online
              </Nav.Link>
              <Nav.Link className="navLink2" href="/contact">
                Contact Us
              </Nav.Link>
              <Nav.Link className="navLink2" href="/joinus">
                Join Us
              </Nav.Link>
            </Nav>
          </Col>

          {/* category content */}
          <Col xs={3}>
            <p>Houseware</p>
            <p>Tableware</p>
            <p>Kitchenware</p>
            <p>Bags & Accessories</p>
          </Col>

          {/* hela athkam contact information */}
          <Col xs={3}>
            <p>Hela Athkam</p>
            <p>No.35,</p>
            <p>Galle Road,</p>
            <p>Matara.</p>
            <p>
              <Telephone size={15} color="#efefef" /> : 041 3356789
            </p>
            <p>
              <EnvelopeAt size={15} color="#efefef" /> : helaathkam@gmail.com
            </p>
          </Col>
          <Col></Col>
        </Row>
        <Row></Row>
      </Container>

  );
}

export default Footer;
