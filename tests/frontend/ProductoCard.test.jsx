import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductoCard from '../components/ProductoCard';
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from '../context/CarritoContext';
import { AuthProvider } from '../context/AuthContext';

const mockProducto = {
  id: 1,
  codigo: 'TEST001',
  nombre: 'Producto Test',
  descripcion_corta: 'Descripción corta de prueba',
  descripcion_larga: 'Descripción larga de prueba',
  precio: 50000,
  stock: 5,
  imagen: 'test.jpg'
};

describe('ProductoCard', () => {
  it('debe renderizar el nombre del producto', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CarritoProvider>
            <ProductoCard producto={mockProducto} />
          </CarritoProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const titulo = screen.getByText('Producto Test');
    expect(titulo).toBeTruthy();
  });

  it('debe mostrar la descripción corta', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CarritoProvider>
            <ProductoCard producto={mockProducto} />
          </CarritoProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const descripcion = screen.getByText('Descripción corta de prueba');
    expect(descripcion).toBeTruthy();
  });

  it('debe mostrar el precio formateado', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CarritoProvider>
            <ProductoCard producto={mockProducto} />
          </CarritoProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const precio = screen.getByText('$50.000');
    expect(precio).toBeTruthy();
  });

  it('debe mostrar stock disponible', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CarritoProvider>
            <ProductoCard producto={mockProducto} />
          </CarritoProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const stock = screen.getByText('5 disponibles');
    expect(stock).toBeTruthy();
  });

  it('debe deshabilitar botón agregar cuando stock es 0', () => {
    const productoSinStock = { ...mockProducto, stock: 0 };

    render(
      <BrowserRouter>
        <AuthProvider>
          <CarritoProvider>
            <ProductoCard producto={productoSinStock} />
          </CarritoProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const botones = screen.getAllByRole('button');
    const botonAgregar = botones.find(btn => btn.textContent.includes('No disponible'));
    expect(botonAgregar.disabled).toBeTrue();
  });
});
