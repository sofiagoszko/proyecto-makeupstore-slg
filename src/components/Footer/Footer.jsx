import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import './Footer.css';

export default function Footer(){
    return (
        <footer className='footer'>
            <Container className='d-flex flex-column flex-md-row justify-content-around'>
                <div className='footer-section'>
                    <h3>STORE</h3>
                    <ul className='list'>
                        <li>
                            <Link as={Link} to='/' className='link'>Home</Link>
                        </li>
                        <li>
                            <Link as={Link} to='/' className='link'>Productos</Link>
                        </li>
                        <li>
                            <Link as={Link} to='/' className='link'>Contacto</Link>
                        </li>
                    </ul>
                </div>

                <div className='footer-section'>
                    <h3>Seguinos</h3>
                    <div className='d-flex justify-content-center align-items-center'>
                        <a href='https://www.facebook.com/' target='_blank' className='mx-2'>
                            <FontAwesomeIcon icon={faFacebookF} size='lg' color='#fff0f3' className='font-icon'/>
                        </a>
                        <a href='https://www.instagram.com/' target='_blank' className='mx-2'>
                            <FontAwesomeIcon icon={faInstagram} size='lg' color='#fff0f3' className='font-icon'/>
                        </a>
                        <a href='https://www.tiktok.com/' target='_blank' className='mx-2'>
                            <FontAwesomeIcon icon={faTiktok} size='lg' color='#fff0f3' className='font-icon'/>
                        </a>
                    </div>
                </div>

                
                <div className='footer-section'>
                    <h3>Contactanos</h3>
                    <a href='mailto:info@sofiasmakeup.com' className='email'>
                        <FontAwesomeIcon icon={faEnvelope} size='lg' className='mx-2' color='#fff0f3' /> 
                        info@sofiasmakeup.com
                    </a>
                </div>
            </Container>
       </footer> 
    );
};