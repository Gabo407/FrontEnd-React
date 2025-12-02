import React, { useState } from 'react';
import { Button, Card, Col, Modal, Badge } from 'react-bootstrap';
import { useCarrito } from '../context/CarritoContext';

function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito();
  const [show, setShow] = useState(false);

  const sinStock = producto.stock === 0;

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
      <Card className="h-100 shadow-sm hover-card position-relative">
        {sinStock && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2" style={{ zIndex: 10 }}>
            Sin Stock
          </Badge>
        )}
        <Card.Img 
          variant="top" 
          src={producto.imagen} 
          alt={producto.nombre}
          style={{ 
            maxHeight: '200px',
            objectFit: 'cover',
            opacity: sinStock ? 0.5 : 1
          }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="h6">{producto.nombre}</Card.Title>
          <Card.Text className="small text-muted flex-grow-1">
            {producto.descripcion_corta}
          </Card.Text>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Text className="fw-bold mb-0">
              ${typeof producto.precio === 'number' ? producto.precio.toLocaleString('es-CL') : producto.precio}
            </Card.Text>
            <Badge bg="info" className="ms-2">
              {producto.stock} disponibles
            </Badge>
          </div>
          <div className="d-grid gap-2">
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={() => setShow(true)}
            >
              Ver Detalles
            </Button>
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => agregarAlCarrito(producto.id)}
              disabled={sinStock}
            >
              {sinStock ? 'No disponible' : 'Agregar'}
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{producto.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <img 
                src={producto.imagen} 
                alt={producto.nombre} 
                className="img-fluid rounded"
                style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
              />
            </div>
            <div className="col-md-6">
              <p className="mb-3">
                <strong>Precio:</strong> <span className="h5">$ {typeof producto.precio === 'number' ? producto.precio.toLocaleString('es-CL') : producto.precio}</span>
              </p>
              <p className="mb-3">
                <strong>Stock:</strong>{' '}
                <Badge bg={sinStock ? 'danger' : 'success'}>
                  {sinStock ? 'Sin stock' : `${producto.stock} disponibles`}
                </Badge>
              </p>
              <p className="mb-3">
                <strong>Código:</strong> {producto.codigo}
              </p>
              <p className="mb-0">
                <strong>Descripción:</strong>
              </p>
              <p>{producto.descripcion_larga}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cerrar
          </Button>
          <Button 
            variant="success" 
            onClick={() => { agregarAlCarrito(producto.id); setShow(false); }}
            disabled={sinStock}
          >
            {sinStock ? 'No disponible' : 'Agregar al carrito'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}

export default ProductoCard;