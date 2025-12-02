import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { productoService } from '../services/api';

function Catalogo() {
    const { categoria } = useParams();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarProductos();
    }, [categoria]);

    const cargarProductos = async () => {
        setLoading(true);
        let resultado;

        // Si existe categoría, obtener productos filtrados por categoría
        if (categoria) {
            resultado = await productoService.obtenerActivosPorCategoria(categoria);
        } else {
            // Si no, obtener todos los productos activos
            resultado = await productoService.obtenerActivos();
        }

        if (resultado.codigo === 200) {
            let filtrados = resultado.data || [];

            // Ordenar por precio (menor a mayor)
            filtrados.sort((a, b) => a.precio - b.precio);

            setProductos(filtrados);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <Container className="my-5 text-center">
                <h2>Cargando catálogo...</h2>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">
                {categoria ? `Catálogo de ${categoria.toUpperCase()}` : 'Catálogo Completo'}
            </h2>

            {productos.length === 0 ? (
                <div className="text-center">
                    <p>No se encontraron productos en esta categoría.</p>
                    <Link to="/productos" className="btn btn-primary">Ver todos los productos</Link>
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {productos.map((producto) => (
                        <Col key={producto.idProducto}>
                            <Card className="h-100 shadow-sm hover-effect">
                                <Card.Img
                                    variant="top"
                                    src={producto.imagen || 'https://via.placeholder.com/300'}
                                    style={{ height: '200px', objectFit: 'contain', padding: '1rem' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{producto.nombre}</Card.Title>
                                    <Card.Text className="text-muted small">
                                        {producto.descripcionCorta}
                                    </Card.Text>
                                    <Card.Text className="h5 text-primary mt-auto">
                                        ${producto.precio.toLocaleString()}
                                    </Card.Text>
                                    <div className="d-grid gap-2 mt-3">
                                        <Link to={`/producto/${producto.idProducto}`} className="btn btn-outline-primary">
                                            Ver Detalles
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Catalogo;
