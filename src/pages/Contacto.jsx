import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.nombre || form.nombre.length > 100) {
      setError('Nombre requerido. Máx 100.');
      return;
    }
    if (form.correo && (!/^(?:[\w-]+\.)*[\w-]+@(?:duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(form.correo) || form.correo.length > 100)) {
      setError('Correo inválido o dominio no permitido.');
      return;
    }
    if (!form.mensaje || form.mensaje.length > 500) {
      setError('Comentario requerido. Máx 500.');
      return;
    }
    setSuccess(true);
    setForm({ nombre: '', correo: '', mensaje: '' });
  };

  return (
    <Container className="my-5">
      <h1 className="h3">Contacto</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Mensaje enviado (demo).</Alert>}
      <Form onSubmit={handleSubmit} className="row g-3">
        <Form.Group className="col-md-6">
          <Form.Label htmlFor="cNombre">Nombre *</Form.Label>
          <Form.Control id="nombre" value={form.nombre} onChange={handleChange} maxLength={100} required />
        </Form.Group>
        <Form.Group className="col-md-6">
          <Form.Label htmlFor="cCorreo">Correo</Form.Label>
          <Form.Control id="correo" value={form.correo} onChange={handleChange} maxLength={100} placeholder="usuario@duoc.cl / profesor.duoc.cl / gmail.com" />
        </Form.Group>
        <Form.Group className="col-12">
          <Form.Label htmlFor="cMensaje">Comentario *</Form.Label>
          <Form.Control as="textarea" id="mensaje" value={form.mensaje} onChange={handleChange} rows={4} maxLength={500} required />
        </Form.Group>
        <Form.Group className="col-12">
          <Button type="submit">Enviar</Button>
        </Form.Group>
      </Form>
    </Container>
  );
}