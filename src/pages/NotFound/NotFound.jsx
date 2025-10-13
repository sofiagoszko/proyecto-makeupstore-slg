import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry } from '@fortawesome/free-regular-svg-icons';
import './NotFound.css';

export default function NotFound() {
    return (
        <Container>
            <FontAwesomeIcon icon={faSadCry} size='6x' color='#a4133c' className='d-block mx-auto mt-3'/>
            <h1 className='notfound-title mt-2 text-center'>404 </h1>
            <p className='text-center'>La página que estás búscando no existe</p>
            <Button as={Link} to="/" className='btn-card notfound-btn d-block mx-auto m-3'> Volver al inicio </Button>
        </Container>

    );
}