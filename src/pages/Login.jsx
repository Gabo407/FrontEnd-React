import React, { useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
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
      setLoading(true);
      const resultado = await login(formData.email, formData.password);
      setLoading(false);
      
      if (resultado.success) {
        navigate('/productos');
      } else {
        setLoginError(resultado.mensaje || 'Error al iniciar sesión');
      }
    }
  };

  return (
    <Container className="my-4" style={{ maxWidth: '520px' }}>
      <h1 className="h3 text-center mb-4">Ingresar</h1>
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
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="usuario@email.com"
            isInvalid={!!errors.email}
            disabled={loading}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña *</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Tu contraseña"
            isInvalid={!!errors.password}
            disabled={loading}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid">
          <Button type="submit" disabled={loading} size="lg">
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </div>

        <p className="text-center mt-3">
          ¿No tienes cuenta? <Link to="/registrar">Regístrate aquí</Link>
        </p>
      </Form>
    </Container>
  );
}

export default Login;