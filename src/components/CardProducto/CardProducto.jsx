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
        <div className="row justify-content-center align-items-stretch g-4">
            {productos.map(producto => 
                <div key={producto.id} className="col-sm-6 col-md-4 col-lg-3 d-flex">
                    <Card className="h-100 shadow-sm w-100">
                        <Card.Img variant="top" src={producto.avatar} alt={producto.name} className='img-card'/>
                        <Card.Body className='card-body'>
                            <Card.Title>{producto.name}</Card.Title>
                            <Card.Text>$1000</Card.Text>
                            <Button className="btn-card p-2">Agregar al carrito</Button>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
}
