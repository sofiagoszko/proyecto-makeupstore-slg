import CardProducto from "../components/CardProducto/CardProducto";
import { Container } from 'react-bootstrap';

export default function Productos(){
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Nuestros productos</h2>
      <CardProducto />
    </Container>
  );
};