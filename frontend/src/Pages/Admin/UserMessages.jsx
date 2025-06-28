import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Table, Pagination } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';

// Import page css file
import '../../Asset/Style/Helaathkam_Page.css';

function UserMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const itemsPerPage = 10;

  // Fetch messages from API
  const fetchMessages = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/get-messages?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(search)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();

      if (data.success) {
        setMessages(data.messages);
        setPagination(data.pagination);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch messages');
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Error loading messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load messages on component mount
  useEffect(() => {
    fetchMessages(currentPage, searchTerm);
  }, [currentPage]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchMessages(1, searchTerm);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle delete message
  const handleDeleteClick = (messageId) => {
    setSelectedMessageId(messageId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedMessageId) return;

    try {
      setDeleting(true);
      const response = await fetch(`/api/admin/delete-message/${selectedMessageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      const data = await response.json();

      if (data.success) {
        setShowDeleteConfirm(false);
        setSelectedMessageId(null);
        // Refresh the current page or go back if this was the last item
        if (messages.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
          fetchMessages(currentPage - 1, searchTerm);
        } else {
          fetchMessages(currentPage, searchTerm);
        }
      } else {
        setError(data.message || 'Failed to delete message');
      }
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Error deleting message. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedMessageId(null);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const { currentPage: current, totalPages } = pagination;

    if (totalPages <= 1) return items;

    // First and Previous buttons
    items.push(
      <Pagination.First
        key="first"
        disabled={current === 1}
        onClick={() => handlePageChange(1)}
      />
    );
    items.push(
      <Pagination.Prev
        key="prev"
        disabled={current === 1}
        onClick={() => handlePageChange(current - 1)}
      />
    );

    // Page numbers (show max 5 pages)
    let startPage = Math.max(1, current - 2);
    let endPage = Math.min(totalPages, current + 2);

    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 4);
      } else {
        startPage = Math.max(1, endPage - 4);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === current}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    // Next and Last buttons
    items.push(
      <Pagination.Next
        key="next"
        disabled={current === totalPages}
        onClick={() => handlePageChange(current + 1)}
      />
    );
    items.push(
      <Pagination.Last
        key="last"
        disabled={current === totalPages}
        onClick={() => handlePageChange(totalPages)}
      />
    );

    return items;
  };

  return (
    <>
      <Card className='mt-4'>
        <Card.Header style={{ backgroundColor: '#ebedef' }}>
          <Row className='mt-3'>
            <Col className='ms-3'>
              <h4>User Messages</h4>
            </Col>
          </Row>
          <Row className='mb-4'>
            <Form className='d-flex' onSubmit={handleSearch}>
              <Form.Control
                type='search'
                placeholder='Search by name or email...'
                aria-label='Search'
                className='me-3'
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button variant='outline-success' type="submit">
                Search
              </Button>
            </Form>
          </Row>
        </Card.Header>

        <Card.Body>
          {error && (
            <div className="alert alert-danger alert-dismissible" role="alert">
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError('')}
                aria-label="Close"
              ></button>
            </div>
          )}

          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <Table variant='light' striped bordered hover>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <tr key={message.id}>
                      <td>{message.id}</td>
                      <td>{message.name}</td>
                      <td>{message.email}</td>
                      <td>{message.subject}</td>
                      <td>
                        <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {message.message.length > 50
                            ? `${message.message.substring(0, 50)}...`
                            : message.message}
                        </div>
                      </td>
                      <td>{formatDate(message.created_at)}</td>
                      <td>
                        <Button
                          variant='outline-danger'
                          size="sm"
                          onClick={() => handleDeleteClick(message.id)}
                        >
                          <TrashFill />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      {searchTerm ? 'No messages found matching your search.' : 'No messages found.'}
                    </td>
                  </tr>
                )}
                </tbody>
              </Table>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <Row>
                  <Col></Col>
                  <Col>
                    <Pagination id='customPagination' size='sm' className='d-flex justify-content-center'>
                      {generatePaginationItems()}
                    </Pagination>
                  </Col>
                  <Col></Col>
                </Row>
              )}

              {/* Show pagination info */}
              {pagination.totalMessages > 0 && (
                <Row className="mt-3">
                  <Col className="text-center">
                    <small className="text-muted">
                      Showing {((pagination.currentPage - 1) * itemsPerPage) + 1} to {Math.min(pagination.currentPage * itemsPerPage, pagination.totalMessages)} of {pagination.totalMessages} messages
                    </small>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      {/* Simple Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelDelete}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this message?</p>
                <p className="text-danger">
                  <small>This action cannot be undone.</small>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserMessages;