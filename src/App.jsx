import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Contacto from './pages/Contacto';
import Productos from './pages/Productos';

function App() {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        <Header />
        <Container>
          <Routes>
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
