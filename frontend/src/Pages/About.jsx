import { Card, Row, Col } from 'react-bootstrap';

// import Hela athkam: Page css file here.
import '../Asset/Style/Helaathkam_Page.css';

function About() {
  return (
    <>
      {/* about page headings */}
      <Row className="mb-4">
        <Col></Col>
        <Col xs={10}>
          <h2 className="mb-2">
            Echoes of Tradition, Crafted for Tomorrow: Hela Athkam
          </h2>
          <h4 className="mb-5">
            Where Heritage Transcends Time, Passed Down for Generations to
            Cherish..
          </h4>
        </Col>
        <Col></Col>
      </Row>

      {/* about page content para */}
      <Row className="componentSpace">
        <Col></Col>
        <Col xs={10}>
          <Card id="aboutContentCard">
            <Row className="mb-3">
              <Col>
                <p>
                  Step into a world where artistry meets tradition, and
                  craftsmanship tells a story. Hela Athkam is not just a
                  handicraft shop; it's a celebration of heritage, creativity,
                  and the skilled hands that bring our exquisite pieces to life.
                </p>

                <p>
                  Discover a curated collection of handcrafted wonders that
                  reflect the traditional touch of Sri lankan culture. Each
                  piece is a testament to the passion and dedication of our
                  artisans, who pour their hearts into every creation. From
                  traditionally designed houseware, tableware to meticulously
                  designed bags, our shop is a treasure trove of unique and
                  timeless handicrafts.
                </p>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <p>
                  At Hela Athkam, we believe in the beauty of preserving age-old
                  techniques while embracing contemporary aesthetics. Our
                  mission is to connect you with the soulful essence of
                  craftsmanship, offering you not just products, but stories
                  woven with threads of tradition. Whether you are looking for a
                  special gift, a statement piece for your home, or simply want
                  to indulge in the joy of exploring exquisite craftsmanship,
                  Hela Athkam welcomes you with open arms. Join us on a journey
                  where every purchase supports the livelihoods of skilled
                  artisans and helps keep the flame of Sri Lankan traditional
                  craftsmanship alive.
                </p>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <p>
                  In the realm of traditional handicrafts, value extends far
                  beyond the tangible. Each piece crafted by skilled artisans
                  not only embodies cultural pride and heritage but also
                  contributes to environmental health. By choosing traditional
                  handicrafts, you are making a conscious decision to support
                  sustainable practices and reduce the environmental impact
                  associated with mass production. These timeless creations are
                  a testament to the enduring craftsmanship passed down through
                  generations, adding intrinsic value to your possessions. With
                  every purchase, you become a steward of tradition, fostering a
                  connection to cultural roots while promoting ethical and
                  eco-friendly choices. Embrace the richness of tradition,
                  uphold your cultural pride, and nurture environmental
                  well-being : all through these handicrafts, which toned and
                  woven with passion.
                </p>
                <p>
                  Thank you for choosing Hela Athkam : where every creation is a
                  masterpiece, and every purchase is a contribution to the
                  legacy of handmade excellence. Explore, experience, and
                  embrace the art of Hela Athkam.
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default About;
