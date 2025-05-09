import {Row, Col, Card, Button, Form, Table, Pagination} from 'react-bootstrap';
import { PencilSquare, TrashFill, Check2Circle, XCircle, Eye, PlusLg } from 'react-bootstrap-icons';
import { useState } from 'react';
import ViewModal from './Components/ViewModal';

// import Hela athkam: page css file here.
import '../../Asset/Style/Helaathkam_Page.css';


function OrderBulk () {

  const [isViewModalopen, setViewModalOpen] = useState(false);

  const openViewModal = () => setViewModalOpen(true);
  const closeViewModal = () => setViewModalOpen(false);


    return(
        
       <Card className='mt-4'>
        <Card.Header style={{backgroundColor:'#ebedef'}}>
        <Row className='mt-3'><Col className='ms-3'><h4>Product Order : BUlk</h4></Col></Row>
        <Row className='mb-4'>  <Form className='d-flex'>
            <Form.Control
            type='search'
            placeholder='Search for order...'
            aria-label='Search'
            className='me-3'
            />
            <Button variant='outline-success'>Search</Button>
          </Form></Row>
        </Card.Header>

        <Card.Body>
          <Row className='mb-3'>
            <Col className='justify-content-end'>
              <Button variant='outline-primary'><PlusLg /> Add New</Button>
            </Col>
          </Row>

          <Table variant='light' striped bordered hover>
            <thead>
              <tr>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"6%"}}>OID</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"11%"}}>Customer Name</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"6%"}}>phone</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"11%"}}>Email</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"7%"}}>Product Category</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"9%"}}>Product Name</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"6%"}}>Quantity</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"6%"}}>Total Amount</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"6%"}}>Delivery Date</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"6%"}}>Delivery Type</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"20%"}}>Actions</th>
              </tr>
              <tr>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}>
                  <Button variant='outline-success' className='ms-1'><Check2Circle /></Button>
                  <Button variant='outline-secondary' className='ms-1'><XCircle /></Button>
                  <Button variant='outline-info' className='ms-1' onClick={openViewModal}><Eye /></Button>
                  <Button variant='outline-warning' className='ms-1' ><PencilSquare /></Button>
                  <Button variant='outline-danger' className='ms-1 me-1'><TrashFill /></Button>
                </td>
              </tr>
            </thead>
          </Table>

          <ViewModal isViewModalopen={isViewModalopen} closeViewModal={closeViewModal} />

          <Row>
          <Col></Col>
          <Col>
          <Pagination id='customPagination' size='sm' className='d-flex justify-content'>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
          </Pagination>
          </Col>
          <Col></Col>
          </Row>
        </Card.Body>
      </Card>
        
    );
}

export default OrderBulk;

