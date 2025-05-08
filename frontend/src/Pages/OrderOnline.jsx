import { useState } from 'react';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';

// import forms here.
import NormalOrder from '../Forms/NormalOrder';
import CustomOrder from '../Forms/CustomOrder';

// import Hela athkam: form css file here.
import '../Asset/Style/Helaathkam_Form.css';

// import Hela athkam: page css file here.
import '../Asset/Style/Helaathkam_Page.css';

function OrderOnline() {
  // Normal and Custom order, state and function details.
  const [isNormalModalOpen, setNormalModalOpen] = useState(false);
  const [isCustomModalOpen, setCustomModalOpen] = useState(false);

  const openNormalModal = () => setNormalModalOpen(true);
  const closeNormalModal = () => setNormalModalOpen(false);

  const openCustomModal = () => setCustomModalOpen(true);
  const closeCustomModal = () => setCustomModalOpen(false);

  return (
    <>
      <h3 className="mb-5 ms-3">Place Your Order...</h3>
      
      <Container id="orderContainer">
        {/* Bulk order */}
        <Row className="mb-2">
                <Col>
                  <Card id="bulkCard">
                    <Row className='mt-4'> 
                      <Col></Col>
                      <Col xs={10}>
                        {/* Inner content of Bulk order area */}
                        <Row className="mb-3">
                          <h4>Bulk Order</h4>
                        </Row>

                        {/* Bulk order: Inner content */}
                        <Row className="mb-3">
                          <Col>
                            <p>
                              Describe what you have in mind: size adjustments,
                              Color variations, or material choices. We can
                              tailor, existing products to individual
                              preferences.
                            </p>
                          </Col>
                        </Row>
                      </Col>
                      <Col></Col>
                    </Row>

                    {/* Bulk order button */}
                    <Card.Footer id="bulkCardFooter" className="mb-2">
                      <Row className="ms-4">
                        <Button id="bulkButton" onClick={openNormalModal}>
                          Bulk Order
                        </Button>
                        <NormalOrder
                          isNormalModalOpen={isNormalModalOpen}
                          closeNormalModal={closeNormalModal}
                        />
                      </Row>
                    </Card.Footer>
                  </Card>
                </Col>

                <Col>
                  <Card id="customCard">
                    <Row className="mt-4">
                      <Col></Col>
                      <Col xs={10}>
                        {/*card titles */}
                        <Row className="mb-3">
                          <h4>Customization</h4>
                        </Row>

                        {/* customization: inner content  */}
                        <Row className="mb-3">
                          <Col>
                            {' '}
                            <p>
                              You might want something entirely different than
                              what we already have; Tell us what you want.
                              Describe what you have in mind. Tailor-made
                              product, just for you..
                            </p>
                          </Col>
                        </Row>
                      </Col>
                      <Col></Col>
                    </Row>

                    {/* Custom request button */}
                    <Card.Footer id="customCardFooter" className="mb-2">
                      <Row className="ms-4">
                        <Button
                          id="customOrderButton"
                          onClick={openCustomModal}
                        >
                          Custom Request
                        </Button>
                        <CustomOrder
                          isCustomModalOpen={isCustomModalOpen}
                          closeCustomModal={closeCustomModal}
                        />
                      </Row>
                    </Card.Footer>
                  </Card>
                </Col>
        </Row>

      </Container>
    </>
  );
}

export default OrderOnline;
