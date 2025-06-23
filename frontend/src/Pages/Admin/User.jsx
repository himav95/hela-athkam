import {Row, Col, Card, Button, Form, Table, Pagination, Badge} from 'react-bootstrap';
import { PencilSquare, TrashFill, InfoLg, PlusLg, Eye } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import adminOrderService from "../../Services/adminOrderService";
import '../../Asset/Style/Helaathkam_Page.css';

function User() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch users with pagination (later check usePagination for this).
  const fetchUsers = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const response = await adminOrderService.getUsers({
        page: page,
        limit: 10,
        search: search
      });

      console.log('API Response:', response);

      if (response.success && response.users) {
        setUsers(response.users);
        setFilteredUsers(response.users);

        // Update pagination info
        if (response.pagination) {
          setCurrentPage(response.pagination.currentPage);
          setTotalPages(response.pagination.totalPages);
          setTotalUsers(response.pagination.totalUsers);
        }
      } else if (response.data) {
        // Fallback if response structure is different
        setUsers(response.data);
        setFilteredUsers(response.data);
      } else {
        setUsers([]);
        setFilteredUsers([]);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1, '');
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminOrderService.deleteUser(userId);
        // Refresh users after deletion
        await fetchUsers(currentPage, searchTerm);
        alert('User deleted successfully!');
      } catch (err) {
        console.error('Failed to delete user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const handleEdit = (userId) => {
    // navigate to edit form; one used in userprofile
    alert(`Edit user functionality - User ID: ${userId}`);
    // Example: navigate('/admin/users/edit/' + userId);
  };

  const handleView = async (userId) => {
    try {
      const response = await adminOrderService.getUserDetails(userId);
      if (response.success && response.user) {
        // Create a formatted display of user details
        const userDetails = `
User Details:
ID: ${response.user.id}
Name: ${response.user.name}
Email: ${response.user.email}
Phone: ${response.user.phone || 'N/A'}
Address: ${response.user.address || 'N/A'}
Role: ${response.user.role}
Created: ${new Date(response.user.created_at).toLocaleString()}
Updated: ${new Date(response.user.updated_at).toLocaleString()}
        `;
        alert(userDetails);
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
      alert('Failed to fetch user details.');
    }
  };

  const handleAddNew = () => {
    // navigation logic here
    alert('Add New User functionality - implement navigation here');
    // navigate('/admin/users/add_new'); this is ex. don't just uncomment this.
  };

  // Search functionality - uses API search
  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchUsers(1, searchTerm);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If search is empty, fetch all users
    if (value === '') {
      fetchUsers(1, '');
    }
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    fetchUsers(page, searchTerm);
  };

  // Generate pagination items
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

  if (loading) return <div className="text-center mt-4">Loading users...</div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    // tables view/style is different with bulk and custom. choose one.
    <Card className='mt-4'>
      <Card.Header style={{ backgroundColor: '#ebedef' }}>
        <Row className='mt-3'>
          <Col className='ms-3'>
            <h4>All Users ({totalUsers})</h4>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Form className='d-flex' onSubmit={handleSearch}>
            <Form.Control
              type='search'
              placeholder='Search for user...'
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
              <PlusLg /> Add New
            </Button>
          </Col>
        </Row>

        <Table variant='light' striped bordered hover responsive>
          <thead>
          <tr>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "8%" }}>User ID</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "15%" }}>Name</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "20%" }}>Email</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "12%" }}>Phone</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "10%" }}>Role</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "12%" }}>Created At</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "12%" }}>Updated At</th>
            <th style={{ verticalAlign: "middle", textAlign: "center", width: "15%" }}>Action</th>
          </tr>
          </thead>
          <tbody>
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id || user.user_id}>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {user.id || user.user_id}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {user.name}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {user.email}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {user.phone || 'N/A'}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  <Badge bg={user.role === 'admin' ? 'danger' : 'primary'}>
                    {user.role || 'User'}
                  </Badge>
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  <Button
                    variant='outline-info'
                    size='sm'
                    className='ms-1'
                    onClick={() => handleView(user.id || user.user_id)}
                    title="View Details"
                  >
                    <Eye />
                  </Button>
                  <Button
                    variant='outline-warning'
                    size='sm'
                    className='ms-1'
                    onClick={() => handleEdit(user.id || user.user_id)}
                    title="Edit User"
                  >
                    <PencilSquare />
                  </Button>
                  <Button
                    variant='outline-danger'
                    size='sm'
                    className='ms-1'
                    onClick={() => handleDelete(user.id || user.user_id)}
                    title="Delete User"
                  >
                    <TrashFill />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                {searchTerm ? 'No users found matching your search' : 'No users found'}
              </td>
            </tr>
          )}
          </tbody>
        </Table>

        {/* Pagination but try using usePagination for all the tables later. */}
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

        {/* Show current page info */}
        <Row className="mt-3">
          <Col className="text-center">
            <small className="text-muted">
              Page {currentPage} of {totalPages} - Showing {filteredUsers.length} of {totalUsers} users
            </small>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default User;