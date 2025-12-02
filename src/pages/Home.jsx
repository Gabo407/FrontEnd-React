import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productos as productosLocales } from '../data/productos';
import ProductoCard from '../components/ProductoCard';

function Home() {
  const { user } = useAuth();
  const [productosDestacados, setProductosDestacados] = useState(productosLocales.slice(0, 3));

  return (
    <>
      {/* Hero Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="g-4 align-items-center">
            <Col xs={12} md={6} className="mb-4 mb-md-0">
              <h1 className="h2 mb-3">Bienvenido a DataFixComp</h1>
              <p className="lead mb-3">
                Tu tienda de confianza para componentes de computadoras de alta calidad.
              </p>
              <p className="text-muted mb-4">
                Contamos con SSD, RAM y otros componentes de marcas líderes para tu PC o laptop.
              </p>
              {user && (
                <p className="small text-success mb-4">
                  ✓ Conectado como: <strong>{user.nombre} {user.apellido}</strong>
                </p>
              )}
              <Link to="/productos" className="btn btn-primary btn-lg">
                Ver todos los productos
              </Link>
            </Col>
            <Col xs={12} md={6}>
              <img 
                src="/img/banner.jpg" 
                className="img-fluid rounded shadow-sm" 
                alt="Banner DataFixComp"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Características */}
      <section className="py-5">
        <Container>
          <h2 className="h4 mb-5 text-center">¿Por qué elegir DataFixComp?</h2>
          <Row className="g-4">
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
                  <h5>Productos Auténticos</h5>
                  <p className="small text-muted">
                    Garantía de productos originales y certificados.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📦</div>
                  <h5>Envío Rápido</h5>
                  <p className="small text-muted">
                    Entrega a todo Chile en 2-5 días hábiles.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💳</div>
                  <h5>Pago Seguro</h5>
                  <p className="small text-muted">
                    Transacciones 100% seguras y encriptadas.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤝</div>
                  <h5>Soporte 24/7</h5>
                  <p className="small text-muted">
                    Atención al cliente disponible todos los días.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Productos Destacados */}
      <section className="bg-light py-5">
        <Container>
          <h2 className="h4 mb-4">Productos Destacados</h2>
          <Row className="g-3 g-md-4">
            {productosDestacados.map(producto => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </Row>
          <div className="text-center mt-5">
            <Link to="/productos" className="btn btn-outline-primary">
              Ver todo el catálogo →
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h3 className="h5 mb-2">¿Necesitas asesoramiento?</h3>
              <p className="mb-0">
                Contáctanos para obtener recomendaciones personalizadas sobre los mejores componentes para tu equipo.
              </p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Link to="/contacto" className="btn btn-light">
                Contáctanos
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;