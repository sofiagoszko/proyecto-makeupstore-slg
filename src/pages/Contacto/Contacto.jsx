import { Container } from 'react-bootstrap';
import {Form, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import contacto from '../../assets/contacto.webp';
import contacto2 from '../../assets/contacto-2.webp';
import Banner from '../../components/Banner/Banner';
import ButtonForm from '../../components/ButtonForm/ButtonForm';
import './Contacto.css';

export default function Contacto(){
  const schema = yup.object().shape({
      nombre: yup.string().required('Ingrese su nombre'),
      apellido: yup.string().required('Ingrese su apellido'),
      email: yup.string().email().required('Ingrese su email'),
      consulta: yup.string().required('Ingrese su consulta'),
  })

  const handleSubmit = (values, actions) => {
    Swal.fire({
      title: 'Consulta enviada',
      text: 'Gracias por contactarnos. Te responderemos pronto.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
    actions.resetForm();
  };

  return (
    <>
      <div className='mt-2'>
        <Banner imagen={contacto} titulo='ESCRIBINOS' />
      </div>

      <Container className='my-5'>
        <Row className='align-items-center'>
          <p className='text-justify fs-5'>
            Si tenés alguna consulta, querés hacer un pedido personalizado o estás buscando un producto que no encontrás en la página, 
            no dudes en escribirnos. ¡Estamos para ayudarte!
          </p>
          <Col md={6}>
            <Formik 
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={{
                  nombre: '',
                  apellido: '',
                  email: '',
                  consulta: '',
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='formNombre'>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control 
                        type='text'
                        name='nombre'
                        value={values.nombre}
                        onChange={handleChange}
                        isInvalid={touched.nombre && !!errors.nombre}
                        isValid={touched.nombre && !errors.nombre}
                      />
                      <Form.Control.Feedback type='invalid'>
                          {errors.nombre}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId='formApellido'>
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control 
                        type='text' 
                        name='apellido'
                        value={values.apellido}
                        onChange={handleChange}
                        isInvalid={touched.apellido && !!errors.apellido}
                        isValid={touched.apellido && !errors.apellido}
                      />
                      <Form.Control.Feedback type='invalid'>
                          {errors.apellido}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Form.Group className='mb-3' controlId='formGridAddress1'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type='email' 
                      name='email'
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && !!errors.email}
                      isValid={touched.email && !errors.email}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formConsulta'>
                    <Form.Label>Ingresa tu consulta</Form.Label>
                    <Form.Control 
                      as='textarea' 
                      rows={3} 
                      name='consulta'
                      value={values.consulta}
                      onChange={handleChange}
                      isInvalid={touched.consulta && !!errors.consulta}
                      isValid={touched.consulta && !errors.consulta}

                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.consulta}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <ButtonForm buttonText='Enviar'/>
                </Form>
              )}
            </Formik> 
          </Col>
          <Col md={6} className='col-imagen-contacto'>
            <img
              src={contacto2}
              alt='imagen-formulario de contacto'
              className='img-fluid contacto-img'
            />
          </Col>
        </Row>    
      </Container>
    </>
  );
};