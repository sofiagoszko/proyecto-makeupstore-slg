import CardProducto from "../../components/CardProducto/CardProducto";
import { Container } from 'react-bootstrap';
import makeup from '../../assets/makeup.jpeg';
import Banner from "../../components/Banner/Banner";
import './Productos.css';

export default function Productos(){
  return (
    <>
      <div className="mt-2">
        <Banner imagen={makeup} titulo="NUESTROS PRODUCTOS" />
      </div>
      <Container className="my-5">
        <CardProducto />
      </Container>
    </>
  );
};