import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Nosotros() {
  return (
    <>
      <section className="bg-light py-5">
        <Container>
          <h1 className="h3 mb-4">Sobre DataFixComp</h1>
          <Row className="g-4 align-items-center">
            <Col md={6}>
              <p className="lead mb-3">
                DataFixComp es una tienda especializada en componentes de computadoras de alta calidad.
              </p>
              <p className="mb-3">
                Nos dedicamos a la venta y ensamblaje de PCs, ofreciendo a nuestros clientes 
                productos de marcas líderes como Crucial, garantizando calidad y confiabilidad.
              </p>
              <p className="mb-3">
                Nuestra misión es proporcionar los mejores componentes para que cada cliente 
                encuentre exactamente lo que necesita para su PC o laptop.
              </p>
            </Col>
            <Col md={6}>
              <img 
                src="/img/logo.png" 
                className="img-fluid"
                alt="DataFixComp Logo"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <h2 className="h4 mb-5 text-center">Nuestra Especialización</h2>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💾</div>
                  <h5>Memoria RAM</h5>
                  <p className="small text-muted mb-0">
                    SSD y RAM de Crucial para máximo rendimiento.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖥️</div>
                  <h5>Ensamblaje</h5>
                  <p className="small text-muted mb-0">
                    Armado profesional de PC's customizados.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔧</div>
                  <h5>Servicio Técnico</h5>
                  <p className="small text-muted mb-0">
                    Mantenimiento y reparación de equipos.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                  <h5>Componentes</h5>
                  <p className="small text-muted mb-0">
                    Amplio catálogo de piezas y componentes.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-light py-5">
        <Container>
          <h2 className="h4 mb-4 text-center">¿Por qué confiar en nosotros?</h2>
          <Row className="g-4">
            <Col md={6}>
              <h6 className="text-primary mb-2">✓ Experiencia</h6>
              <p className="small text-muted">
                Años de experiencia en el mercado de componentes informáticos.
              </p>
            </Col>
            <Col md={6}>
              <h6 className="text-primary mb-2">✓ Calidad Garantizada</h6>
              <p className="small text-muted">
                Productos auténticos con garantía oficial del fabricante.
              </p>
            </Col>
            <Col md={6}>
              <h6 className="text-primary mb-2">✓ Precios Competitivos</h6>
              <p className="small text-muted">
                Ofrecemos los mejores precios del mercado sin sacrificar calidad.
              </p>
            </Col>
            <Col md={6}>
              <h6 className="text-primary mb-2">✓ Atención Personalizada</h6>
              <p className="small text-muted">
                Asesoramiento profesional para cada cliente según sus necesidades.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
