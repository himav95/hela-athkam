import { Container, Nav, Navbar } from 'react-bootstrap';
// import my css file here.
import '../Asset/Style/Header.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Header({ openLoginModal, openSignModal }) {
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
            <Nav.Link className="mainNavlink" onClick={openSignModal}>
              <b>Sign Up</b>
            </Nav.Link>
            <Nav.Link className="mainNavlink" onClick={openLoginModal}>
              <b>Login</b>
            </Nav.Link>
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
