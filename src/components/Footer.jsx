import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="mt-5 border-top py-4 bg-light">
      <Container className="small text-muted d-flex justify-content-between flex-wrap">
        <span>&copy; 2025 DataFixComp</span>
        <span>Frontend educativo</span>
      </Container>
    </footer>
  );
}

export default Footer;