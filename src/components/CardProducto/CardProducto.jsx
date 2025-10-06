import { useState, useEffect } from 'react';
import { Button, Card, Form} from 'react-bootstrap';
import './CardProducto.css';

export default function CardProducto() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [categoria, setCategoria] = useState('todos');

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

    const productosFiltrados = categoria === 'todos'
        ? productos
        : productos.filter(producto => producto.categoria === categoria);


    return (
        <>
            <div className="mb-4 d-flex align-items-center gap-2">
                <label htmlFor="filtroCategoria" className="mb-2">Filtra por:</label>
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
            </div>

            <div className="row justify-content-center align-items-stretch g-4">
                {productosFiltrados.map(producto => 
                    <div key={producto.id} className="col-sm-6 col-md-4 col-lg-3 d-flex">
                        <Card className="h-100 shadow-sm w-100">
                            <Card.Img variant="top" src={producto.avatar} alt={producto.name} className='img-card'/>
                            <Card.Body className='card-body'>
                                <Card.Title>{producto.name}</Card.Title>
                                <Card.Text>$ {producto.precio}</Card.Text>
                                <Button className="btn-card p-2">Agregar al carrito</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </div>
        </>
    );
}
