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
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignModalOpen, setSignModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openSignModal = () => setSignModalOpen(true);
  const closeSignModal = () => setSignModalOpen(false);

  return (
    <>
      {/* sign and login modal */}
      <Header openLoginModal={openLoginModal} openSignModal={openSignModal}/>

      {/* pass modal state and close function to the login component. */}
      <Login isModalOpen={isLoginModalOpen} closeLoginModal={closeLoginModal} />

      {/* pass modal state and close function to the sign up component. */}
      <SignUp isModalOpen={isSignModalOpen} closeSignModal={closeSignModal} />

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
