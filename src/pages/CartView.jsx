import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useCarrito } from '../context/CarritoContext';
import { productos } from '../data/productos';

function CartView() {
  const { items, quitarDelCarrito, cambiarCantidad, vaciarCarrito } = useCarrito();

  const getProducto = (id) => productos.find(p => p.id === id) || null;

  const formatoPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL').format(precio);
  };

  const calcularTotal = () => {
    return items.reduce((total, item) => {
      const producto = getProducto(item.id);
      return total + (producto ? producto.precio * item.cantidad : 0);
    }, 0);
  };

  return (
    <Container className="my-4">
      <h1 className="h3">Carrito</h1>
      {items.length === 0 ? (
        <p>Carrito vacío.</p>
      ) : (
        <>
          {items.map(item => {
            const producto = getProducto(item.id);
            if (!producto) return null;
            const subtotal = producto.precio * item.cantidad;

            return (
              <div key={item.id} className="d-flex align-items-center border-bottom py-2">
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre} 
                  width="56" 
                  height="56" 
                  className="rounded me-2" 
                  style={{ objectFit: 'cover' }} 
                />
                <div className="flex-grow-1">
                  <div className="fw-medium">{producto.nombre}</div>
                  <div className="small text-muted">
                    $ {formatoPrecio(producto.precio)} x {item.cantidad}
                  </div>
                  <div className="small mt-1 text-secondary">
                    <strong>Descripción:</strong> {producto.descripcion_larga}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => cambiarCantidad(item.id, -1)}
                  >
                    -
                  </Button>
                  <span>{item.cantidad}</span>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => cambiarCantidad(item.id, 1)}
                  >
                    +
                  </Button>
                  <span className="ms-3 fw-bold">$ {formatoPrecio(subtotal)}</span>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    className="ms-2"
                    onClick={() => quitarDelCarrito(item.id)}
                  >
                    Quitar
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="d-flex justify-content-end mt-3">
            <h4>Total: <span>$ {formatoPrecio(calcularTotal())}</span></h4>
          </div>
          <div className="d-flex gap-2 justify-content-end mt-2">
            <Button variant="outline-secondary" onClick={vaciarCarrito}>
              Vaciar
            </Button>
            <Button variant="primary">
              Comprar
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default CartView;