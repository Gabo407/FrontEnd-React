import React, { useState } from 'react';
import { Button, Card, Col, Modal } from 'react-bootstrap';
import { useCarrito } from '../context/CarritoContext';

function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito();
  const [show, setShow] = useState(false);

  return (
    <Col sm={6} md={4} lg={3} className="mb-3">
      <Card className="h-100">
        <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text className="small text-muted">{producto.descripcion_corta}</Card.Text>
          <Card.Text className="fw-bold mt-auto">$ {producto.precio}</Card.Text>
          <div className="d-grid gap-2">
            <Button variant="outline-primary" size="sm" onClick={() => setShow(true)}>
              Ver
            </Button>
            <Button variant="success" size="sm" onClick={() => agregarAlCarrito(producto.id)}>
              Agregar
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{producto.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid mb-3" />
          <p><strong>Precio:</strong> $ {producto.precio}</p>
          <p><strong>Stock:</strong> {producto.stock}</p>
          <p>{producto.descripcion_larga}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cerrar
          </Button>
          <Button variant="success" onClick={() => { agregarAlCarrito(producto.id); setShow(false); }}>
            Agregar al carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}

export default ProductoCard;