import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import makeup from '../../assets/makeup.jpeg';
import Banner from "../../components/Banner/Banner";
import CardProducto from "../../components/CardProducto/CardProducto";
import './Productos.css';

export default function ProductosPorCategoria(){
    const {categoria} = useParams();
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('https://68e2cbbc8e14f4523dabd226.mockapi.io/api/v1/productos')
        .then((res) => res.json())
        .then((data) =>{
            const productosFiltrados = data.filter(
                (producto) => producto.categoria.toLowerCase() === categoria.toLocaleLowerCase()
            );
            setProductos(productosFiltrados);
        })
        .catch((error) => console.error('Error al cargar productos: ', error))
        .finally(() => setCargando(false))
    }, [categoria]);

    if(cargando) return <p>Cargando productos...</p>;

    const productosFiltrados = categoria === 'todos'
        ? productos
        : productos.filter(producto => producto.categoria === categoria);


    return (
        <>
        <div className="mt-2">
            <Banner imagen={makeup} titulo="NUESTROS PRODUCTOS" />
        </div>

        <Container className="my-5">
            <CardProducto productos={productosFiltrados} />
        </Container>
        </>
    );
}