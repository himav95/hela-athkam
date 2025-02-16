import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import About from './Pages/About';
import Services from './Pages/Services';
import Products from './Pages/Products';
import OrderOnline from './Pages/OrderOnline';
import JoinUs from './Pages/JoinUs';
import Contact from './Pages/Contact';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import Login from './Forms/Login';
import SignUp from './Forms/SignUp';

function App() {
  // login and sign up forms modal state and function details.
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const openFormModal = () => setFormModalOpen(true);
  const closeFormModal = () => setFormModalOpen(false);
  return (
    <>
      <Header openFormModal={openFormModal} />
      {/* pass modal state and close function to the login component. */}
      <Login isModalOpen={isFormModalOpen} closeFormModal={closeFormModal} />

      {/* pass modal state and close function to the sign up component. */}
      <SignUp isModalOpen={isFormModalOpen} closeFormModal={closeFormModal} />

      {/* Header.jsx pages nav routing */}
      <BrowserRouter>
        <Container className="container-fluid vh-100" style={{ marginTop: 20 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/orderonline" element={<OrderOnline />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/joinus" element={<JoinUs />} />
            <Route path="/joinus" element={<JoinUs />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
