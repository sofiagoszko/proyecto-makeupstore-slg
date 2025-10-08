import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardProducto from "../../components/CardProducto/CardProducto";
import { Container, Form } from 'react-bootstrap';
import makeup from '../../assets/makeup.jpeg';
import labiosImg from '../../assets/labios.png';
import rostroImg from '../../assets/rostro.png';
import ojosImg from '../../assets/ojos.jpg';
import Banner from "../../components/Banner/Banner";
import './Productos.css';

export default function Productos(){
  const { categoria: categoriaUrl } = useParams(); 
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [categoria, setCategoria] = useState(categoriaUrl || 'todos');

  useEffect(() => {
      fetch('https://68e2cbbc8e14f4523dabd226.mockapi.io/api/v1/productos')
      .then((res) => res.json())
      .then((data) =>{
        setProductos(data);
      })
      .catch((error) => console.error('Error al cargar productos: ', error))
      .finally(() => setCargando(false))
  }, []);

  useEffect(() => {
    if (categoriaUrl) setCategoria(categoriaUrl);
  }, [categoriaUrl]);


  if(cargando) return <p>Cargando productos...</p>;

  const productosFiltrados = categoria === 'todos'
      ? productos
      : productos.filter(producto => producto.categoria === categoria);

  const imagenBanner = {
    rostro: rostroImg,
    ojos: ojosImg,
    labios: labiosImg,
    todos: makeup
  }[categoria] || makeup;    

  const tituloBanner =
    categoria === 'todos'
      ? 'NUESTROS PRODUCTOS'
      : `${categoria.toUpperCase()}`;


  return (
    <>
      <div className="mt-2">
        <Banner imagen={imagenBanner} titulo={tituloBanner} />
      </div>

      {!categoriaUrl && 
        (<div className="m-4 d-flex align-items-center gap-2">
          <label htmlFor="filtroCategoria" className="m-2">Categoría:</label>
          <Form.Select 
              value={categoria} 
              onChange={(e) => setCategoria(e.target.value)} 
              style={{ width: '200px'}}
          >
              <option value="todos">Todos</option>
              <option value="rostro">Rostro</option>
              <option value="ojos">Ojos</option>
              <option value="labios">Labios</option>
          </Form.Select>
        </div>)}

      <Container className="my-5">
        <CardProducto productos={productosFiltrados} />
      </Container>
    </>
  );
};