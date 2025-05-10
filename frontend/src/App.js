import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Importing necessary components and pages
import Header from './Components/Header';
import Footer from './Components/Footer';

// User components
import Home from './Pages/Home';
import About from './Pages/About';
import Services from './Pages/Services';
import Products from './Pages/Products';
import OrderOnline from './Pages/OrderOnline';
import JoinUs from './Pages/JoinUs';
import Contact from './Pages/Contact';
import { Container, Row, Col } from 'react-bootstrap';

// login components
import Login from './Forms/Login';
import SignUp from './Forms/SignUp';

// Admin components
import Dashboard from './Pages/Admin/Dashboard';
import OrderBulk from './Pages/Admin/OrderBulk';
import OrderCustom from './Pages/Admin/OrderCustom';
import TopNav from './Pages/Admin/Components/TopNav';
import SideNav from './Pages/Admin/Components/SideNav';
import CraftMaker from './Pages/Admin/CraftMaker';
import CraftMakerRequest from './Pages/Admin/CraftMakerRequest';
import Product from './Pages/Admin/Product';
import User from './Pages/Admin/User';
import UserMessages from './Pages/Admin/UserMessages';

// User Profile Components
import UserProfile from './Pages/User/UserProfile';
import ProfileTop from './Pages/User/Components/ProfileTop';
import ProfileSide from './Pages/User/Components/ProfileSide';
import Purchases from './Pages/User/Purchases';
import UserProfileEdit from './Pages/User/UserProfileEdit';

function App() {
  // login and sign up forms modal state and function details.
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignModalOpen, setSignModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setSignModalOpen(false); // Ensure only one modal open at a time. (Login)
  };

  const closeLoginModal = () => setLoginModalOpen(false);

  const openSignModal = () => {
    setSignModalOpen(true);
    setLoginModalOpen(false); // Ensure only one modal open at a time. (Sign Up)
  };

  const closeSignModal = () => setSignModalOpen(false);

  const Layout = ({ children }) => {
    return (
      <>
        <Header openLoginModal={openLoginModal} openSignModal={openSignModal} />
        <Container className="container-fluid" style={{ marginTop: 20 }}>
          {children}
        </Container>
        <Footer />
      </>
    );
  };


  const AdminLayout = ({ children }) => {
    return (
      <>
        <TopNav />
        <Row style={{ margin: 0, height: 'calc(100vh - 50px)' }}>
          <Col xs={2} style={{backgroundColor: '#d6dbdf'}}>
            <SideNav />
          </Col>
          <Col xs={10}>{children}</Col>
        </Row>
      </>
    );
  };


  const UserProfileLayout = ({ children }) => {
    return (
      <>
      <ProfileTop />
      <Row style={{ margin:0 , height: 'calc(100vh - 50px)'}}>
        <Col xs={2} style={{backgroundColor: '#d6dbdf'}}>
        <ProfileSide />
        </Col>
        <Col xs={10}>{children}</Col>
      </Row>
      </>
    );
  };

  return (
    <>
      {/* BrowserRouter/ Router; problem occured. instead of wrapping only the Routes container whole app had to be wrapped in. */}
      <BrowserRouter>
        {/* sign and login modal */}

        {/* pass modal state and close function to the login component. */}
        <Login
          isModalOpen={isLoginModalOpen}
          closeLoginModal={closeLoginModal}
          openSignModal={() => {
            closeLoginModal(); 
            openSignModal();
          }}
        />

        {/* pass modal state and close function to the sign up component. */}
        <SignUp 
          isModalOpen={isSignModalOpen} 
          closeSignModal={closeSignModal}
          openLoginModal={() => {
            closeSignModal();
            openLoginModal();
          }}
        />

        {/* Header.jsx pages nav routing */}
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/products"
            element={
              <Layout>
                <Products />
              </Layout>
            }
          />
          <Route
            path="/services"
            element={
              <Layout>
                <Services />
              </Layout>
            }
          />
          <Route
            path="/orderonline"
            element={
              <Layout>
                <OrderOnline />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/joinus"
            element={
              <Layout>
                <JoinUs />
              </Layout>
            }
          />


        {/* admin dashboard routes. */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/craftmaker"
            element={
              <AdminLayout>
                <CraftMaker />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/craftmakerrequest"
            element={
              <AdminLayout>
                <CraftMakerRequest />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/product"
            element={
              <AdminLayout>
                <Product />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/user"
            element={
              <AdminLayout>
                <User />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/orderbulk"
            element={
              <AdminLayout>
                <OrderBulk />
              </AdminLayout>
            }
          />

          <Route
            path='/admin/ordercustom'
            element={
              <AdminLayout>
                <OrderCustom />
              </AdminLayout>
            }
          />

          <Route 
            path="/admin/usermessages"
            element={
              <AdminLayout>
                <UserMessages />
              </AdminLayout>
            }
          />


          {/* User Profile Routes */}

          <Route
          path="/user/userprofile"
          element={
            <UserProfileLayout>
              <UserProfile />
            </UserProfileLayout>
          }
          />

          <Route
          path="/user/purchases"
          element={
            <UserProfileLayout>
              <Purchases />
            </UserProfileLayout>
          }
          />

          <Route
          path="/user/userprofileedit"
          element={
            <UserProfileLayout>
              <UserProfileEdit />
            </UserProfileLayout>
          }
          />
          

        </Routes>
      </BrowserRouter>
    </>
  );
}



export default App;
