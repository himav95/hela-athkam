import { useState } from 'react';
import CraftsmanRequest from '../Forms/CraftsmanRequest'; // import CraftsmanRequest form from Forms.
import Card from 'react-bootstrap/Card';
import { Row, Col, Button, Container } from 'react-bootstrap';


// import Hela athkam: page css file here.
import '../Asset/Style/Helaathkam_Page.css';

function JoinUs() {
  // Craftsmen request form, state and function details.
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);

  const openRequestModal = () => setRequestModalOpen(true);
  const closeRequestModal = () => setRequestModalOpen(false);

  return (
    <>
      {/* join us page heading */}
      <Row className="mb-4">
        <Col></Col>
        <Col xs={10}>
          <h2 className="mb-2">Attention independent craft makers!</h2>
          <h5 className="mb-4">
            We invite you to join hands with Hela Athkam, a place where Sri
            Lankan Craftmanship
          </h5>
        </Col>
        <Col></Col>
      </Row>

      {/* join us page content */}
      <Row className="mb-5">
        <Col></Col>
        <Col xs={10}>
          <Card id="joinUsCard">
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <p>
                    At Hela Athkam, we recognize the unique talents and passion
                    that fuel your craft, and we are committed to providing a
                    supportive platform for you to showcase your creations to a
                    wider audience. Whether you specialize in handmade bespoke
                    home decor, or any other form of craftsmanship, Hela Athkam
                    is the perfect place for you to connect, grow, and thrive.
                    Together, let's amplify the beauty of handmade creations and
                    make a lasting impact in the world of independent craft.
                  </p>
                </Col>
              </Row>

              <Row className="componentSpace">
                <Col>
                  <p>
                    Dear independent craft makers, embark on a journey with Hela
                    Athkam and discover a thriving marketplace for your
                    exquisite creations. Leave your worries behind, for at Hela
                    Athkam, we provide a robust platform where your
                    craftsmanship can truly flourish. Your unique creations
                    deserve recognition, and we are here to ensure they find the
                    spotlight they deserve. We urge you not only to join us but
                    also to extend this invitation to fellow artisans in rural
                    areas. Let us unite to preserve the rich traditional
                    craftsmanship of Sri Lanka, ensuring it does not fade away.
                    Together, we can be the guardians of these age-old
                    techniques and stories woven into each creation. Take our
                    hand, and we'll guide you, clearing the path for a future
                    where the beauty of traditional craftsmanship continues to
                    captivate the world. Join Hela Athkam – where tradition
                    meets innovation, and artisans shape their destiny.
                  </p>
                  <p>
                    Are you a passionate local craft maker looking to showcase
                    your creations to a broader audience? At Hela Athkam, we
                    invite you to become a part of our vibrant community of
                    artisans. We celebrate the unique and diverse talents of
                    local independent craft makers, and we're dedicated to
                    providing a platform that amplifies your artistry.
                  </p>
                </Col>
              </Row>

              {/* request form to join */}
              <Row>
                <Col>
                  <Button
                    size="lg"
                    id="joinUsButton"
                    onClick={openRequestModal}
                  >
                    Join Us Here
                  </Button>
                  {/* renders the craftsmanrequest and passsing the two props. */}
                  <CraftsmanRequest
                    isRequestModalOpen={isRequestModalOpen}
                    closeRequestModal={closeRequestModal}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>

      {/* hela athkam image */}

      <Container id="joinUsImageSet">
        <Row className="justify-content-center">
          <Card.Img id="joinUsImg1" src="https://picsum.photos/200/300" />
          <Card.Img id="joinUsImg2" src="https://picsum.photos/200/300" />
          <Card.Img id="joinUsImg3" src="https://picsum.photos/200/300" />
          <Card.Img id="joinUsImg4" src="https://picsum.photos/200/300" />
        </Row>
      </Container>
    </>
  );
}

export default JoinUs;
