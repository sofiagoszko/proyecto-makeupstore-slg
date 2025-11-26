import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import ButtonForm from '../../components/ButtonForm/ButtonForm';
import Swal from 'sweetalert2';
import './AdminCrud.css';

export default function Admin(){
    const isAdmin = localStorage.getItem('admin') === 'true';
    const isAuth = localStorage.getItem('auth') === 'true';
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [showModal, setShowModal] = useState(false);
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        name: '',
        avatar: '',
        stock: 0,
        categoria: '',
        precio: '',
    });
    const [edit, setEdit] = useState(null);
    
    
    const getProductos = () =>{
        fetch(`${BASE_URL}/productos`)
        .then((res) => res.json())
        .then((data) => setProductos(data))
        .catch((error) => console.error('Error al obtener los productos: ', error));
    };

    useEffect(() => {
        if(isAdmin && isAuth){
            getProductos();
        }
    },[isAuth, isAdmin]);

    const handleClose = () =>{
        setShowModal(false);
        setForm({            
            name: '',
            avatar: '',
            stock: '',
            categoria: '',
            precio: '',
        });
        setEdit(null);
    };

    const handleShowModal = (producto = null) => {
        setShowModal(true);
        if(producto){
            setForm({
                ...producto,
                name: producto.name,
                avatar: producto.avatar,
                stock: Number(producto.stock),
                categoria: producto.categoria,
                precio: producto.precio,
            });
            setEdit(producto.id)
        }else{
             setForm({
                name: '',
                avatar: '',
                stock: '',
                categoria: '',
                precio: '',
            });
            setEdit(null);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const productData = {
            ...form,
            name: form.name,
            avatar: form.avatar,
            stock: Number(form.stock),
            categoria: form.categoria,
            precio: form.precio,
        };

        const method = edit ? 'PUT' : 'POST';
        const url = edit ? `${BASE_URL}/productos/${edit}` : `${BASE_URL}/productos`;

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        })
        .then((res) => {
            if (!res.ok) throw new Error('Error al guardar el producto');
            return res.json();
        })
        .then(() => {
            handleClose();
            getProductos();
        })
        .catch((error) => console.error('Error:', error));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Deseas eliminar este producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#a4133c',
            confirmButtonText: 'Aceptar',
            denyButtonText: 'Cancelar'
        }).then((res) => {
            if(res.isConfirmed){
                Swal.fire({
                    title: "¡Eliminado!",
                    icon: "success"
                });
                fetch(`${BASE_URL}/productos/${id}`, {method: 'DELETE'})
                .then((res) => {
                if(!res.ok) throw new Error('Error al eliminar el producto');
                getProductos();
                })
                .catch((error) => console.log(error));
            }
        })
    }

    if(!isAuth || !isAdmin){
        return <Navigate to='/' replace />
    };

    return(
        <Container>
            <h1 className='mb-3 mb-md-0 my-4'>Portal administador</h1>
            <ButtonForm buttonText='Nuevo Producto' onClick={() => handleShowModal()} type='button'/>
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
                               <Button variant='link' title='Editar' onClick={() => handleShowModal(producto)}>
                                    <FontAwesomeIcon icon={faPenToSquare} size='lg' color='#a4133c' className='font-icon'/>
                                </Button> 
                                <Button variant='link' title='Eliminar' onClick={() => handleDelete(producto.id)}>
                                    <FontAwesomeIcon icon={faTrashCan} size='lg' color='#a4133c' className='font-icon'/>
                                </Button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title className='modal-title'>{edit ? 'Editar' : 'Agregar'} Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-2'>
                    <Form.Label>Producto</Form.Label>
                    <Form.Control
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    </Form.Group>

                    <Form.Group className='mb-2'>
                    <Form.Label>Imagen (URL)</Form.Label>
                    <Form.Control
                        value={form.avatar}
                        onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                        required
                    />
                    </Form.Group>

                    <Form.Group className='mb-2'>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type='number'
                        value={form.stock}
                        onChange={(e) =>
                        setForm({ ...form, stock: Number(e.target.value) })
                        }
                        required
                    />
                    </Form.Group>

                    <Form.Group className='mb-2'>
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select 
                            aria-label='Selecciona una categoría'
                            value={form.categoria}
                            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                            required
                            >
                                <option value=''>Seleccione una Categoría</option>
                                <option value='rostro'>Rostro</option>
                                <option value='ojos'>Ojos</option>
                                <option value='labios'>Labios</option>
                        </Form.Select>    
                    </Form.Group>

                    <Form.Group className='mb-2'>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        value={form.precio}
                        onChange={(e) =>
                        setForm({ ...form, precio: e.target.value })
                        }
                        required
                    />
                    </Form.Group>
                    <ButtonForm className='mt-2' buttonText='Guardar'/>
                </Form>
                </Modal.Body>
            </Modal>
        </Container>
    )
};
