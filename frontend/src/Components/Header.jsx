import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import '../Asset/Style/Header.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Asset/Script/AuthContext';

function Header({ openLoginModal, openSignModal }) {
  // Authentication data from context
  const { user, logout, isAuthenticated, userName, isAdmin } = useAuth();

  // Active link state for navigation highlighting
  const [activeLink, setActiveLink] = useState('/home');
  const location = useLocation();

  // Update active link based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    setActiveLink(currentPath === '/' ? '/home' : currentPath);
  }, [location.pathname]);

  // Handler for setting active link
  const handleLinkActive = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      {/* Main navigation bar with brand and user controls */}
      <Navbar
        bg="light"
        expand="lg"
        className="d-flex justify-content-between"
        id="mainNavbar"
      >
        <Container>
          {/* Brand/Logo */}
          <Navbar.Brand id="mainBrand">
            <h1>HELA ATHKAM</h1>
          </Navbar.Brand>

          {/* User controls section */}
          <Nav>
            {isAuthenticated ? (
              // Show different dropdowns based on user role
              isAdmin ? (
                /* ADMIN DROPDOWN - Only shows Dashboard and Logout */
                <Dropdown align="end" drop="down">
                  <Dropdown.Toggle
                    variant="link"
                    id="admin-dropdown"
                    className="user-profile-toggle d-flex align-items-center text-decoration-none"
                    style={{ marginRight: '10px' }}
                  >
                    <div className="user-avatar me-2">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <span className="user-name">Admin</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ right: '0px', left: 'auto' }}>
                    <Dropdown.Item href="/admin/dashboard">
                      <i className="fas fa-tachometer-alt me-2"></i>
                      Dashboard
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout}>
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                /* REGULAR USER DROPDOWN - Original options */
                <Dropdown align="end" drop="down">
                  <Dropdown.Toggle
                    variant="link"
                    id="user-dropdown"
                    className="user-profile-toggle d-flex align-items-center text-decoration-none"
                    style={{ marginRight: '10px' }}
                  >
                    <div className="user-avatar me-2">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="user-name">{userName}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ right: '0px', left: 'auto' }}>
                    <Dropdown.Item href="/user/userprofile">
                      <i className="fas fa-user me-2"></i>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="/user/purchases">
                      <i className="fas fa-shopping-bag me-2"></i>
                      My Orders
                    </Dropdown.Item>
                    <Dropdown.Item href="/user/userprofileedit">
                      <i className="fas fa-cog me-2"></i>
                      Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout}>
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )
            ) : (
              /* LOGIN/SIGNUP BUTTONS - When not authenticated */
              <>
                <Nav.Link className="mainNavlink signup-btn" onClick={openSignModal}>
                  <b>Sign Up</b>
                </Nav.Link>
                <Nav.Link className="mainNavlink login-btn" onClick={openLoginModal}>
                  <b>Login</b>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Secondary navigation bar with page links */}
      <Navbar sticky="top" id="pageNavBarOnly" className="pageNavBar">
        <Container className="justify-content-center">
          <Nav variant="pills" activeKey={activeLink}>
            <Nav.Link
              className="pageLink me-5"
              onClick={() => handleLinkActive('/home')}
              href="/"
            >
              Home
            </Nav.Link>
            <Nav.Link
              className="pageLink mx-5"
              onClick={() => handleLinkActive('/about')}
              href="/about"
            >
              About
            </Nav.Link>
            <Nav.Link
              className="pageLink mx-5"
              onClick={() => handleLinkActive('/products')}
              href="/products"
            >
              Products
            </Nav.Link>
            <Nav.Link
              className="pageLink mx-5"
              onClick={() => handleLinkActive('/services')}
              href="/services"
            >
              Services
            </Nav.Link>
            <Nav.Link
              className="pageLink mx-5"
              onClick={() => handleLinkActive('/orderonline')}
              href="/orderonline"
            >
              Order Online
            </Nav.Link>
            <Nav.Link
              className="pageLink mx-5"
              onClick={() => handleLinkActive('/contact')}
              href="/contact"
            >
              Contact Us
            </Nav.Link>
            <Nav.Link
              className="pageLink mx-5"
              onClick={() => handleLinkActive('/joinus')}
              href="/joinus"
            >
              Join Us
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;