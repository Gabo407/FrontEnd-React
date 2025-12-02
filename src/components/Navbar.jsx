import React from 'react';
import { Container, Nav, Navbar as BsNavbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { itemCount } = useCarrito();

  return (
    <BsNavbar expand="lg" className="bg-body-tertiary border-bottom sticky-top">
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="/img/logo.png" alt="Logo" height="36" className="me-2" />
          <span className="fw-bold">DataFixComp</span>
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="menu" />
        <BsNavbar.Collapse id="menu">
          <Nav className="ms-3">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                <NavDropdown title="Catálogo" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/catalogo/ram">Memorias RAM</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/catalogo/discos">Discos SSD</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/catalogo/graficas">Tarjetas Gráficas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/catalogo">Ver Todo</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
                <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto align-items-lg-center gap-2">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/registrar">Registrarse</Nav.Link>
                <Nav.Link as={Link} to="/ingresar" className="btn btn-primary text-white">
                  Ingresar
                </Nav.Link>
              </>
            ) : (
              <>
                <span className="text-muted d-none d-lg-inline">
                  Bienvenido, {user?.nombre || 'Usuario'}
                </span>
                <div className="px-2 text-muted d-none d-lg-block">|</div>
                <Nav.Link as={Link} to="/carrito">
                  🛒 Carrito <span className="badge bg-secondary ms-1">{itemCount}</span>
                </Nav.Link>
                <Nav.Link onClick={logout} className="text-danger">
                  Cerrar Sesión
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