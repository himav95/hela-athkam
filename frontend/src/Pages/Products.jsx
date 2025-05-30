import { Card, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import { useState, useEffect } from 'react';
import ProductDetails from '../Components/ProductDetails'; // import ProductDetails modal from Components.
import usePagination from '../Asset/Script/Hooks/usePagination'; // import pagination hook
import PaginationComponent from '../Components/PaginationComponent'; // import pagination component

// import Hela athkam: Page css file here.
import '../Asset/Style/Helaathkam_Page.css';

function Products() {
  // State for all products and filtered products
  const [allProducts, setAllProducts] = useState([]); // All products from database
  const [filteredProducts, setFilteredProducts] = useState([]); // Products after category filter
  const [selectedProduct, setSelectedProduct] = useState(null); // For product details modal
  const [selectedCategory, setSelectedCategory] = useState(''); // For category filter
  const [loading, setLoading] = useState(true);

  // Pagination hook - shows 6 products per page
  const paginationData = usePagination(filteredProducts, 6);

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Reset pagination when filtered products change
  useEffect(() => {
    paginationData.resetPagination();
  }, [filteredProducts]);

  // Fetch all products from database
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      const data = await response.json();
      console.log('Products fetched:', data);
      setAllProducts(data);
      setFilteredProducts(data); // Initially show all products
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category filter change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === '' || category === 'All') {
      // Show all products
      setFilteredProducts(allProducts);
    } else {
      // Filter products by category
      const filtered = allProducts.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  // ProductDetails modal functions
  const [isProductDetailsOpen, setProductDetailsOpen] = useState(false);

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setProductDetailsOpen(true);
  };

  const closeProductDetails = () => setProductDetailsOpen(false);

  // Loading state
  if (loading) {
    return <div className="text-center p-5">Loading products...</div>;
  }

  return (
    <>
      {/* Page title */}
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
          {/* Product category filter dropdown */}
          <Row className="justify-content-center mb-5">
            <Col xl={6}>
              <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                <option value="Houseware">Houseware</option>
                <option value="Kitchenware">Kitchenware</option>
                <option value="Tableware">Tableware</option>
                <option value="Bags">Bags</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Product cards - Display current page products */}
          <Row className="mb-5">
            {paginationData.currentItems.length > 0 ? (
              paginationData.currentItems.map((product) => (
                <Col key={product.product_id} md={4} className="mb-4">
                  <Card style={{ maxWidth: 250, margin: '0 auto' }}>
                    {/* Product image */}
                    <Card.Img
                      variant="top"
                      width={200}
                      height={200}
                      src={product.image || "https://picsum.photos/200/200"}
                      alt={product.product_name}
                    />
                    <Card.Body>
                      {/* Product name */}
                      <Card.Title>{product.product_name}</Card.Title>
                      <Card.Text>
                        <strong>Rs. {product.price}</strong><br />
                        <small className="text-muted">Stock: {product.stock}</small><br />
                        {/* More details link */}
                        <Card.Link
                          className="card-link-hover"
                          onClick={() => openProductDetails(product)}
                        >
                          More details
                        </Card.Link>
                      </Card.Text>

                      {/* Action buttons */}
                      <ButtonGroup style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button id='cartButton'>Add to Cart</Button>
                        <Button id='buyButton'>Buy</Button>
                      </ButtonGroup>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <div className="text-center">No products found for the selected category.</div>
              </Col>
            )}
          </Row>

          {/* ProductDetails Modal */}
          <ProductDetails
            isProductDetailsOpen={isProductDetailsOpen}
            closeProductDetails={closeProductDetails}
            productData={selectedProduct}
          />

          {/* Pagination component */}
          <Row>
            <Col></Col>
            <Col className="d-flex justify-content-center">
              <PaginationComponent
                paginationData={paginationData}
                size="sm"
                id="customPagination"
              />
            </Col>
            <Col></Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default Products;