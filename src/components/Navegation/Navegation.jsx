import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './Navegation.css';

export default function Navegation() {
    return (
        <Navbar className='navbar navbar-dark' expand='md'>
            <Container>
                <Navbar.Brand as={Link} to='/' className='brand'>
                    SOFIAS'S MAKE UP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='main-navbar' />
                <Navbar.Collapse id='main-navbar'>
                    <Nav className='me-auto'>
                        <Nav.Link as={Link} to='/' className='link'>
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to='/productos' className='link'>
                            Productos
                        </Nav.Link>
                        <Nav.Link as={Link} to='/contacto' className='link'>
                            Contacto
                        </Nav.Link>
                    </Nav>
                    <form className='d-flex' role='search'>
                        <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search'/>
                        <button className='button' type='submit'>Search</button>
                    </form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};