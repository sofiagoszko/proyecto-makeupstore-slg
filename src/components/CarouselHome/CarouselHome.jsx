import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CarouselHome.css';

function CarouselHome() {
  const [imagenes, setImagenes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://68e2cbbc8e14f4523dabd226.mockapi.io/api/v1/carousel')
    .then((res) => res.json())
    .then((data) =>{
      setImagenes(data);
    })
    .catch((error) => console.error('Error al cargar imagenes: ', error))
    .finally(() => setCargando(false))
  }, []);

  if(cargando) return <p>Cargando imágenes...</p>;

  return (
      <Carousel data-bs-theme='dark' className='carousel-container p-4'>
        {imagenes.map((imagen) =>(  
          <Carousel.Item key={imagen.id}>
          <img
            className='d-block carousel-img'
            src={imagen.imagen}
            alt={imagen.name}
          />
        </Carousel.Item>
        ))}
      </Carousel>
  );
}

export default CarouselHome;