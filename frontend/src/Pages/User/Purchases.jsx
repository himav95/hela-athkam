import {Row, Col, Card, Button, Form, Table, Pagination} from 'react-bootstrap';

// import Hela athkam: page css file here.
import '../../Asset/Style/Helaathkam_Page.css';

function User () {
    return (
        
        <Card className='mt-4'>
        <Card.Header style={{backgroundColor:'#ebedef'}}>
        <Row className='mt-3'><Col className='ms-3'><h4>My Purchases</h4></Col></Row>
        <Row className='mb-4'>  <Form className='d-flex'>
            <Form.Control
            type='search'
            placeholder='Search purchase order...'
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
                <th style={{verticalAlign:"middle", textAlign:"center", width:"8%"}}>Order ID</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"8%"}}>Date</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"20%"}}>Items</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"10%"}}>Quantity</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"10%"}}>Total Amount</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"10%"}}>Order Fullfillment</th>
              </tr>
              <tr>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
                <td style={{verticalAlign:"middle", textAlign:"center"}}></td>
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

export default User;