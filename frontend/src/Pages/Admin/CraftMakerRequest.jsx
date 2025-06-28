// craftmaker request view table contents are here. (admin dashboard; craftmaker request table)
import { useState, useEffect } from 'react';
import { Card, Table, Button, Badge, Form, Row, Col, Pagination, Alert, Spinner, Modal } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill, TrashFill, EyeFill } from 'react-bootstrap-icons';
import requestService from '../../Services/requestService';
import '../../Asset/Style/Helaathkam_Page.css';

function CraftMakerRequest() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const itemsPerPage = 10;

  // Modal for viewing details
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch applications with pagination
  const loadApplications = async (page = 1, search = '') => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = {
        page,
        limit: itemsPerPage
      };

      // Only add search if it's not empty
      if (search && search.trim() !== '') {
        queryParams.search = search.trim();
      }

      const response = await requestService.getCraftmakerApplications(queryParams);

      if (response.success) {
        setRequests(response.applications || []);
        setFilteredRequests(response.applications || []);

        // Update pagination info
        if (response.pagination) {
          setCurrentPage(response.pagination.currentPage);
          setTotalPages(response.pagination.totalPages);
          setTotalApplications(response.pagination.totalApplications);
        }
      } else {
        throw new Error(response.message || 'Failed to fetch applications');
      }
    } catch (err) {
      console.error('Error loading applications:', err);
      setError(err.message || 'Failed to load applications');
      setRequests([]);
      setFilteredRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadApplications(1, searchTerm);
  }, []);

  // Handle status updates
  const handleStatusUpdate = async (id, status) => {
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);

    if (window.confirm(`Are you sure you want to ${status} this application?`)) {
      try {
        setActionLoading(`${status}-${id}`);
        setError(null);

        const response = await requestService.updateApplicationStatus(id, status);

        if (response.success) {
          setSuccess(`Application ${status}d successfully!`);
          // Refresh current page with current search
          await loadApplications(currentPage, searchTerm);

          // Clear success message after 3 seconds
          setTimeout(() => setSuccess(null), 3000);
        } else {
          throw new Error(response.message || `Failed to ${status} application`);
        }
      } catch (err) {
        console.error(`Error ${status}ing application:`, err);
        setError(`Failed to ${status} application: ${err.message}`);
      } finally {
        setActionLoading(null);
      }
    }
  };

  // Handle deletion
  const handleDelete = async (id) => {
    if (window.confirm('⚠️ This will permanently delete the application and all associated files. This action cannot be undone. Continue?')) {
      try {
        setActionLoading(`delete-${id}`);
        setError(null);

        const response = await requestService.deleteCraftmakerApplication(id);

        if (response.success) {
          setSuccess('Application deleted successfully!');

          // If on the last page and it becomes empty, go to previous page
          const remainingItems = requests.length - 1;
          const newPage = remainingItems === 0 && currentPage > 1 ? currentPage - 1 : currentPage;

          await loadApplications(newPage, searchTerm);

          // Clear success message after 3 seconds
          setTimeout(() => setSuccess(null), 3000);
        } else {
          throw new Error(response.message || 'Failed to delete application');
        }
      } catch (err) {
        console.error('Error deleting application:', err);
        setError(`Deletion failed: ${err.message}`);
      } finally {
        setActionLoading(null);
      }
    }
  };

  // Handle search - only search by NIC and email
  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    await loadApplications(1, searchTerm);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If search is empty, fetch all applications
    if (value === '') {
      loadApplications(1, '');
    }
  };

  // Handle pagination
  const handlePageChange = async (page) => {
    if (page >= 1 && page <= totalPages) {
      await loadApplications(page, searchTerm);
    }
  };

  // View application details
  const viewApplicationDetails = async (id) => {
    try {
      setActionLoading(`view-${id}`);
      const response = await requestService.getCraftmakerApplicationById(id);

      if (response.success) {
        setSelectedRequest(response.application);
        setShowModal(true);
      } else {
        throw new Error(response.message || 'Failed to fetch application details');
      }
    } catch (err) {
      console.error('Error fetching application details:', err);
      setError(`Failed to load application details: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const variants = {
      pending: 'warning',
      approved: 'success',
      rejected: 'danger'
    };
    return <Badge bg={variants[status]} className="text-capitalize">{status}</Badge>;
  };

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Generate pagination items - matching User.jsx style
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    return items;
  };

  if (loading) return <div className="text-center mt-4">Loading applications...</div>;
  if (error && !success) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <>
      <Card className='mt-4'>
        <Card.Header style={{ backgroundColor: '#ebedef' }}>
          <Row className='mt-3'>
            <Col className='ms-3'>
              <h4>Craft Maker Applications ({totalApplications})</h4>
            </Col>
          </Row>
          <Row className='mb-4'>
            <Form className='d-flex' onSubmit={handleSearch}>
              <Form.Control
                type='search'
                placeholder='Search by NIC or email...'
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
          {/* Alerts */}
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)} className="mb-3">
              <i className="fas fa-exclamation-triangle me-2"></i>{error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" dismissible onClose={() => setSuccess(null)} className="mb-3">
              <i className="fas fa-check-circle me-2"></i>{success}
            </Alert>
          )}

          {/* Applications Table */}
          <Table variant='light' striped bordered hover responsive>
            <thead>
            <tr>
              <th style={{ verticalAlign: "middle", textAlign: "center", width: "6%" }}>ID</th>
              <th style={{ verticalAlign: "middle", textAlign: "center", width: "15%" }}>Name</th>
              <th style={{ verticalAlign: "middle", textAlign: "center", width: "12%" }}>NIC</th>
              <th style={{ verticalAlign: "middle", textAlign: "center", width: "15%" }}>Email</th>
              <th style={{ verticalAlign: "middle", textAlign: "center", width: "12%" }}>Product</th>
              <th style={{ verticalAlign: "middle", textAlign: "center", width: "10%" }}>Category</th>
              <th style={{ verticalAlign: "middle", textAlign: "center", width: "8%" }}>Status</th>
              <th style={{ verticalAlign: "middle", textAlign: "center", width: "10%" }}>Date</th>
              <th style={{ verticalAlign: "middle", textAlign: "center", width: "12%" }}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {filteredRequests && filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <tr key={req.craftsman_id}>
                  <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                    <strong>#{req.craftsman_id}</strong>
                  </td>
                  <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                    {req.name}
                  </td>
                  <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                    <code>{req.nic}</code>
                  </td>
                  <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                    {req.email || 'N/A'}
                  </td>
                  <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                    <div className="text-truncate" style={{maxWidth: '120px'}} title={req.product_name}>
                      {req.product_name}
                    </div>
                  </td>
                  <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                    <Badge bg="info" className="text-capitalize">
                      {req.product_category}
                    </Badge>
                  </td>
                  <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                    <StatusBadge status={req.request_status} />
                  </td>
                  <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                    <small>{new Date(req.request_date).toLocaleDateString()}</small>
                  </td>
                  <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                    {/* View Details Button */}
                    <Button
                      variant='outline-info'
                      size='sm'
                      className='ms-1'
                      onClick={() => viewApplicationDetails(req.craftsman_id)}
                      disabled={actionLoading === `view-${req.craftsman_id}`}
                      title="View Details"
                    >
                      {actionLoading === `view-${req.craftsman_id}` ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <EyeFill />
                      )}
                    </Button>

                    {/* Approve Button */}
                    <Button
                      variant='outline-success'
                      size='sm'
                      className='ms-1'
                      onClick={() => handleStatusUpdate(req.craftsman_id, 'approved')}
                      disabled={req.request_status === 'approved' || actionLoading === `approved-${req.craftsman_id}`}
                      title="Approve Application"
                    >
                      {actionLoading === `approved-${req.craftsman_id}` ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <CheckCircleFill />
                      )}
                    </Button>

                    {/* Reject Button */}
                    <Button
                      variant='outline-danger'
                      size='sm'
                      className='ms-1'
                      onClick={() => handleStatusUpdate(req.craftsman_id, 'rejected')}
                      disabled={req.request_status === 'rejected' || actionLoading === `rejected-${req.craftsman_id}`}
                      title="Reject Application"
                    >
                      {actionLoading === `rejected-${req.craftsman_id}` ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <XCircleFill />
                      )}
                    </Button>

                    {/* Delete Button */}
                    <Button
                      variant='outline-dark'
                      size='sm'
                      className='ms-1'
                      onClick={() => handleDelete(req.craftsman_id)}
                      disabled={actionLoading === `delete-${req.craftsman_id}`}
                      title="Delete Application"
                    >
                      {actionLoading === `delete-${req.craftsman_id}` ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <TrashFill />
                      )}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  {searchTerm ? 'No applications found matching your search' : 'No applications found'}
                </td>
              </tr>
            )}
            </tbody>
          </Table>

          {/* Pagination - matching User.jsx style */}
          {totalPages > 1 && (
            <Row>
              <Col></Col>
              <Col>
                <Pagination id='customPagination' size='sm' className='d-flex justify-content-center'>
                  <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />

                  {renderPaginationItems()}

                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </Col>
              <Col></Col>
            </Row>
          )}

          {/* Show current page info - matching User.jsx style */}
          <Row className="mt-3">
            <Col className="text-center">
              <small className="text-muted">
                Page {currentPage} of {totalPages} - Showing {filteredRequests.length} of {totalApplications} applications
              </small>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Application Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <Row>
              <Col md={6}>
                <h6>Personal Information</h6>
                <p><strong>Name:</strong> {selectedRequest.name}</p>
                <p><strong>NIC:</strong> {selectedRequest.nic}</p>
                <p><strong>Email:</strong> {selectedRequest.email || 'Not provided'}</p>
                <p><strong>Phone:</strong> {selectedRequest.phone}</p>
                <p><strong>Address:</strong> {selectedRequest.address}</p>
              </Col>
              <Col md={6}>
                <h6>Product Information</h6>
                <p><strong>Product:</strong> {selectedRequest.product_name}</p>
                <p><strong>Category:</strong>
                  <Badge bg="info" className="ms-2 text-capitalize">
                    {selectedRequest.product_category}
                  </Badge>
                </p>
                <p><strong>Description:</strong> {selectedRequest.description || 'No description provided'}</p>
                <p><strong>Status:</strong> <StatusBadge status={selectedRequest.request_status} /></p>
                <p><strong>Submitted:</strong> {formatDate(selectedRequest.request_date)}</p>
              </Col>
              {selectedRequest.product_images && selectedRequest.product_images.length > 0 && (
                <Col md={12}>
                  <h6>Product Images</h6>
                  <div className="d-flex gap-2 flex-wrap">
                    {selectedRequest.product_images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="img-thumbnail"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    ))}
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CraftMakerRequest;