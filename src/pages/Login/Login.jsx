import { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import './Login.css';

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const schema = yup.object().shape({
        user: yup.string().required('Ingrese su usuario'),
        password: yup.string().required('Ingrese su contraseña'),
    })

    const handleSubmit = (values) => {
        setUser(values.user);
        setPassword(values.password);   
        localStorage.setItem('auth', 'true');
        if(values.user === 'admin' && values.password === '123'){
            localStorage.setItem('admin', 'true');
            navigate('/admin');
        }else{
            navigate('/');
        }

    };

    return (
        <Container className='d-flex justify-content-center align-items-center min-vh-100'>
            <Row className='w-100 justify-content-center'>
                <Col md={6} lg={4}>
                    <Card className='shadow-lg p-4'>
                        <Card.Body>
                            <h2 className='text-center mb-4 login-title'>Iniciar Sesión</h2>
                            <Formik 
                                validationSchema={schema}
                                onSubmit={handleSubmit}
                                initialValues={{
                                    user: '',
                                    password: '',
                                }}
                            > 
                            {({ handleSubmit, handleChange, values, touched, errors }) => ( 
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className='mb-3' controlId='validationUser'>
                                        <Form.Label>Usuario</Form.Label>
                                        <Form.Control 
                                            type='text' 
                                            name='user'
                                            placeholder='Ingrese su usuario' 
                                            value={values.user} 
                                            onChange={handleChange}
                                            isInvalid={touched.user && !!errors.user}
                                            isValid={touched.user && !errors.user}  
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.user}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='validationPassword'>
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control 
                                            type='password' 
                                            name='password'
                                            placeholder='Ingrese su contraseña' 
                                            value={values.password} 
                                            onChange={handleChange} 
                                            isInvalid={touched.password && !!errors.password}
                                            isValid={touched.password && !errors.password}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button type='submit' className='btn-card w-100'>
                                        Ingresar
                                    </Button>
                                </Form>
                            )}
                            </Formik> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}