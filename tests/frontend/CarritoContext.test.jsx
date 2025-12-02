import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CarritoProvider, useCarrito } from './CarritoContext';
import { AuthProvider } from './AuthContext';
import { deleteCookie, getCookie } from '../utils/cookieUtils';

// Componente de prueba
function TestCarritoComponent() {
  const { items, itemCount, agregarAlCarrito, quitarDelCarrito, vaciarCarrito } = useCarrito();

  return (
    <div>
      <div data-testid="item-count">{itemCount}</div>
      <div data-testid="items">{JSON.stringify(items)}</div>
      <button onClick={() => agregarAlCarrito(1)}>Agregar 1</button>
      <button onClick={() => agregarAlCarrito(2)}>Agregar 2</button>
      <button onClick={() => quitarDelCarrito(1)}>Quitar 1</button>
      <button onClick={vaciarCarrito}>Vaciar</button>
    </div>
  );
}

describe('CarritoContext', () => {
  beforeEach(() => {
    deleteCookie('carrito');
    deleteCookie('authToken');
    deleteCookie('usuario');
  });

  it('debe inicializar con carrito vacío', async () => {
    render(
      <AuthProvider>
        <CarritoProvider>
          <TestCarritoComponent />
        </CarritoProvider>
      </AuthProvider>
    );

    const itemCount = screen.getByTestId('item-count');
    expect(itemCount.textContent).toBe('0');
  });

  it('debe agregar items al carrito', async () => {
    render(
      <AuthProvider>
        <CarritoProvider>
          <TestCarritoComponent />
        </CarritoProvider>
      </AuthProvider>
    );

    const agregarBtn = screen.getAllByText('Agregar 1')[0];
    fireEvent.click(agregarBtn);

    await waitFor(() => {
      const itemCount = screen.getByTestId('item-count');
      expect(itemCount.textContent).toBe('1');
    });
  });

  it('debe guardar el carrito en Cookies', async () => {
    render(
      <AuthProvider>
        <CarritoProvider>
          <TestCarritoComponent />
        </CarritoProvider>
      </AuthProvider>
    );

    const agregarBtn = screen.getAllByText('Agregar 1')[0];
    fireEvent.click(agregarBtn);

    await waitFor(() => {
      const cookie = getCookie('carrito');
      expect(cookie).not.toBeNull();
      const carrito = JSON.parse(cookie);
      expect(carrito.length).toBe(1);
      expect(carrito[0].id).toBe(1);
    });
  });
});
