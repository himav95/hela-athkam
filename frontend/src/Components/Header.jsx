import { Container, Nav, Navbar } from 'react-bootstrap';

function Header ({openFormModal}) {
    return(
    <>
        
    {/* Main navbar with name, sign up and login */}
    <Navbar bg="light" expand="lg" className="d-flex justify-content-between" id="main_Navbar"> 
        <Navbar.Brand><h1>Hela Athkam</h1></Navbar.Brand>
        <Nav>
            <Nav.Link className="mx-auto" onClick={openFormModal}>Sign Up</Nav.Link>
            <Nav.Link  className="mx-auto" onClick={openFormModal}>Login</Nav.Link>

        </Nav>
    </Navbar>
    {/* pages navbar with home/ about/ products/ services/ request online/ join us. */}
    <Navbar variant='dark' sticky='top' bg='primary' id='page_Navbar' className='mb-5'>
        <Container>
            <Nav className='justify-content-center' variant='pills' activeKey="/home">
                
                <Nav.Link className='me-5' href='/'>Home</Nav.Link>
                <Nav.Link className='mx-5' href='/about'>About</Nav.Link>
                <Nav.Link className='mx-5' href='/products'>Products</Nav.Link>
                <Nav.Link className='mx-5' href='/services'>Services</Nav.Link>
                <Nav.Link className='mx-5' href='/orderonline'>Order Online</Nav.Link>
                <Nav.Link className='mx-5' href='/contact'>Contact Us</Nav.Link>
                <Nav.Link className='mx-5' href='/joinus'>Join Us</Nav.Link>
                
            </Nav>
        </Container>
    </Navbar>
 
    </>
        
    )
}

export default Header;