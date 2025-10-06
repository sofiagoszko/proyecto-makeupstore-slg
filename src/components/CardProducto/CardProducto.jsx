import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './CardProducto.css';

export default function CardProducto() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('https://68e2cbbc8e14f4523dabd226.mockapi.io/api/v1/productos')
        .then((res) => res.json())
        .then((data) =>{
        setProductos(data);
        })
        .catch((error) => console.error('Error al cargar productos: ', error))
        .finally(() => setCargando(false))
    }, []);

  if(cargando) return <p>Cargando productos...</p>;


    return (
        <div className="d-flex flex-wrap justify-content-center gap-4 p-3">
            {productos.map(producto => 
                <Card key={producto.id} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={producto.avatar} alt={producto.name} className='img-card'/>
                    <Card.Body>
                        <Card.Title>{producto.name}</Card.Title>
                        <Card.Text>$1000</Card.Text>
                        <Button variant="primary">Agregar al carrito</Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}
