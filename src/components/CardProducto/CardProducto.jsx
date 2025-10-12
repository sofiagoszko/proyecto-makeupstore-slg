import { Button, Card} from 'react-bootstrap';
import { useCarrito } from '../CarritoContext/CarritoContext';
import { useNavigate } from 'react-router-dom';
import './CardProducto.css';

export default function CardProducto({productos}) {
    const auth = localStorage.getItem('auth') === 'true';
    const navigate = useNavigate();
    const { agregarAlCarrito } = useCarrito(); 

    return (
        <>
            <div className='row justify-content-center align-items-stretch g-4'>
                {productos.map(producto => 
                    <div key={producto.id} className='col-sm-6 col-md-4 col-lg-3 d-flex'>
                        <Card className='h-100 shadow-sm w-100'>
                            <Card.Img variant='top' src={producto.avatar} alt={producto.name} className='img-card'/>
                            <Card.Body className='card-body'>
                                <Card.Title>{producto.name}</Card.Title>
                                <Card.Text>$ {producto.precio}</Card.Text>
                                <Button className='btn-card p-2' 
                                    onClick={() =>{
                                        if(auth) {
                                            agregarAlCarrito(producto);
                                        }else{
                                            navigate('/login');
                                        }
                                    }
                                  }
                                >
                                    Agregar al carrito
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </div>
        </>
    );
}
