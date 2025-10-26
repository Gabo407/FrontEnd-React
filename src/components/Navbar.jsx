import React from 'react';
import { Container, Nav, Navbar as BsNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { itemCount } = useCarrito();

  return (
    <BsNavbar expand="lg" className="bg-body-tertiary border-bottom">
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="/img/logo.png" alt="Logo" height="36" className="me-2" />
          <span className="fw-bold">DataFixComp</span>
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="menu" />
        <BsNavbar.Collapse id="menu">
          <Nav className="ms-3">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-lg-center">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/registrar">Registrarse</Nav.Link>
                <Nav.Link as={Link} to="/ingresar">¿Ya tienes cuenta? Inicia sesión</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={logout}>Cerrar Sesión</Nav.Link>
                <div className="px-2 text-muted d-none d-lg-block">|</div>
                <Nav.Link as={Link} to="/carrito">
                  Carrito <span className="badge bg-secondary">{itemCount}</span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;