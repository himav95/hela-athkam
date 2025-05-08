import { Row, Col, Card } from 'react-bootstrap';
import { BarChart, ClipboardCheck, Bag, ChatDots  } from 'react-bootstrap-icons';

// import Hela athkam: Page css file here.
import '../../Asset/Style/Helaathkam_Page.css';

function Dashboard() {
  return (
    
      <Card className="mt-5" style={{ border: 'none' }}>
        <Card.Body>
          <Row className="mb-5">
            <Col style={{ textAlign: 'center' }}>
              <h3>Today</h3>
            </Col>
          </Row>

          <Row>
            <Col></Col>

            <Col>
              <Card id="filterCards1">
                <Row><Col> <BarChart /></Col></Row>
                <Row><Col>In-Progress Orders</Col></Row>
              </Card>
            </Col>

            <Col>
              <Card id="filterCards2">
                <Row><Col><ClipboardCheck /></Col></Row>
                <Row><Col>Completed Orders</Col></Row>
              </Card>
            </Col>

            <Col>
              <Card id="filterCards3">
                <Row><Col><Bag /></Col></Row>
                <Row><Col>To be Delivered</Col></Row>
              </Card>
            </Col>

            <Col>
              <Card id="filterCards4">
                <Row><Col><ChatDots /></Col></Row>
                <Row><Col>New Messages</Col></Row>
              </Card>
            </Col>

            <Col></Col>
          </Row>
        </Card.Body>
      </Card>
    
  );
}

export default Dashboard;
