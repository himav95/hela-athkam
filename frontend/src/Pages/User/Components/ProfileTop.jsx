import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { PersonCircle, ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Asset/Script/AuthContext';
import ChangePasswordModal from '../../Components/ChangePasswordModal';
import '../../../Asset/Style/Helaathkam_Page.css';

const ProfileTop = () => {
  // navigation hook: for programmatic navigation
  const navigate = useNavigate();

  // State for password change modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // get user data: access user info from AuthContext
  const { user, logout, isAuthenticated, userName } = useAuth();

  // handle logout: clear user data and redirect
  const handleLogout = () => {
    logout();
    // navigate to home page after logout
    navigate('/');
  };

  // handle back to main site: navigate back to main site
  const handleBackToMainSite = () => {
    // navigate back to home page with main navbar
    navigate('/');
  };

  // handle password change: show modal
  const handlePasswordChange = () => {
    setShowPasswordModal(true);
  };

  return (
    <>
      <Navbar
        sticky="top"
        style={{ backgroundColor: '#053B50', height: '50px' }}
      >
        {/* back to main site button */}
        <Button
          variant="outline-light"
          size="sm"
          onClick={handleBackToMainSite}
          className="me-3"
          style={{ marginLeft: '15px' }}
        >
          <ArrowLeft className="me-1" />
          Back to Shop
        </Button>

        {/* brand/logo */}
        <Navbar.Brand style={{ color: 'white', paddingLeft: '15px' }}>
          <h4>Hela Athkam - Profile</h4>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            {/* user icon */}
            <PersonCircle
              style={{
                color: 'white',
                fontSize: '1.5rem',
                marginRight: '25px',
              }}
            />
          </Nav>
        </Navbar.Collapse>

        {/* user dropdown: shows user name and menu options */}
        <NavDropdown
          title={isAuthenticated ? userName : "User"} // dynamic title: shows actual user name
          id="basic-navbar-dropdown"
          menuVariant="light"
          align={'end'}
          style={{ marginRight: '30px', color: 'white' }}
        >
          {/* password change option */}
          <NavDropdown.Item onClick={handlePasswordChange}>
            Change Password
          </NavDropdown.Item>

          {/* divider */}
          <NavDropdown.Divider />

          {/* logout option */}
          <NavDropdown.Item onClick={handleLogout}>
            Log out
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar>

      {/* PASSWORD CHANGE MODAL */}
      <ChangePasswordModal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
      />
    </>
  );
};

export default ProfileTop;