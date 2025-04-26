import { Modal, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

// import Hela athkam: form css file here.
import '../Asset/Style/Helaathkam_Form.css';

function ProductDetails({
  isProductDetailsOpen,
  closeProductDetails,
  productData,
}) {
  return (
    
      <Modal show={isProductDetailsOpen} onHide={closeProductDetails}>
        <Card border="success">
          <Card.Img variant="top" src={productData?.imageURL}></Card.Img>
          <Card.Body>
            <Card.Title>{productData?.name}</Card.Title>
            <Card.Text>{productData?.description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Row><Col>Price: {productData?.price}</Col></Row>
          </Card.Footer>
        </Card>
      </Modal>
    
  );
}

export default ProductDetails;
