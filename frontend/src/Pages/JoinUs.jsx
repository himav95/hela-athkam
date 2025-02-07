import Card from 'react-bootstrap/Card';
import {Row, Col, Button} from 'react-bootstrap';
import CraftsmanRequest from '../Forms/CraftsmanRequest';
import { useState } from 'react';
function JoinUs () {
    // Craftsmen request form, state and function details.
    const [isRequestModalOpen, setRequestModalOpen] = useState(false);
    const openRequestModal = () => setRequestModalOpen(true);
    const closeRequestModal = () => setRequestModalOpen(false);
    return (
        
        <>
        
        <h1 className="mb-4">Join With Us..</h1>
        <Card>
            <Card.Body>
                <Row>
                </Row>
                {/* request form to join */}
                <Row>
                    <Col></Col>
                    <Col>
                        <Button variant='outline-warning' size='lg' onClick={openRequestModal}>Request</Button>
                        <CraftsmanRequest isRequestModalOpen={isRequestModalOpen} closeRequestModal={closeRequestModal}/>
                    </Col>
                    <Col></Col>
                </Row>
            </Card.Body>
        </Card>

        </>
    )

}

export default JoinUs;