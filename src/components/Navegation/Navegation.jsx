import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Navegation.css';

export default function Navegation() {
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setExpanded(false);
    },[location]);

    return (
        <Navbar className='navbar navbar-dark sticky-top' expand='lg' expanded={expanded} onToggle={() => setExpanded(!expanded)}>
            <Container>
                <Navbar.Brand as={Link} to='/' className='brand'>
                    STORE
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='main-navbar' />
                <Navbar.Collapse id='main-navbar'>
                    <Nav className='me-auto' onSelect={() => setExpanded(false)}>
                        <Nav.Link as={Link} to='/' className='link-nav'>
                            Home
                        </Nav.Link>

                        <Nav.Link as={Link} to='/contacto' className='link-nav'>
                            Contacto
                        </Nav.Link>
    
                        <NavDropdown title="Producto"  className='link-nav'>
                            <NavDropdown.Item  as={Link} to="/productos">Todos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/productos/rostro">Rostro</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/productos/ojos">Ojos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/productos/labios">Labios</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <div className="d-flex align-items-center">
                        <Nav.Link as={Link} to='/login' className='link-nav'>
                            Login
                        </Nav.Link>
                        <Link to="/carrito" className="link-nav ms-2">
                            <FontAwesomeIcon icon={faShoppingCart} size="lg" color='#a4133c'/>
                        </Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};