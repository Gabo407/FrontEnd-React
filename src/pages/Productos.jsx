import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductoCard from '../components/ProductoCard';
import { productos } from '../data/productos';

function Productos() {
  const [filteredProductos, setFilteredProductos] = useState(productos);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) {
      const filtered = productos.filter(p => 
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.descripcion_corta.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProductos(filtered);
    } else {
      setFilteredProductos(productos);
    }
  }, [searchTerm]);

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Productos</h1>
        <input
          type="search"
          className="form-control w-auto"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Row id="lista">
        {filteredProductos.map(producto => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </Row>
    </Container>
  );
}

export default Productos;