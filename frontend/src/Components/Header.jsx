import { Container, Nav, Navbar } from 'react-bootstrap' ;

function Header () {
    return(
        

        <Navbar variant='dark' sticky='top' bg='primary'>
            <Container>
            

                
                
                <Nav className='d-flex justify-content-center' variant='pills'>
                    <Nav.Link className='me-5' href='/'>Home</Nav.Link>
                    <Nav.Link className='mx-5' href='/about'>About</Nav.Link>
                    <Nav.Link className='mx-5' href='/contact'>Contact</Nav.Link>
                    <Nav.Link className='mx-5' href='/services'>Services</Nav.Link>
                    <Nav.Link className='mx-5' href='/products'>Products</Nav.Link>
                    <Nav.Link className='mx-5' href='/requestonline'>Request Online</Nav.Link>
                    
                </Nav>

            </Container>
        </Navbar>

        
    )
}

export default Header;