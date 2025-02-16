import Carousel from 'react-bootstrap/Carousel';
import { Row, Col } from 'react-bootstrap';
import Image14 from '../Asset/Images/Image14.jpg';
import Image17 from '../Asset/Images/Image17.jpg';
import Image16 from '../Asset/Images/Image16.jpg';
import Image18 from '../Asset/Images/Image18.jpg';
import Image15 from '../Asset/Images/Image15.jpg';
import Image22 from '../Asset/Images/Image22.jpg';

// import Hela athkam: Page css file here.
import '../Asset/Style/Helaathkam_Page.css';
// import Hela athkam: Form css file here.
import '../Asset/Style/Helaathkam_Form.css';

function Home() {
  return (
    <div>
      <div className="backgroundImageContainer">
        {/* Home page background image content is here. */}

        {/* Mini image block content is here. */}
        <div>
          <Row className="rowMargin">
            <Col></Col>
            <Col>
              <h6>Houseware</h6>
              <div>
                <img className="imageFirst" src={`${Image16}`} alt="Image16" />
              </div>
            </Col>

            <Col>
              <h6>Kitchenware</h6>
              <div>
                <img className="imageFirst" src={`${Image14}`} alt="Image14" />
              </div>
            </Col>

            <Col>
              <h6>Tableware</h6>
              <div>
                <img className="imageFirst" src={`${Image18}`} alt="Image18" />
              </div>
            </Col>

            <Col>
              <h6>Accessories</h6>
              <div>
                <img className="imageFirst" src={`${Image17}`} alt="Image17" />
              </div>
            </Col>
            <Col></Col>
          </Row>

          {/* Home page welcome paragraph content is here. */}
          <Row className="rowMargin">
            <Col></Col>
            <Col className="col-lg-6">
              <h5 style={{ fontFamily: 'Arial sans-serif' }}>
                Welcome to Hela Athkam, where craftsmanship meets curated
                elegance! Immerse yourself in a world of handcrafted wonders
                that blend tradition with contemporary allure. Our pieces are
                more than just products—they are a celebration of heritage and a
                testament to the skilled artisans behind each creation.
              </h5>
            </Col>
            <Col></Col>
          </Row>

          {/* Carousel block and its side paragraph content is here. */}
          <Row className="rowMargin">
            <Col></Col>

            {/* Carousel block content. */}
            <Col className="">
              <Carousel id="carouselBlock" fade>
                <Carousel.Item interval={4500}>
                  <img
                    className="carousellg"
                    src={`${Image22}`}
                    alt="Image22"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={4500}>
                  <img
                    className="carousellg"
                    src={`${Image15}`}
                    alt="Image15"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>

            {/* carousel block side paragraph content. */}
            <Col className="">
              <h5>
                Diverse range of handicrafted essentials, Elegant decoratives to
                adorn your home or work place, Practical essentials enhance
                functionality, or thoughtful gifts to loved ones. Explore and
                discover what matches your taste..
              </h5>
            </Col>
            <Col></Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Home;
