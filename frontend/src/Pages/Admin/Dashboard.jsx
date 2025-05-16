import React, { useState } from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import {
  BarChart,
  ClipboardCheck,
  Bag,
  ChatDots,
  PersonPlus,
  Calendar3,
  ArrowUp,
  ArrowDown
} from 'react-bootstrap-icons';

// Import Helaathkam Page CSS file
import '../../Asset/Style/Helaathkam_Page.css';

// Import Helaathkam Page JS file
import useDashboardLogics from '../../Asset/Script/useDashboardLogics';

function Dashboard() {
  // Sample data - in a real app, these would come from props or API calls
  const [dashboardData] = useState({
    bulkOrders: { count: 12, change: 8 },
    customOrders: { count: 24, change: -3 },
    deliveries: { count: 18, change: 5 },
    makerRequests: { count: 7, change: 2 },
    messages: { count: 15, change: 10 }
  });

  const { getDashboardData } = useDashboardLogics();

  // Function to render trend indicator
  const renderTrend = (change) => {
    if (change > 0) {
      return (
        <span className="text-success d-flex align-items-center">
          <ArrowUp size={12} className="me-1" /> {change}%
        </span>
      );
    } else if (change < 0) {
      return (
        <span className="text-danger d-flex align-items-center">
          <ArrowDown size={12} className="me-1" /> {Math.abs(change)}%
        </span>
      );
    }
    return null;
  };

  // Function to render metric card
  const MetricCard = ({ id, icon, title, count, change, badgeText }) => (
    <Card
      id={id}
      className="dashboard-metric-card shadow-sm"
      onClick={() => console.log(`Navigating to ${title} section`)}
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
          <div className="dashboard-trend">{renderTrend(change)}</div>
        </div>
      </Card.Body>
    </Card>
  );

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

          <Row className="mb-4 gx-4">
            <Col lg={4} md={6} sm={12} className="mb-4">
              <MetricCard
                id="filterCards1"
                icon={<BarChart size={24} />}
                title="New Bulk Orders"
                count={dashboardData.bulkOrders.count}
                change={dashboardData.bulkOrders.change}
                badgeText="Today"
              />
            </Col>

            <Col lg={4} md={6} sm={12} className="mb-4">
              <MetricCard
                id="filterCards2"
                icon={<ClipboardCheck size={24} />}
                title="New Custom Orders"
                count={dashboardData.customOrders.count}
                change={dashboardData.customOrders.change}
                badgeText="Today"
              />
            </Col>

            <Col lg={4} md={6} sm={12} className="mb-4">
              <MetricCard
                id="filterCards3"
                icon={<Bag size={24} />}
                title="To be Delivered"
                count={dashboardData.deliveries.count}
                change={dashboardData.deliveries.change}
                badgeText="Pending"
              />
            </Col>
          </Row>

          <Row className="gx-4">
            <Col lg={4} md={6} sm={12} className="mb-4">
              <MetricCard
                id="filterCards4"
                icon={<PersonPlus size={24} />}
                title="Craft Maker Requests"
                count={dashboardData.makerRequests.count}
                change={dashboardData.makerRequests.change}
                badgeText="New"
              />
            </Col>

            <Col lg={4} md={6} sm={12} className="mb-4">
              <MetricCard
                id="filterCards4"
                icon={<ChatDots size={24} />}
                title="New Messages"
                count={dashboardData.messages.count}
                change={dashboardData.messages.change}
                badgeText="Unread"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Dashboard;