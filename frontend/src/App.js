import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Products from "./Pages/Products";
import RequestOnline from "./Pages/RequestOnline";
import Contact from "./Pages/Contact";
import { Container } from "react-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";

function App() {
  return (
    <>
     <Navbar bg="light" expand="lg" className="" id="navbarMain"> 
      <Navbar.Brand>Hela Athkam</Navbar.Brand>
      <Container>
        {/* First row content */}
        {/* Second row content */}
      </Container>
      </Navbar>

    <BrowserRouter>
  
    <Header /> 
    

    <Container className="container-fluid vh-100" style={{marginTop:20}}>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/requestonline" element={<RequestOnline />} />
      </Routes>

    </Container>
    <Footer />
    </BrowserRouter>

    </>
  );
}

export default App;