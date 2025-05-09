import {Row, Col, Card, Button, Form, Table, Pagination} from 'react-bootstrap';
import { PencilSquare, TrashFill, PlusLg, PauseCircle } from 'react-bootstrap-icons';

// import Hela athkam: page css file here.
import '../../Asset/Style/Helaathkam_Page.css';

function CraftMaker (){
    return (
        
        <Card className='mt-4'>
        <Card.Header style={{backgroundColor:'#ebedef'}}>
        <Row className='mt-3'><Col className='ms-3'><h4>Craft Maker</h4></Col></Row>
        <Row className='mb-4'>  <Form className='d-flex'>
            <Form.Control
            type='search'
            placeholder='Search for craft maker...'
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
                <th style={{verticalAlign:"middle", textAlign:"center", width:"6%"}}>Craftsman ID</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"10%"}}>Name</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"7%"}}>Type</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"7%"}}>NIC</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"7%"}}>Phone</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"10%"}}>Email</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"10%"}}>Address</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"8%"}}>Specialization</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"6%"}}>Status</th>
                <th style={{verticalAlign:"middle", textAlign:"center", width:"15%"}}>Action</th>
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

export default CraftMaker;