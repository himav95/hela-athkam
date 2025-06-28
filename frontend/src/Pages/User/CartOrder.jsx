import { Row, Col, Card, Button, Table, Pagination, Form } from 'react-bootstrap';
// import Hela athkam: page css file here.
import '../../Asset/Style/Helaathkam_Page.css';
import { PauseCircle, PencilSquare, PlusLg, TrashFill } from 'react-bootstrap-icons';


function CartOrder () {
  return (

    <Card className='mt-4'>
      <Card.Header style={{backgroundColor:'#ebedef'}}>
        <Row className='mt-3'><Col className='ms-3'><h4>Cart Order</h4></Col></Row>
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
            <th style={{verticalAlign:"middle", textAlign:"center", width:"6%"}}>Order ID</th>
            <th style={{verticalAlign:"middle", textAlign:"center", width:"10%"}}>Product(Product name + product id combination should be the value here)</th>
            <th style={{verticalAlign:"middle", textAlign:"center", width:"7%"}}>Unit Price</th>
            <th style={{verticalAlign:"middle", textAlign:"center", width:"7%"}}>Quantity (should check with the stock can show on red if stock is not enough)</th>
            <th style={{verticalAlign:"middle", textAlign:"center", width:"7%"}}>Total Amount</th>
            <th style={{verticalAlign:"middle", textAlign:"center", width:"10%"}}>Email</th>
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
            <td style={{verticalAlign:"middle", textAlign:"center"}}>
              <Button variant='outline-secondary' className='ms-2'><PauseCircle /></Button>
              <Button variant='outline-warning' className='ms-2'><PencilSquare /></Button>
              <Button variant='outline-danger' className='ms-2'><TrashFill />Remove</Button>
            </td>
          </tr>
          </thead>
        </Table>

        buttons for edit the table data,  and "Procced for Payment" for finalize order. Proceed to Payment should trigger Cart order details Modal; with side by side with more fields radio buttons for delivery option. if marked delivery; show the address in user profile, if not; show enable input form control to add the address. confirm button should be there and also a " back to cart"

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
            </Pagination> // Pagination for the table is needed for not for cart order
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>
    </Card>
  )
}