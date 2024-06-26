import Header from './components/Header.js';
import Footer from './components/Footer.js';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen.js'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen.js';

function App() {
  return (
    <Router>
      <Header /> {/* Render Header outside of Routes */}
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/login' element={<LoginScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
