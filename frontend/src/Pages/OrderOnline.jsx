import { Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';


import { useState } from 'react';
import NormalOrder from '../Forms/NormalOrder';
import CustomOrder from '../Forms/CustomOrder';

function OrderOnline () {
    // Normal and Custom order, state and function details.
    const [isNormalModalOpen, setNormalModalOpen] = useState(false);
    const [isCustomModalOpen, setCustomModalOpen] = useState(false);
    const openNormalModal = () => setNormalModalOpen(true);
    const closeNormalModal = () => setNormalModalOpen(false);
    const openCustomModal = () => setCustomModalOpen(true);
    const closeCustomModal = () => setCustomModalOpen(false);
    return (
        <>

        <h3 className='mb-5'>Place a product order...</h3>
        <p></p>

      
       
                        
                        <Row className='justify-content-center'>
                            <Col xs={2}>
                                
                                <Button onClick={openNormalModal}>Order Request Form</Button>
                                <NormalOrder isNormalModalOpen={isNormalModalOpen} closeNormalModal={closeNormalModal} />
                            </Col>
                        </Row>
                                
                        <Row>
                            <Col xl={4}><p className='text-muted'><i>Delivery Only Within the City.</i></p></Col>
                        </Row>
                
            

                
         


                        <Row className='justify-content-center'>
                            <Col xl={2}>
                                <Button onClick={openCustomModal}>Order Request Form</Button>
                                <CustomOrder isCustomModalOpen={isCustomModalOpen} closeCustomModal={closeCustomModal} />
                            </Col>
                        </Row>
             


       

       </>

    )
}

export default OrderOnline;