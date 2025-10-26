import React, { useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'El correo es requerido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const success = login(formData.email, formData.password);
      if (success) {
        navigate('/productos');
      } else {
        setLoginError('Credenciales incorrectas. Use gabr.pina@duocuc.cl / 123321');
      }
    }
  };

  return (
    <Container className="my-4" style={{ maxWidth: '520px' }}>
      <h1 className="h3 text-center">Ingresar</h1>
      {loginError && (
        <Alert variant="danger" className="my-3">
          {loginError}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Correo *</Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            maxLength={100}
            placeholder="usuario@duoc.cl / profesor.duoc.cl / gmail.com"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña *</Form.Label>
          <Form.Control
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            maxLength={10}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid">
          <Button type="submit">Ingresar</Button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;