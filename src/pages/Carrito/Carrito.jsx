import { useCarrito } from '../../components/CarritoContext/CarritoContext';
import { Navigate } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import './Carrito.css';

export default function Carrito() {
    const auth = localStorage.getItem('auth') === 'true';
    const { carrito, agregarAlCarrito, eliminarDelCarrito } = useCarrito();

    if (!auth) {
        return <Navigate to="/login" />;
    }

    const total = carrito.reduce (
        (acc, item) => acc + item.precio*item.cantidad,
        0
    );

    if (carrito.length === 0) {
        return (
            <Container className='my-5 text-center'>
                <h1 className='carrito-title'>Carrito vacío</h1>
            </Container>
        );
    };

    return (
        <Container className='my-5'>
            <h1 className='mb-4 carrito-title'>Tu Carrito</h1>

            <Table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {carrito.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>$ {item.precio}</td>
                            <td>{item.cantidad}</td>
                            <td>$ { item.precio * item.cantidad }</td>
                            <td>
                                <Button variant='link' className='p-0 me-2' onClick={() => eliminarDelCarrito(item.id)}>
                                    <FontAwesomeIcon icon={faTrashCan} size='lg' color='#a4133c' className='font-icon'/>
                                </Button>
                                <Button variant='link' className='p-0' onClick={() => agregarAlCarrito(item)}>
                                    <FontAwesomeIcon icon={faSquarePlus} size='lg' color='#a4133c' className='font-icon'/>
                                </Button>
                            </td>    
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h4 className='text-end mt-3 carrito-title'>Total: $ {total.toFixed(2)}</h4>
        </Container>
    );
}