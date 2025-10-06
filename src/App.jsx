import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Navegation from './components/Navegation/Navegation';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Contacto from './pages/Contacto';
import Productos from './pages/Productos/Productos';

function App() {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        <Header />
        <Navegation />
        <Container className="flex-grow-1">
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/productos' element={ <Productos /> } />
            <Route path='/contacto' element={ <Contacto /> } />
          </Routes>
        </Container> 
        <Footer />
      </div>
    </Router>
  )
}

export default App
