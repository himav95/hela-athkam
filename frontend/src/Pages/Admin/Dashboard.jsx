import React, { useState, useEffect } from 'react';
import '../../Asset/Style/Helaathkam_Page.css';
import { Row, Col, Card, Badge, Modal, Table, Button, Spinner, Alert } from 'react-bootstrap';
import {
  BarChart,
  ClipboardCheck,
  Bag,
  ChatDots,
  PersonPlus,
  Calendar3,
  ChevronLeft,
  ChevronRight
} from 'react-bootstrap-icons';
import useDashboardLogics from '../../Asset/Script/useDashboardLogics';


function Dashboard() {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    bulkOrders: { count: 0, change: 0 },
    customOrders: { count: 0, change: 0 },
    deliveries: { count: 0, change: 0 },
    makerRequests: { count: 0, change: 0 },
    messages: { count: 0, change: 0 }
  });

  // Track which cards have been checked (new items cleared)
  const [checkedCards, setCheckedCards] = useState({
    bulkOrders: false,
    customOrders: false,
    deliveries: false,
    makerRequests: false,
    messages: false
  });

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Hook for dashboard logic
  const {
    dashboardData: hookDashboardData,
    loading,
    error,
    getWeeklyBulkOrders,
    getWeeklyCustomOrders,
    getWeeklyMakerRequests,
    getWeeklyMessages
  } = useDashboardLogics();

  // Update dashboard data when hook data changes
  useEffect(() => {
    if (hookDashboardData) {
      setDashboardData(hookDashboardData);
    }
  }, [hookDashboardData]);

  // Function to handle modal opening and mark as checked
  const handleModalOpen = async (type, page = 1) => {
    // Don't open modal for deliveries - it's non-functional
    if (type === 'deliveries') {
      return;
    }

    // Mark this card as checked (clears the "new" count)
    setCheckedCards(prev => ({
      ...prev,
      [type]: true
    }));

    setModalType(type);
    setShowModal(true);
    setModalLoading(true);
    setModalError(null);

    try {
      let result;
      switch (type) {
        case 'bulkOrders':
          result = await getWeeklyBulkOrders(page);
          setModalData(result.orders || []);
          setPagination(result.pagination || {});
          break;
        case 'customOrders':
          result = await getWeeklyCustomOrders(page);
          setModalData(result.orders || []);
          setPagination(result.pagination || {});
          break;
        case 'makerRequests':
          result = await getWeeklyMakerRequests(page);
          setModalData(result.requests || []);
          setPagination(result.pagination || {});
          break;
        case 'messages':
          result = await getWeeklyMessages(page);
          setModalData(result.messages || []);
          setPagination(result.pagination || {});
          break;
        default:
          throw new Error('Invalid modal type');
      }
    } catch (error) {
      setModalError(error.message);
    } finally {
      setModalLoading(false);
    }
  };

  // Function to handle pagination
  const handlePageChange = (page) => {
    handleModalOpen(modalType, page);
  };

  // Function to render new items count (shows 0 if already checked)
  const renderNewCount = (change, cardType) => {
    const actualNewCount = checkedCards[cardType] ? 0 : change;

    if (actualNewCount > 0) {
      return (
        <span className="text-success d-flex align-items-center">
          +{actualNewCount} new
        </span>
      );
    }
    return (
      <span className="text-muted d-flex align-items-center">
        0 new
      </span>
    );
  };

  // Function to render metric card
  const MetricCard = ({ id, icon, title, count, change, badgeText, onClick, disabled = false, cardType }) => (
    <Card
      id={id}
      className={`dashboard-metric-card shadow-sm ${disabled ? 'disabled-card' : ''}`}
      onClick={disabled ? undefined : onClick}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.7 : 1 }}
    >
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="dashboard-icon-container">{icon}</div>
          {badgeText && (
            <Badge bg="light" text="dark" className="rounded-pill">
              {badgeText}
            </Badge>
          )}
        </div>
        <h4 className="mt-2 mb-1">{count}</h4>
        <div className="d-flex justify-content-between align-items-center">
          <div className="dashboard-card-title">{title}</div>
          <div className="dashboard-trend">{renderNewCount(change, cardType)}</div>
        </div>
      </Card.Body>
    </Card>
  );

  // Function to render table based on modal type
  const renderModalTable = () => {
    if (modalLoading) {
      return (
        <div className="text-center p-4">
          <Spinner animation="border" />
          <p className="mt-2">Loading data...</p>
        </div>
      );
    }

    if (modalError) {
      return (
        <Alert variant="danger">
          Error loading data: {modalError}
        </Alert>
      );
    }

    if (modalData.length === 0) {
      return (
        <Alert variant="info">
          No data available for this week.
        </Alert>
      );
    }

    switch (modalType) {
      case 'bulkOrders':
      case 'customOrders':
        return (
          <Table responsive striped hover>
            <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {modalData.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>
                  <div>
                    <strong>{order.customer_name}</strong>
                    <br />
                    <small className="text-muted">{order.customer_email}</small>
                  </div>
                </td>
                <td>{order.product_display}</td>
                <td>{order.quantity}</td>
                <td>Rs. {Number(order.total_amount || 0).toFixed(2)}</td>
                <td>
                  <Badge
                    bg={order.order_status === 'completed' ? 'success' : 'warning'}
                  >
                    {order.order_status}
                  </Badge>
                </td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            </tbody>
          </Table>
        );

      case 'makerRequests':
        return (
          <Table responsive striped hover>
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Product</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {modalData.map((request) => (
              <tr key={request.craftsman_id}>
                <td>{request.craftsman_id}</td>
                <td>
                  <div>
                    <strong>{request.name}</strong>
                    <br />
                    <small className="text-muted">{request.nic}</small>
                  </div>
                </td>
                <td>
                  <div>
                    {request.email !== 'N/A' && (
                      <>
                        <small>{request.email}</small>
                        <br />
                      </>
                    )}
                    <small>{request.phone}</small>
                  </div>
                </td>
                <td>{request.product_name}</td>
                <td>{request.product_category}</td>
                <td>
                  <Badge
                    bg={request.request_status === 'approved' ? 'success' : 'warning'}
                  >
                    {request.request_status}
                  </Badge>
                </td>
                <td>{new Date(request.request_date).toLocaleDateString()}</td>
              </tr>
            ))}
            </tbody>
          </Table>
        );

      case 'messages':
        return (
          <Table responsive striped hover>
            <thead>
            <tr>
              <th>ID</th>
              <th>From</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {modalData.map((message) => (
              <tr key={message.id}>
                <td>{message.id}</td>
                <td>
                  <div>
                    <strong>{message.name}</strong>
                    <br />
                    <small className="text-muted">{message.email}</small>
                  </div>
                </td>
                <td>{message.subject}</td>
                <td>
                  <div
                    style={{
                      maxWidth: '300px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                    title={message.message}
                  >
                    {message.message}
                  </div>
                </td>
                <td>{new Date(message.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            </tbody>
          </Table>
        );

      default:
        return <Alert variant="warning">Unknown data type</Alert>;
    }
  };

  // Function to get modal title
  const getModalTitle = () => {
    const titles = {
      bulkOrders: 'Weekly Bulk Orders',
      customOrders: 'Weekly Custom Orders',
      makerRequests: 'Weekly Maker Requests',
      messages: 'Weekly Messages'
    };
    return titles[modalType] || 'Weekly Data';
  };

  // Function to render pagination
  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    return (
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span className="text-muted">
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <div>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            className="me-2"
          >
            <ChevronLeft /> Previous
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next <ChevronRight />
          </Button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <Spinner animation="border" />
        <p className="mt-2">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error loading dashboard: {error}
      </Alert>
    );
  }

  return (
    <div className="dashboard-container">
      <Card className="dashboard-main-card shadow-sm">
        <Card.Body>
          <Row className="mb-4 align-items-center">
            <Col xs={12} md={6} className="text-md-start text-center">
              <h2 className="dashboard-title">Dashboard Overview</h2>
            </Col>
            <Col xs={12} md={6} className="text-md-end text-center">
              <div className="d-flex align-items-center justify-content-md-end justify-content-center">
                <Calendar3 className="me-2" />
                <span className="fw-medium">Today: {new Date().toLocaleDateString()}</span>
              </div>
            </Col>
          </Row>

          {/* First row with 3 cards */}
          <Row className="gx-4 mb-4">
            <Col xl={4} lg={4} md={6} sm={12} className="mb-4">
              <MetricCard
                id="filterCards1"
                icon={<BarChart size={24} />}
                title="Bulk Orders"
                count={dashboardData.bulkOrders.count}
                change={dashboardData.bulkOrders.change}
                badgeText="Total"
                onClick={() => handleModalOpen('bulkOrders')}
                cardType="bulkOrders"
              />
            </Col>

            <Col xl={4} lg={4} md={6} sm={12} className="mb-4">
              <MetricCard
                id="filterCards2"
                icon={<ClipboardCheck size={24} />}
                title="Custom Orders"
                count={dashboardData.customOrders.count}
                change={dashboardData.customOrders.change}
                badgeText="Total"
                onClick={() => handleModalOpen('customOrders')}
                cardType="customOrders"
              />
            </Col>

            <Col xl={4} lg={4} md={6} sm={12} className="mb-4">
              <MetricCard
                id="filterCards3"
                icon={<Bag size={24} />}
                title="Deliveries"
                count={dashboardData.deliveries.count}
                change={dashboardData.deliveries.change}
                badgeText="Total"
                onClick={() => handleModalOpen('deliveries')}
                cardType="deliveries"
              />
            </Col>
          </Row>

          {/* Second row with 2 cards centered */}
          <Row className="gx-4 justify-content-center">
            <Col xl={4} lg={4} md={6} sm={12} className="mb-4">
              <MetricCard
                id="filterCards4"
                icon={<PersonPlus size={24} />}
                title="Craft Maker Requests"
                count={dashboardData.makerRequests.count}
                change={dashboardData.makerRequests.change}
                badgeText="Total"
                onClick={() => handleModalOpen('makerRequests')}
                cardType="makerRequests"
              />
            </Col>

            <Col xl={4} lg={4} md={6} sm={12} className="mb-4">
              <MetricCard
                id="filterCards5"
                icon={<ChatDots size={24} />}
                title="Messages"
                count={dashboardData.messages.count}
                change={dashboardData.messages.change}
                badgeText="Total"
                onClick={() => handleModalOpen('messages')}
                cardType="messages"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Modal for displaying weekly data */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{getModalTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderModalTable()}
          {renderPagination()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;