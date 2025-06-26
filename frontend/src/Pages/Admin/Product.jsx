import { Row, Col, Card, Button, Form, Table, Pagination, Badge, Image } from 'react-bootstrap';
import { PencilSquare, TrashFill, PlusLg, Eye } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import adminOrderService from "../../Services/adminOrderService";
import '../../Asset/Style/Helaathkam_Page.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await adminOrderService.getProducts({
          page: 1,
          limit: 10
        });

        // same as OrderBulk
        if (response.success && response.products) {
          setProducts(response.products);
          setFilteredProducts(response.products);
        } else if (response.data) {
          // Fallback if response structure is different
          setProducts(response.data);
          setFilteredProducts(response.data);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await adminOrderService.deleteProduct(productId);
      // Refresh products after deletion
      const response = await adminOrderService.getProducts({ page: 1, limit: 10 });
      if (response.success && response.products) {
        setProducts(response.products);
        setFilteredProducts(response.products);
      } else if (response.data) {
        setProducts(response.data);
        setFilteredProducts(response.data);
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const handleEdit = (productId) => {
    // Add edit logic here
    alert(`Edit product functionality - Product ID: ${productId}`);
  };

  const handleView = (product) => {
    // Add view logic here
    alert('View product details: ' + JSON.stringify(product, null, 2));
  };

  const handleAddNew = () => {
    // Add navigation logic here
    alert('Add New Product functionality - implement navigation here');
  };

  // Search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = products.filter(product =>
      product.product_id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.craftsman_id && product.craftsman_id.toString().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If search is empty, show all products
    if (value === '') {
      setFilteredProducts(products);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: 'success',
      inactive: 'secondary',
      'out-of-stock': 'danger',
      'low-stock': 'warning'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className='mt-4'>
      <Card.Header style={{ backgroundColor: '#ebedef' }}>
        <Row className='mt-3'>
          <Col className='ms-3'>
            <h4>All Products</h4>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Form className='d-flex' onSubmit={handleSearch}>
            <Form.Control
              type='search'
              placeholder='Search for product...'
              aria-label='Search'
              className='me-3'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button variant='outline-success' type="submit">Search</Button>
          </Form>
        </Row>
      </Card.Header>

      <Card.Body>
        <Row className='mb-3'>
          <Col className='d-flex justify-content-end'>
            <Button variant='outline-primary' onClick={handleAddNew}>
              <PlusLg /> Add Product
            </Button>
          </Col>
        </Row>

        <Table variant='light' striped bordered hover responsive>
          <thead>
          <tr>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "6%" }}>Product ID</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "10%" }}>Image</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "10%" }}>Product Name</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "7%" }}>Category</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "7%" }}>Craftsman ID</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "6%" }}>Price</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "7%" }}>Stock</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "7%" }}>Status</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "10%" }}>Action</th>
          </tr>
          </thead>
          <tbody>
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.product_id}>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {product.product_id}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {product.product_image ? (
                    <Image
                      src={product.product_image}
                      alt={product.product_name}
                      width="50"
                      height="50"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '50px', height: '50px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      No Image
                    </div>
                  )}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {product.product_name}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {product.category || 'N/A'}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {product.craftsman_id || 'N/A'}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  ${product.price || '0.00'}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {product.stock_quantity || 0}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {getStatusBadge(product.status || 'active')}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  <Button
                    variant='outline-info'
                    size='sm'
                    className='ms-1'
                    onClick={() => handleView(product)}
                  >
                    <Eye />
                  </Button>
                  <Button
                    variant='outline-warning'
                    size='sm'
                    className='ms-1'
                    onClick={() => handleEdit(product.product_id)}
                  >
                    <PencilSquare />
                  </Button>
                  <Button
                    variant='outline-danger'
                    size='sm'
                    className='ms-1'
                    onClick={() => handleDelete(product.product_id)}
                  >
                    <TrashFill />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                No products found
              </td>
            </tr>
          )}
          </tbody>
        </Table>

        <Row>
          <Col></Col>
          <Col>
            {/* btw try using the usePagination for this */}
            <Pagination id='customPagination' size='sm' className='d-flex justify-content-center'>
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

export default Product;