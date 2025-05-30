import { Modal, Row, Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

// import Hela athkam: form css file here.
import '../Asset/Style/Helaathkam_Form.css';

function ProductDetails({
                          isProductDetailsOpen,    // Boolean to control modal visibility
                          closeProductDetails,     // Function to close the modal
                          productData,            // Selected product object from database
                        }) {
  return (
    // Main modal component with large size
    <Modal show={isProductDetailsOpen} onHide={closeProductDetails} size="lg" id="productDetailsModal">
      {/* Modal header with title and close button */}
      <Modal.Header closeButton id="productDetailsHeader">
        <Modal.Title>Product Details</Modal.Title>
      </Modal.Header>

      {/* Modal body containing product information */}
      <Modal.Body id="productDetailsBody">
        <Card border="success" id="productDetailsCard">
          {/* Product image with fallback if no image available */}
          <Card.Img
            variant="top"
            src={productData?.image || "https://picsum.photos/400/300"}
            className="product-image"
            alt={productData?.product_name || "Product Image"}
          />

          {/* Product basic information */}
          <Card.Body>
            {/* Product name - using database field 'product_name' */}
            <Card.Title className="product-title">{productData?.product_name}</Card.Title>
            {/* Product description */}
            <Card.Text className="product-description">{productData?.description}</Card.Text>

            {/* Additional product details in rows */}
            <div className="product-details-section">
              <Row className="product-detail-row">
                <Col><span className="detail-label">Category:</span> <span className="detail-value">{productData?.category}</span></Col>
              </Row>
              <Row className="product-detail-row">
                <Col><span className="detail-label">Stock Available:</span> <span className="detail-value">{productData?.stock} items</span></Col>
              </Row>
            </div>
          </Card.Body>

          {/* Footer with price and action buttons */}
          <Card.Footer id="productDetailsFooter">
            <Row className="align-items-center">
              {/* Price display */}
              <Col md={6}>
                <h4 className="product-price">Rs. {productData?.price}</h4>
              </Col>
              {/* Action buttons - Add to Cart and Buy Now */}
              <Col md={6} className="text-end">
                <Button
                  variant="outline-primary"
                  className="product-action-btn me-2"
                  id="addToCartBtn"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="primary"
                  className="product-action-btn"
                  id="buyNowBtn"
                >
                  Buy Now
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default ProductDetails;