import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner, Alert } from 'react-bootstrap';
import ProductoCard from '../components/ProductoCard';
import { productoService } from '../services/api';
import { productos as productosLocales } from '../data/productos';

function Productos() {
  const [filteredProductos, setFilteredProductos] = useState(productosLocales);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const resultado = await productoService.obtenerActivos();
      if (resultado.codigo === 200 && resultado.data && resultado.data.length > 0) {
        // Mapear datos del backend al formato del frontend
        const productosBackend = resultado.data.map(p => ({
          id: p.idProducto,
          codigo: p.codigo,
          nombre: p.nombre,
          descripcion_corta: p.descripcionCorta,
          descripcion_larga: p.descripcionLarga,
          precio: p.precio,
          stock: p.stock,
          imagen: p.imagen || './img/ssd-sata-500.png'
        }));
        setFilteredProductos(productosBackend);
      } else {
        // Si no hay productos en el backend, usar productos locales
        setFilteredProductos(productosLocales);
      }
      setError('');
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setFilteredProductos(productosLocales);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = filteredProductos.filter(p => 
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.descripcion_corta.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProductos(filtered);
    } else {
      cargarProductos();
    }
  }, [searchTerm]);

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h1 className="h3 mb-0">Productos</h1>
        <input
          type="search"
          className="form-control"
          style={{ maxWidth: '300px' }}
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row id="lista" className="g-3 g-md-4">
        {filteredProductos.length > 0 ? (
          filteredProductos.map(producto => (
            <ProductoCard key={producto.id} producto={producto} />
          ))
        ) : (
          <Alert variant="info" className="w-100">
            No se encontraron productos que coincidan con tu búsqueda.
          </Alert>
        )}
      </Row>
    </Container>
  );
}

export default Productos;