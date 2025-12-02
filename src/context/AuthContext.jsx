import React, { createContext, useContext, useState, useEffect } from 'react';
import { usuarioService } from '../services/api';
import { setCookie, getCookie, deleteCookie } from '../utils/cookieUtils';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde el backend al inicializar
  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const resultado = await usuarioService.checkSession();
        if (resultado && resultado.codigo === 200 && resultado.data) {
          setUser(resultado.data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verificarSesion();
  }, []);

  const registro = async (email, password, nombre, apellido) => {
    try {
      const resultado = await usuarioService.registrar(email, password, nombre, apellido);

      if (resultado.codigo === 201) {
        return { success: true, mensaje: 'Usuario registrado exitosamente' };
      } else if (resultado.codigo === 409) {
        return { success: false, mensaje: 'El email ya está registrado' };
      } else {
        return { success: false, mensaje: resultado.mensaje || 'Error al registrar' };
      }
    } catch (error) {
      return { success: false, mensaje: 'Error en la solicitud de registro' };
    }
  };

  const login = async (email, password) => {
    try {
      const resultado = await usuarioService.login(email, password);

      if (resultado && resultado.codigo === 200 && resultado.data) {
        setIsAuthenticated(true);
        setUser(resultado.data);
        // El token ya está en la cookie HttpOnly
        return { success: true };
      } else {
        return { success: false, mensaje: resultado?.mensaje || 'Credenciales incorrectas' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, mensaje: 'Error en la solicitud de login' };
    }
  };

  const logout = async () => {
    await usuarioService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    registro
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
