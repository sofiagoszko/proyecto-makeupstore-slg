import { useState } from 'react';
import { Container } from 'react-bootstrap';
import {Form, Col, Row, Button, InputGroup } from 'react-bootstrap';
import contacto from '../../assets/contacto.jpg';
import contacto2 from '../../assets/contacto-2.jpg';
import Banner from "../../components/Banner/Banner";
import './Contacto.css';

export default function Contacto(){
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <div className="mt-2">
        <Banner imagen={contacto} titulo="ESCRIBINOS" />
      </div>

      <Container className="my-5">
        <Row className="align-items-center">
          <p className='text-justify fs-5'>
            Si tenés alguna consulta, querés hacer un pedido personalizado o estás buscando un producto que no encontrás en la página, 
            no dudes en escribirnos. ¡Estamos para ayudarte!
          </p>
          <Col md={6}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" required/>
                </Form.Group>

                <Form.Group as={Col} controlId="formApellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" required/>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Email</Form.Label>
                <Form.Control typeof='email' required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Ingresa tu consulta</Form.Label>
                <Form.Control as="textarea" rows={3} required/>
              </Form.Group>

              <Button className='btn-form' type="submit">
                Enviar
              </Button>
            </Form>
          </Col>
          <Col md={6} className="d-none d-md-block">
            <img
              src={contacto2}
              alt="imagen-formulario de contacto"
              className="img-fluid contacto-img"
            />
          </Col>
        </Row>    
      </Container>
    </>
  );
};