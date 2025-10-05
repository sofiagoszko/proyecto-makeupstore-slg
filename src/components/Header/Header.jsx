import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './Header.css';

export default function Header() {
    return (
        <Navbar className='navbar'>
            <Container>
                <Navbar.Brand as={Link} to="/" className='brand'>
                    SOFIAS'S MAKE UP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className='link'>
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/productos" className='link'>
                            Productos
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contacto" className='link'>
                            Contacto
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};