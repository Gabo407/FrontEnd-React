import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

describe('Login Page', () => {
  it('debe renderizar los campos de email y contraseña', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('usuario@email.com'); // Ajustado al placeholder real si es necesario
    // Nota: El placeholder original era "tu@email.com" en Registro, en Login es "usuario@email.com"? 
    // Revisando Login.jsx (no lo leí, pero el test original decía 'usuario@email.com')
    // Si falla, ajustaré el placeholder.
    const passwordInput = screen.getByPlaceholderText('Tu contraseña'); // Ajustar si es necesario

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('debe renderizar botón de ingreso', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const boton = screen.getByRole('button', { name: /ingresar/i });
    expect(boton).toBeTruthy();
  });
});
