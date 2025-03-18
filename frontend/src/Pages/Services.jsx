import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

// import Hela athkam: Page css file here.
import '../Asset/Style/Helaathkam_Page.css';

function Services() {
  return (
    <>
      <Row className="componentSpace">
        <Col></Col>
        <Col xs={10}>
          <h1>Here at Hela Athkam,</h1>
        </Col>
        <Col></Col>
      </Row>

      <Row className="mb-5">
        <Col></Col>
        <Col xs={10}>
          {/* Basic Order service content */}
          <Card className="serviceCardz">
            <Row>
              <Col xs={3}>
                <Image
                  className="serviceImgz"
                  src="https://picsum.photos/id/237/200/300"
                  rounded
                />
              </Col>

              <Col xs={9}>
                <p className="serviceHeadings">Normal Orders</p>
                <p>
                  Simplify your shopping experience with our Normal Order
                  service. Choose from our carefully curated collection, place
                  your order effortlessly, and let us handle the rest. Each
                  handcrafted item undergoes meticulous packaging and is
                  delivered to your doorstep with the utmost care. Enjoy the
                  simplicity of selecting from our range, knowing that the
                  quality and craftsmanship are paramount.
                </p>
              </Col>
            </Row>
          </Card>

          {/* Special edition order service content */}
          <Card className="serviceCardz">
            <Row>
              <Col xs={3}>
                <Image
                  className="serviceImgz"
                  src="https://picsum.photos/id/237/200/300"
                  rounded
                />
              </Col>

              <Col xs={9}>
                <p className="serviceHeadings">Special Editions</p>
                <p>
                  Explore opulence with our Special Editions, showcasing
                  meticulously crafted pieces that boast unique designs and the
                  finest materials. These limited-edition items are not only
                  exquisite but also a demonstration of our commitment to
                  offering you a truly distinctive and refined selection. From
                  intricate detailing to premium finishes, each Special Edition
                  piece is a testament to the craftsmanship that sets Hela
                  Athkam apart.
                </p>
              </Col>
            </Row>
          </Card>

          {/* Customization order service content */}
          <Card className="serviceCardz">
            <Row>
              <Col xs={3}>
                <Image
                  className="serviceImgz"
                  src="https://picsum.photos/id/237/200/300"
                  rounded
                />
              </Col>

              <Col xs={9}>
                <p className="serviceHeadings">Custom Requests</p>
                <p>
                  Personalize your experience with our Custom Request service.
                  Engage directly with our skilled artisans to translate your
                  vision into a tangible masterpiece. Whether it's a bespoke
                  design, specific materials, or a personalized touch, our
                  artisans are ready to collaborate with you. Each custom
                  creation is a unique reflection of your style, making it an
                  artful addition to your space.
                </p>
              </Col>
            </Row>
          </Card>

          {/* Online Payment service content */}
          <Card className="serviceCardz">
            <Row>
              <Col xs={3}>
                <Image
                  className="serviceImgz"
                  src="https://picsum.photos/id/237/200/300"
                  rounded
                />
              </Col>

              <Col xs={9}>
                <p className="serviceHeadings">Online Payment</p>
                <p>
                  Streamline your transactions with our secure Online Payment
                  option. Shop confidently, knowing that your payments are
                  processed safely and efficiently online. Each online
                  transaction is a seamless experience, providing you with the
                  assurance that your purchases are handled with the utmost
                  security.
                </p>
              </Col>
            </Row>
          </Card>

          {/* Citywide Delivery service content */}
          <Card className="serviceCardz">
            <Row>
              <Col xs={3}>
                <Image
                  className="serviceImgz"
                  src="https://picsum.photos/id/237/200/300"
                  rounded
                />
              </Col>

              <Col xs={9}>
                <p className="serviceHeadings">Citywide Delivery</p>
                <p>
                  Experience the convenience of Citywide Delivery. Whether
                  you're in the heart of the city or its outskirts, our delivery
                  service ensures the secure and timely arrival of your chosen
                  handicrafts. Each piece is carefully packaged to preserve its
                  integrity during transit, allowing you to relish the joy of
                  unboxing your selected treasures in the comfort of your home.
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col></Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h5>For Local Independent Handicraft Makers,</h5>
        </Col>
      </Row>

      {/* special service offer for craftsman */}
      <Row>
        <Col>
          {/* To Join Hela athkam service content */}
          <Card className="serviceCardz">
            <Row>
              <Col xs={3}>
                <Image
                  className="serviceImgz"
                  src="https://picsum.photos/id/237/200/300"
                  rounded
                />
              </Col>

              <Col xs={9}>
                <p className="serviceHeadings">Join hands with Hela Athkam</p>
                <p>
                  Joining Hela Athkam means gaining access to a wider audience
                  eager to appreciate and acquire handcrafted treasures. Our
                  platform is designed to highlight the individuality of your
                  creations, offering a space where your craftsmanship can
                  shine. We prioritize collaboration, ensuring that your story
                  and skills are woven into the fabric of our collective
                  narrative.
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Services;
