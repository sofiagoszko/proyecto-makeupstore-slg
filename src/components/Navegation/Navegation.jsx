import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCarrito } from '../CarritoContext/CarritoContext';
import './Navegation.css';

export default function Navegation() {
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();
    const { carrito, vaciarCarrito } = useCarrito();
    const navigate = useNavigate();
    const isAuth = localStorage.getItem('auth') === 'true';
    const isAdmin = localStorage.getItem('admin') === 'true';

    const cerrarSesion = () => 
        {
            localStorage.removeItem('auth');
            localStorage.removeItem('admin');
            vaciarCarrito();
            navigate('/');
    };

    const totalItems = carrito.length;

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
                        <NavDropdown title='Producto'  className='link-nav'>
                            <NavDropdown.Item  as={Link} to='/productos'>Todos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/productos/rostro'>Rostro</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/productos/ojos'>Ojos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/productos/labios'>Labios</NavDropdown.Item>
                        </NavDropdown>
                        {isAdmin && (
                                <Nav.Link as={Link} to='/admin'>Administración</Nav.Link>
                            )
                        }
                    </Nav>

                    <Nav className='ms-auto flex-column flex-lg-row'>
                        {isAuth && (
                            <>
                                <Nav.Link as={Link} to='#'>Perfil</Nav.Link>
                                <Nav.Link className='link-nav' onClick={cerrarSesion}>Cerrar sesión</Nav.Link>
                            </>
                        )}
                        {!isAuth && (
                            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
                <Link to='/carrito' className='link-nav my-2'>
                    <FontAwesomeIcon icon={faShoppingCart} size='lg' color='#a4133c'/>
                    {totalItems > 0 && (
                        <Badge bg='danger' className='ms-1'>{totalItems}</Badge>
                    )}
                </Link>
            </Container>
        </Navbar>
    );
};