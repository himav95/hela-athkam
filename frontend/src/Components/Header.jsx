import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
// import my css file here.
import '../Asset/Style/Header.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Asset/Script/AuthContext';

function Header({ openLoginModal, openSignModal }) {
  // Get authentication data from AuthContext
  const { user, logout, isAuthenticated, userName } = useAuth();

  // Section active link navigation.
  const [activeLink, setActiveLink] = useState('/home');
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath === '/' || currentPath === '') {
      setActiveLink('/home');
    } else {
      setActiveLink(currentPath);
    }
  }, [location.pathname]);

  const handleLinkActive = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      {/* Main navbar with name, sign up and login */}
      <Navbar
        bg="light"
        expand="lg"
        className="d-flex justify-content-between"
        id="mainNavbar"
      >
        <Container>
          <Navbar.Brand id="mainBrand">
            <h1>HELA ATHKAM</h1>
          </Navbar.Brand>
          <Nav>
            {isAuthenticated ? (
              // Show profile section when logged in
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
                  <span className="user-name">
                    {userName}
                  </span>
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
            ) : (
              // Show login/signup buttons when not logged in
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

      {/* pages navbar with home/ about/ products/ services/ request online/ join us. */}
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