import {Row, Col, Card, Button, Form, Table, Pagination} from 'react-bootstrap';
import { PencilSquare, TrashFill, InfoLg } from 'react-bootstrap-icons';

// import Hela athkam: page css file here.
import '../../Asset/Style/Helaathkam_Page.css';

function OrderBulk () {
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
          <Table variant='light' striped bordered hover>
            <thead>
              <tr>
                <th>NID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Product Category</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Delivery Date</th>
                <th>Price</th>
                <th>Pickup/Delivery</th>
                <th>Modify</th>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <Button variant='outline-info' className='ms-2'><InfoLg /></Button>
                  <Button variant='outline-warning' className='ms-2'><PencilSquare /></Button>
                  <Button variant='outline-danger' className='ms-2'><TrashFill /></Button>
                </td>
              </tr>
            </thead>
          </Table>

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

