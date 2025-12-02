import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', correo: '', asunto: '', mensaje: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (form.nombre.length > 100) {
      newErrors.nombre = 'El nombre no puede tener más de 100 caracteres';
    }

    if (form.correo && !validarEmail(form.correo)) {
      newErrors.correo = 'El correo no es válido';
    } else if (form.correo.length > 100) {
      newErrors.correo = 'El correo no puede tener más de 100 caracteres';
    }

    if (!form.asunto.trim()) {
      newErrors.asunto = 'El asunto es requerido';
    }

    if (!form.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    } else if (form.mensaje.length > 1000) {
      newErrors.mensaje = 'El mensaje no puede tener más de 1000 caracteres';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      setForm({ nombre: '', correo: '', asunto: '', mensaje: '' });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <>
      <section className="bg-light py-5">
        <Container>
          <h1 className="h3 mb-4">Contacto</h1>
          <p className="lead mb-0">
            ¿Tienes preguntas? Nos encantaría escucharte. Completa el formulario y nos pondremos en contacto pronto.
          </p>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="g-4">
            <Col md={8}>
              {success && (
                <Alert variant="success" className="mb-4" dismissible onClose={() => setSuccess(false)}>
                  ✓ Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto pronto.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="nombre">Nombre *</Form.Label>
                  <Form.Control 
                    id="nombre" 
                    value={form.nombre} 
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="Tu nombre completo"
                    isInvalid={!!errors.nombre}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="correo">Correo</Form.Label>
                  <Form.Control 
                    id="correo" 
                    type="email"
                    value={form.correo} 
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="tu@email.com"
                    isInvalid={!!errors.correo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.correo}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="asunto">Asunto *</Form.Label>
                  <Form.Control 
                    id="asunto"
                    value={form.asunto} 
                    onChange={handleChange}
                    placeholder="Asunto de tu consulta"
                    isInvalid={!!errors.asunto}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.asunto}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label htmlFor="mensaje">Mensaje *</Form.Label>
                  <Form.Control 
                    as="textarea"
                    id="mensaje" 
                    value={form.mensaje} 
                    onChange={handleChange}
                    rows={6}
                    maxLength={1000}
                    placeholder="Escriba su mensaje aquí..."
                    isInvalid={!!errors.mensaje}
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.mensaje}
                  </Form.Control.Feedback>
                  <small className="text-muted d-block mt-2">
                    {form.mensaje.length}/1000 caracteres
                  </small>
                </Form.Group>

                <Button type="submit" variant="primary" size="lg" className="w-100">
                  Enviar Mensaje
                </Button>
              </Form>
            </Col>

            <Col md={4}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <h6 className="text-primary mb-3">📍 Ubicación</h6>
                  <p className="small mb-0">
                    DataFixComp<br/>
                    Santiago, Chile
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <h6 className="text-primary mb-3">📞 Teléfono</h6>
                  <p className="small mb-0">
                    +56 9 XXXX XXXX
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <h6 className="text-primary mb-3">📧 Email</h6>
                  <p className="small mb-0">
                    contacto@datafixcomp.cl
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h6 className="text-primary mb-3">⏰ Horarios</h6>
                  <p className="small mb-2">
                    <strong>Lunes - Viernes:</strong><br/>
                    9:00 AM - 6:00 PM
                  </p>
                  <p className="small mb-0">
                    <strong>Sábados:</strong><br/>
                    10:00 AM - 2:00 PM
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}