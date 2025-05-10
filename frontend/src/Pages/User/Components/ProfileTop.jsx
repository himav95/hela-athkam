import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';

// import Hela athkam page css  here.
import '../../../Asset/Style/Helaathkam_Page.css';

const ProfileTop = () => {
  return (
    
      <Navbar
        sticky="top"
        style={{ backgroundColor: '#053B50', height: '50px' }}
      >
        <Navbar.Brand style={{ color: 'white', paddingLeft: '15px' }}>
          <h4>Hela Athkam</h4>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <PersonCircle
              style={{
                color: 'white',
                fontSize: '1.5rem',
                marginRight: '25px',
              }}
            />
          </Nav>
        </Navbar.Collapse>

        <NavDropdown
          title="User"
          id="basic-navbar-dropdown"
          menuVariant="light"
          align={'end'}
          style={{ marginRight: '30px', color: 'white' }}
        >
          <NavDropdown.Item href="#action/1">change Password</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/4">Log out</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    
  );
};

export default ProfileTop;
