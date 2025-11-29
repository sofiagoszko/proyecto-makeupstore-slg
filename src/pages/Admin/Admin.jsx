import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { usePagination } from '../../hooks/usePagination';
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent';
import ButtonForm from '../../components/ButtonForm/ButtonForm';
import Swal from 'sweetalert2';
import { Formik } from 'formik';
import * as yup from 'yup';
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
        stock: '',
        categoria: '',
        precio: '',
    });
    const [edit, setEdit] = useState(null);
    const { currentPage, currentItems, totalPages, handlePageChange } = usePagination(productos, 10);

    const schema = yup.object().shape({
        name: yup.string().required('Ingrese el nombre del producto'),
        avatar: yup.string().url('Ingrese una URL válida').required('Ingrese una imagen'),
        stock: yup.number().min(0,'El stock debe ser mayor o igual a 0').required('Ingrese el stock'),
        categoria: yup.string().required('Seleccione una categoría'),
        precio: yup.number().positive('El precio debe ser mayor a 0').required('Ingrese el precio'),
    });
    
    const getProductos = useCallback (() =>{
        fetch(`${BASE_URL}/productos`)
        .then((res) => res.json())
        .then((data) => setProductos(data))
        .catch((error) => console.error('Error al obtener los productos: ', error));
    },[BASE_URL]);

    useEffect(() => {
        if(isAdmin && isAuth){
            getProductos();
        }
    },[isAuth, isAdmin, getProductos]);

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

    const handleSubmit = (values) => {
        const productData = {
            name: values.name,
            avatar: values.avatar,
            stock: Number(values.stock),
            categoria: values.categoria,
            precio: values.precio,
        };

        const method = edit ? 'PUT' : 'POST';
        const url = edit ? `${BASE_URL}/productos/${edit}` : `${BASE_URL}/productos`;
        const alertTitle = edit ? 'Cambios realizados' : 'Producto Ingresado';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        })
        .then((res) => {
            if (!res.ok) throw new Error('Error al guardar el producto');
            Swal.fire({
                title: alertTitle,
                icon: 'success',
                draggable: true
            });
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
                    title: "Eliminado",
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
                    {currentItems.map((producto) => (
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

            <PaginationComponent 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title className='modal-title'>{edit ? 'Editar' : 'Agregar'} Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={form}
                    >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (    
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-2' controlId='validationFormikName'>
                                <Form.Label>Producto</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={touched.name && !!errors.name}
                                    isValid={touched.name && !errors.name}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mb-2' controlId='validationFormikAvatar'>
                                <Form.Label>Imagen (URL)</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='avatar'
                                    value={values.avatar}
                                    onChange={handleChange}
                                    isInvalid={touched.avatar && !!errors.avatar}
                                    isValid={touched.avatar && !errors.avatar}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.avatar}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mb-2' controlId='validationFormikStock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    name='stock'
                                    value={values.stock}
                                    onChange={handleChange}
                                    isInvalid={touched.stock && !!errors.stock}
                                    isValid={touched.stock && !errors.stock}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.stock}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mb-2' controlId='validationFormikCategoria'>
                                <Form.Label>Categoría</Form.Label>
                                <Form.Select 
                                    name='categoria'
                                    aria-label='Selecciona una categoría'
                                    value={values.categoria}
                                    onChange={handleChange}
                                    isInvalid={touched.categoria && !!errors.categoria}
                                    isValid={touched.categoria && !errors.categoria}
                                    >
                                        <option value=''>Seleccione una Categoría</option>
                                        <option value='rostro'>Rostro</option>
                                        <option value='ojos'>Ojos</option>
                                        <option value='labios'>Labios</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.categoria}
                                </Form.Control.Feedback>     
                            </Form.Group>

                            <Form.Group className='mb-2' controlId='validationFormikPrecio'>
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type='number'
                                    name='precio'
                                    step='0.01'
                                    value={values.precio}
                                    onChange={handleChange}
                                    isInvalid={touched.precio && !!errors.precio}
                                    isValid={touched.precio && !errors.precio}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.precio}
                                </Form.Control.Feedback> 
                            </Form.Group>
                            <ButtonForm className='mt-2' buttonText='Guardar'/>
                        </Form>
                    )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </Container>
    )
};
