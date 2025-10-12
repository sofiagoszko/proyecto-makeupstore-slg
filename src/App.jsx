import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Navegation from './components/Navegation/Navegation';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Contacto from './pages/Contacto/Contacto';
import Productos from './pages/Productos/Productos';
import Login from './pages/Login/Login';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        <Header />
        <Navegation />
        <Container className="flex-grow-1">
          <Routes>
            <Route path='/login' element={ <Login /> } />
            <Route path='/' element={ <Home /> } />
            <Route path='/productos' element={ <Productos /> } />
            <Route path='/productos/:categoria' element={ <Productos /> } />
            <Route path='/contacto' element={ <Contacto /> } />
          </Routes>
        </Container> 
        <Footer />
      </div>
    </Router>
  )
}

export default App
