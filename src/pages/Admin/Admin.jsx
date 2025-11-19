import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import './AdminCrud.css';

export default function Admin(){
    const admin = localStorage.getItem('admin') === 'true';
    const [productos, setProductos] = useState([]);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    
    const getProductos = () =>{
        fetch(`${BASE_URL}/productos`)
        .then((res) => res.json())
        .then((data) => setProductos(data))
        .catch((error) => console.error('Error al obtener los productos: ', error));
    };

    useEffect(() => {
        if(admin){
            getProductos();
        }
    },[admin]);

    if(!admin){
        return <Navigate to={'/'}/>
    };

    return(
        <Container>
            <h1 className='my-4'>Portal administador</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.name}</td>
                            <td>{producto.categoria}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>
                               <Button variant='link' title='Editar'>
                                    <FontAwesomeIcon icon={faPenToSquare} size='lg' color='#a4133c' className='font-icon'/>
                                </Button> 
                                <Button variant='link' title='Eliminar'>
                                    <FontAwesomeIcon icon={faTrashCan} size='lg' color='#a4133c' className='font-icon'/>
                                </Button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
};
