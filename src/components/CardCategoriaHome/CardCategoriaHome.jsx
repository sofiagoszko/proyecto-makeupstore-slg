import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './CarfdCategoriaHome.css';


export default function CardCategoriaHome({imagen, text, ruta}) {
    const navigate = useNavigate();

    return (
        <div className='col-12 col-lg-4 d-flex'>
                <Card className='categoria-card w-100 shadow-sm text-center' onClick={() => navigate(ruta)}>
                    <Card.Img variant='top' src={imagen} alt={text} className='categoria-img'/>
                    <Card.Body className='d-flex align-items-center justify-content-center categoria-card-body'>
                        <Card.Text className='fw-bold fs-5'>{text}</Card.Text>
                    </Card.Body>
                </Card>
        </div>
    );
}
