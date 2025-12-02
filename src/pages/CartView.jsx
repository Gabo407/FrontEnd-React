import React from 'react';
import { Container, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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

  if (items.length === 0) {
    return (
      <Container className="my-4">
        <h1 className="h3 mb-4">Carrito de Compras</h1>
        <Alert variant="info">
          Tu carrito está vacío. <Link to="/productos">Ir a productos</Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h1 className="h3 mb-4">Carrito de Compras</h1>
      
      <Row className="g-4">
        <Col lg={8}>
          <div className="d-flex flex-column gap-3">
            {items.map(item => {
              const producto = getProducto(item.id);
              if (!producto) return null;
              const subtotal = producto.precio * item.cantidad;

              return (
                <Card key={item.id} className="shadow-sm">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={12} sm={3} className="mb-3 mb-sm-0">
                        <img 
                          src={producto.imagen} 
                          alt={producto.nombre} 
                          className="img-fluid rounded"
                          style={{ maxHeight: '120px', objectFit: 'cover', width: '100%' }}
                        />
                      </Col>
                      <Col xs={12} sm={9}>
                        <div className="mb-2">
                          <h6 className="mb-1">{producto.nombre}</h6>
                          <p className="small text-muted mb-2">
                            {producto.descripcion_corta}
                          </p>
                        </div>
                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-3">
                          <div>
                            <p className="mb-0 small">
                              <strong>Precio unitario:</strong> ${formatoPrecio(producto.precio)}
                            </p>
                            <p className="mb-0 small">
                              <strong>Subtotal:</strong> ${formatoPrecio(subtotal)}
                            </p>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => cambiarCantidad(item.id, -1)}
                            >
                              −
                            </Button>
                            <span className="fw-bold" style={{ minWidth: '30px', textAlign: 'center' }}>
                              {item.cantidad}
                            </span>
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => cambiarCantidad(item.id, 1)}
                            >
                              +
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm" 
                              className="ms-2"
                              onClick={() => quitarDelCarrito(item.id)}
                            >
                              ✕
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm position-sticky" style={{ top: '80px' }}>
            <Card.Body>
              <h5 className="card-title">Resumen</h5>
              <hr />
              <p className="d-flex justify-content-between mb-2">
                <span>Artículos ({items.reduce((sum, i) => sum + i.cantidad, 0)}):</span>
                <span>${formatoPrecio(calcularTotal())}</span>
              </p>
              <p className="d-flex justify-content-between mb-3 text-muted small">
                <span>Envío:</span>
                <span>Calculado al confirmar</span>
              </p>
              <h5 className="d-flex justify-content-between">
                <span>Total:</span>
                <span className="text-success">${formatoPrecio(calcularTotal())}</span>
              </h5>
              <hr />
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg">
                  Proceder a pagar
                </Button>
                <Button variant="outline-secondary" onClick={vaciarCarrito}>
                  Vaciar carrito
                </Button>
                <Link to="/productos" className="btn btn-outline-primary">
                  Seguir comprando
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CartView;