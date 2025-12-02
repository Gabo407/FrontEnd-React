import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productoService } from '../services/api';
import { useCarrito } from '../context/CarritoContext';

function ProductoDetalle() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const { agregarAlCarrito } = useCarrito();
    const navigate = useNavigate();

    useEffect(() => {
        cargarProducto();
    }, [id]);

    const cargarProducto = async () => {
        setLoading(true);
        const resultado = await productoService.obtenerPorId(id);

        if (resultado.codigo === 200) {
            setProducto(resultado.data);
            cargarRecomendaciones(resultado.data);
        } else {
            navigate('/catalogo');
        }
        setLoading(false);
    };

    const cargarRecomendaciones = async (productoActual) => {
        const resultado = await productoService.obtenerActivos();
        if (resultado.codigo === 200) {
            // Filtrar productos de la misma categoría pero con mayor precio
            const recomendados = resultado.data
                .filter(p =>
                    p.categoria === productoActual.categoria &&
                    p.idProducto !== productoActual.idProducto &&
                    p.precio > productoActual.precio
                )
                .sort((a, b) => a.precio - b.precio) // Ordenar por precio ascendente
                .slice(0, 3); // Tomar los primeros 3

            setRecomendaciones(recomendados);
        }
    };

    if (loading || !producto) {
        return (
            <Container className="my-5 text-center">
                <h2>Cargando producto...</h2>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row className="mb-5">
                <Col md={6}>
                    <img
                        src={producto.imagen || 'https://via.placeholder.com/500'}
                        alt={producto.nombre}
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: '500px', width: '100%', objectFit: 'contain' }}
                    />
                </Col>
                <Col md={6}>
                    <div className="p-4">
                        <Badge bg="secondary" className="mb-2">{producto.categoria?.toUpperCase()}</Badge>
                        <h1 className="mb-3">{producto.nombre}</h1>
                        <h3 className="text-primary mb-4">${producto.precio.toLocaleString()}</h3>

                        <p className="lead mb-4">{producto.descripcionCorta}</p>

                        <div className="mb-4">
                            <h5>Descripción Detallada:</h5>
                            <p>{producto.descripcionLarga}</p>
                        </div>

                        <div className="d-grid gap-2">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => agregarAlCarrito(producto)}
                                disabled={producto.stock === 0}
                            >
                                {producto.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>

            {recomendaciones.length > 0 && (
                <div className="mt-5">
                    <h3 className="mb-4">También te podría interesar (Mejores opciones)</h3>
                    <Row xs={1} md={3} className="g-4">
                        {recomendaciones.map((rec) => (
                            <Col key={rec.idProducto}>
                                <Card className="h-100 shadow-sm hover-effect">
                                    <Card.Img
                                        variant="top"
                                        src={rec.imagen || 'https://via.placeholder.com/300'}
                                        style={{ height: '200px', objectFit: 'contain', padding: '1rem' }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{rec.nombre}</Card.Title>
                                        <Card.Text className="text-primary fw-bold">
                                            ${rec.precio.toLocaleString()}
                                        </Card.Text>
                                        <Link to={`/producto/${rec.idProducto}`} className="btn btn-outline-primary w-100">
                                            Ver Opción Superior
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </Container>
    );
}

export default ProductoDetalle;
