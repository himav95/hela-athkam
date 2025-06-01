import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { useAuth } from '../../../Asset/Script/AuthContext'; // Import useAuth hook
import '../../../Asset/Style/Helaathkam_Page.css';

const TopNav = () => {
  // GET USER DATA: Access user info from AuthContext
  const { user, logout, isAuthenticated, userName } = useAuth();

  // HANDLE LOGOUT: Clear user data and redirect
  const handleLogout = () => {
    logout();
    // Redirect to login page - adjust path as needed
    window.location.href = '/'; // or use navigate if you're using react-router
  };

  // HANDLE PASSWORD CHANGE: Navigate to password change page
  const handlePasswordChange = () => {
    // Navigate to password change page - adjust path as needed
    window.location.href = '/admin/change-password'; // Update this path
  };

  return (
    <Navbar
      sticky="top"
      style={{ backgroundColor: '#053B50', height: '50px' }}
    >
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
        title={isAuthenticated ? userName : "Admin"} // DYNAMIC TITLE: Shows actual user name
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