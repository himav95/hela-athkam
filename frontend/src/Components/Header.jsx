import { Container, Nav, Navbar } from 'react-bootstrap' ;
function Header () {
    return(
        
        
        <Navbar variant='dark' sticky='top' bg='primary'>
            <Container>
                <Navbar.Brand href='/'>Hela Athkam</Navbar.Brand>
                <Nav variant='pills'>
                    <Nav.Link href='/'>Home</Nav.Link>
                    <Nav.Link href='/about'>About</Nav.Link>
                    <Nav.Link href='/contact'>Contact</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        
    )
}
export default Header