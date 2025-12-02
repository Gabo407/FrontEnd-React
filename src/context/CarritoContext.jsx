import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { setCookie, getCookie, deleteCookie } from '../utils/cookieUtils';

const CarritoContext = createContext(null);
const CLAVE = 'carrito';

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([]);
  const { isAuthenticated } = useAuth();

  // Cargar carrito al inicializar
  useEffect(() => {
    const carritoGuardado = getCookie(CLAVE);
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    setItems(carrito);
  }, []);

  // Limpiar carrito cuando se cierra sesión
  useEffect(() => {
    if (!isAuthenticated) {
      deleteCookie(CLAVE);
      setItems([]);
    }
  }, [isAuthenticated]);

  const guardarCarrito = (carrito) => {
    setCookie(CLAVE, JSON.stringify(carrito));
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