import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    
    <Container className="container-fluid vh-100" style={{marginTop:20}}>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </Container>
    <Footer />
    </BrowserRouter>
    
    </>
  );
}

export default App;
