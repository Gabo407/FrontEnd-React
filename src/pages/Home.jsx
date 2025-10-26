import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productos } from '../data/productos';
import ProductoCard from '../components/ProductoCard';

function Home() {
  return (
    <>
      <header className="container my-4">
        <Row className="g-4 align-items-center">
          <Col md={6}>
            <h1 className="h2">Componentes para PC y Laptop</h1>
            <p className="lead">Crucial RAM y SSD. Envíos a todo Chile.</p>
            <Link to="/productos" className="btn btn-primary">Ver productos</Link>
          </Col>
          <Col md={6}>
            <img src="/img/banner.jpg" className="img-fluid rounded" alt="Banner" />
          </Col>
        </Row>
      </header>
      <Container className="my-5">
        <h2 className="h4 mb-4">Productos Destacados</h2>
        <Row>
          {productos.slice(0, 3).map(producto => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;