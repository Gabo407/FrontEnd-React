import React, { createContext, useContext, useEffect, useState } from 'react';

const CarritoContext = createContext(null);
const CLAVE = 'carrito';

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem(CLAVE) || '[]');
    setItems(carrito);
  }, []);

  const guardarCarrito = (carrito) => {
    localStorage.setItem(CLAVE, JSON.stringify(carrito));
    setItems(carrito);
  };

  const agregarAlCarrito = (id) => {
    const carrito = [...items];
    const item = carrito.find(x => x.id === id);

    if (item) {
      item.cantidad++;
    } else {
      carrito.push({ id, cantidad: 1 });
    }

    guardarCarrito(carrito);
  };

  const quitarDelCarrito = (id) => {
    const carrito = items.filter(x => x.id !== id);
    guardarCarrito(carrito);
  };

  const cambiarCantidad = (id, delta) => {
    const carrito = [...items];
    const item = carrito.find(x => x.id === id);

    if (item) {
      item.cantidad += delta;
      if (item.cantidad <= 0) {
        guardarCarrito(carrito.filter(x => x.id !== id));
      } else {
        guardarCarrito(carrito);
      }
    }
  };

  const vaciarCarrito = () => {
    guardarCarrito([]);
  };

  const value = {
    items,
    itemCount: items.reduce((sum, item) => sum + item.cantidad, 0),
    agregarAlCarrito,
    quitarDelCarrito,
    cambiarCantidad,
    vaciarCarrito
  };

  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>;
}