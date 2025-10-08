import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
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
                    <form className='d-flex' role='search'>
                        <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search'/>
                        <button className='button' type='submit'>Search</button>
                    </form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};