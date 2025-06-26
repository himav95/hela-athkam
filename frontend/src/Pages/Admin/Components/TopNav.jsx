import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { PersonCircle, ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom'; // Added useNavigate
import { useAuth } from '../../../Asset/Script/AuthContext';
import '../../../Asset/Style/Helaathkam_Page.css';

const TopNav = () => {
  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // GET USER DATA: Access user info from AuthContext
  const { user, logout, isAuthenticated, userName } = useAuth();

  // HANDLE BACK TO SHOP: Navigate to main site
  const handleBackToShop = () => {
    navigate('/');
  };

  // HANDLE LOGOUT: Clear user data and redirect
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // HANDLE PASSWORD CHANGE: Navigate to password change page
  const handlePasswordChange = () => {
    navigate('/admin/change-password');
  };

  return (
    <Navbar
      sticky="top"
      style={{ backgroundColor: '#053B50', height: '50px' }}
    >
      {/* BACK TO SHOP BUTTON */}
      <Button
        variant="outline-light"
        size="sm"
        onClick={handleBackToShop}
        className="me-3"
        style={{ marginLeft: '15px' }}
      >
        <ArrowLeft className="me-1" />
        Back to Shop
      </Button>

      {/* BRAND/LOGO */}
      <Navbar.Brand style={{ color: 'white', paddingLeft: '15px' }}>
        <h4>Hela Athkam</h4>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex align-items-center">
          {/* USER ICON */}
          <PersonCircle
            style={{
              color: 'white',
              fontSize: '1.5rem',
              marginRight: '25px',
            }}
          />
        </Nav>
      </Navbar.Collapse>

      {/* USER DROPDOWN: Shows user name and menu options */}
      <NavDropdown
        title={isAuthenticated ? userName : "Admin"}
        id="basic-navbar-dropdown"
        menuVariant="light"
        align={'end'}
        style={{ marginRight: '30px', color: 'white' }}
      >
        {/* PASSWORD CHANGE OPTION */}
        <NavDropdown.Item onClick={handlePasswordChange}>
          Change Password
        </NavDropdown.Item>

        {/* DIVIDER */}
        <NavDropdown.Divider />

        {/* LOGOUT OPTION */}
        <NavDropdown.Item onClick={handleLogout}>
          Log out
        </NavDropdown.Item>
      </NavDropdown>
    </Navbar>
  );
};

export default TopNav;