import { createContext, useState, useEffect, useContext } from 'react';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState (() => {
        return JSON.parse(localStorage.getItem('carrito')) || []
    });

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    },[carrito]);


    const agregarAlCarrito = (producto) => {
        setCarrito((prevCarrito) => {
            const existente = prevCarrito.find((item) => item.id === producto.id);

            if (existente) {
                return prevCarrito.map((item) => 
                    item.id === producto.id ? {...item, cantidad: item.cantidad + 1} : item
                );
            }else{
                return [...prevCarrito, {...producto, cantidad: 1}];
            }
        });
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((prevCarrito) => {
            return prevCarrito.map((item) =>
                item.id === id ? {...item, cantidad: item.cantidad - 1} : item
            )
            .filter((item) => item.cantidad > 0);
        });
    }

    const vaciarCarrito = () => {
        setCarrito([]);
    }
 
    const valor = {
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
    };


    return (
        <CarritoContext.Provider value={valor}>
            {children}
        </CarritoContext.Provider>
    );

}

export function useCarrito() {
  return useContext(CarritoContext);
}