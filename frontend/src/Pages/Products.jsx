import { Card, Row, Col, Button, ButtonGroup, Pagination } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import { useState, useEffect } from 'react';
import ProductDetails from '../Components/ProductDetails'; // import ProductDetails modal from Components.

// import Hela athkam: Page css file here.
import '../Asset/Style/Helaathkam_Page.css';

function Products() {
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    // fetch data from the database.

    fetch('/api/products/1') // erase after: should replace this with my api endpoint.
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error('Error fetching product data: ' + error));
  }, []);

  // productDetails modal open and close options.
  const [isProductDetailsOpen, setProductDetailsOpen] = useState(false);

  const openProductDetails = () => setProductDetailsOpen(true);
  const closeProductDetails = () => setProductDetailsOpen(false);

  // product payment function details are here.
  // const handlePaymentClick = async () => {
  //     try {
  //         // sending request to backend to initiate payment process.
  //         const response = await fetch('/api/payments/initiate-payement', {
  //             method: 'POST',
  //             headers: {
  //                 'content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({ amount:1000,})
  //         });

  //         if (response.ok) {
  //             const { paymentUrl } = await response.json();
  //             // redirect user to the payHere payment page.
  //             window.location.href = paymentUrl;
  //         } else {
  //             conslole.error('Failed to initiate payment');
  //         }
  //     } catch (error) {
  //         console.error('Error initiating payment:', error);
  //     }
  // };


  // pagination handlers are here.

  return (
    <>
      <Row className="mb-5">
        <Col></Col>
        <Col xs={6} md={5}>
          <h4>Hela Athkam Handicrafts - Just for you</h4>
        </Col>
        <Col></Col>
      </Row>
      {/* Main card content in product page */}
      <Card className="componentSpace" id="productsContain">
        <Card.Body>
          {/* Product category select */}
          <Row className="justify-content-center mb-5">
            <Col xl={6}>
              <Form.Select>
                <option>Houseware</option>
                <option>Kitchenware</option>
                <option>Tableware</option>
                <option>Bags</option>
                <option>Other</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Product card set row 1 */}
          <Row className="mb-5">
            {/* Product card 1 */}
            <Col>
              <Card width={200} height={300} style={{ maxWidth: 250 }}>
                <Card.Img
                  variant="top"
                  width={200}
                  height={200}
                  src="https://picsum.photos/200/200"
                />
                <Card.Body>
                  <Card.Title>Product 1</Card.Title>

                  <Card.Text>
                    <Card.Link onClick={openProductDetails}>
                      More details
                    </Card.Link>
                  </Card.Text>

                  {/* renderes productdetails and passing the two props.  */}
                  <ProductDetails
                    isProductDetailsOpen={isProductDetailsOpen}
                    closeProductDetails={closeProductDetails}
                    productData={productData}
                  />
                  <ButtonGroup
                    style={{ display: 'flex', justifyContent: 'center'}}
                  >
                    {/* <Button variant="success" onClick={handlePaymentClick}>Buy Now</Button> */}
                    <Button id='cartButton'>Add to Cart</Button>
                    <Button id='buyButton'>Buy</Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col></Col>
            <Col>

            {/* product pagination here. */}

            <Pagination id='customPagination' size='sm'>
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
    </>
  );
}

export default Products;
