import { Modal, Row, Col, ToggleButtonGroup, ToggleButton  } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';


function ViewModal({ isViewModalopen, closeViewModal }) {

    const [approvalstatus, setApprovalStatus] = useState(null);

    const handleApprovalChange = (val) => {
        setApprovalStatus(val);
    };

    return (
        <Modal show={isViewModalopen} 
            onHide={closeViewModal}
            size='lg'
            backdrop='static'>
            <Modal.Header>
                <Modal.Title>More Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Row className='mb-5'>
                            <Col xs={5}><h6>Order Status</h6></Col>
                            <Col>
                            
                            <ToggleButtonGroup type='radio' name='approval' value={approvalstatus} onChange={handleApprovalChange}>

                                <ToggleButton id='approve'
                                              value={true}
                                              variant={approvalstatus === true ? 'success' : 'outline-success'}
                                              style={{width:'10rem'}}>Approved
                                </ToggleButton>

                                <ToggleButton id='reject' name='approval' value={false}
                                              variant={approvalstatus === false ? 'danger' : 'outline-danger'}
                                              style={{width:'10rem'}}>Rejected
                                </ToggleButton>

                            </ToggleButtonGroup>

                            </Col>
                        </Row>

                        <Row>
                            <Col><p>Advance Payment : </p> </Col>
                            <Col>Remaining Payment :</Col>
                        </Row>
                        <Row>
                            <Col>Full Payment Recieved :</Col>
                            <Col></Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={closeViewModal}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewModal;