import axios from 'axios';

// En producción usar variables de entorno de Vite (VITE_...); en desarrollo caerá al proxy relativo
const USUARIO_API = import.meta.env.VITE_USUARIO_API || '/api/v1/usuarios';
const PRODUCTO_API = import.meta.env.VITE_PRODUCTO_API || '/api/v1/productos';


// Configuración global de Axios para incluir credenciales (cookies)
axios.defaults.withCredentials = true;

// ============ USUARIO SERVICE ============

export const usuarioService = {
  // Registro de nuevo usuario
  registrar: async (email, password, nombre, apellido) => {
    try {
      const response = await axios.post(`${USUARIO_API}/registro`, {
        email,
        password,
        nombre,
        apellido,
        estado: true
      });
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        mensaje: error.response?.data?.mensaje || 'Error al registrar usuario'
      };
    }
  },

  // Login
  login: async (email, password) => {
    try {
      const response = await axios.post(`${USUARIO_API}/login`, {
        email,
        password
      });
      // El token se guarda automáticamente en una HttpOnly Cookie enviada por el backend
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        mensaje: error.response?.data?.mensaje || 'Error al iniciar sesión'
      };
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await axios.post(`${USUARIO_API}/logout`);
      return response.data;
    } catch (error) {
      console.error("Error en logout", error);
      return { success: false };
    }
  },

  // Verificar sesión (obtener usuario actual)
  checkSession: async () => {
    try {
      const response = await axios.get(`${USUARIO_API}/me`);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 401,
        data: null
      };
    }
  },

  // Obtener usuario por ID
  obtenerPorId: async (idUsuario) => {
    try {
      const response = await axios.get(`${USUARIO_API}/${idUsuario}`);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        mensaje: error.response?.data?.mensaje || 'Error al obtener usuario'
      };
    }
  },

  // Obtener usuario por email
  obtenerPorEmail: async (email) => {
    try {
      const response = await axios.get(`${USUARIO_API}/email/${email}`);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        mensaje: error.response?.data?.mensaje || 'Error al obtener usuario'
      };
    }
  },

  // Obtener todos los usuarios
  obtenerTodos: async () => {
    try {
      const response = await axios.get(USUARIO_API);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        data: [],
        mensaje: error.response?.data?.mensaje || 'Error al obtener usuarios'
      };
    }
  },

  // Actualizar usuario
  actualizar: async (idUsuario, datos) => {
    try {
      const response = await axios.put(`${USUARIO_API}/${idUsuario}`, datos);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        mensaje: error.response?.data?.mensaje || 'Error al actualizar usuario'
      };
    }
  },

  // Eliminar usuario
  eliminar: async (idUsuario) => {
    try {
      const response = await axios.delete(`${USUARIO_API}/${idUsuario}`);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        mensaje: error.response?.data?.mensaje || 'Error al eliminar usuario'
      };
    }
  }
};

// ============ PRODUCTO SERVICE ============

export const productoService = {
  // Crear producto
  crear: async (producto) => {
    try {
      const response = await axios.post(PRODUCTO_API, producto);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        mensaje: error.response?.data?.mensaje || 'Error al crear producto'
      };
    }
  },

  // Obtener producto por ID
  obtenerPorId: async (idProducto) => {
    try {
      const response = await axios.get(`${PRODUCTO_API}/${idProducto}`);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        data: null,
        mensaje: error.response?.data?.mensaje || 'Error al obtener producto'
      };
    }
  },

  // Obtener todos los productos
  obtenerTodos: async () => {
    try {
      const response = await axios.get(PRODUCTO_API);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        data: [],
        mensaje: error.response?.data?.mensaje || 'Error al obtener productos'
      };
    }
  },

  // Obtener productos activos
  obtenerActivos: async () => {
    try {
      const response = await axios.get(`${PRODUCTO_API}/activos`);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        data: [],
        mensaje: error.response?.data?.mensaje || 'Error al obtener productos'
      };
    }
  },

  // Obtener productos activos por categoría
  obtenerActivosPorCategoria: async (categoria) => {
    try {
      const response = await axios.get(`${PRODUCTO_API}/activos/categoria/${categoria}`);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        data: [],
        mensaje: error.response?.data?.mensaje || 'Error al obtener productos por categoría'
      };
    }
  },

  // Obtener producto por código
  obtenerPorCodigo: async (codigo) => {
    try {
      const response = await axios.get(`${PRODUCTO_API}/codigo/${codigo}`);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        data: null,
        mensaje: error.response?.data?.mensaje || 'Error al obtener producto'
      };
    }
  },

  // Actualizar producto
  actualizar: async (idProducto, datos) => {
    try {
      const response = await axios.put(`${PRODUCTO_API}/${idProducto}`, datos);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        mensaje: error.response?.data?.mensaje || 'Error al actualizar producto'
      };
    }
  },

  // Actualizar stock
  actualizarStock: async (idProducto, cantidad) => {
    try {
      const response = await axios.put(`${PRODUCTO_API}/${idProducto}/stock?cantidad=${cantidad}`, {});
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        mensaje: error.response?.data?.mensaje || 'Error al actualizar stock'
      };
    }
  },

  // Eliminar producto
  eliminar: async (idProducto) => {
    try {
      const response = await axios.delete(`${PRODUCTO_API}/${idProducto}`);
      return response.data;
    } catch (error) {
      return {
        codigo: error.response?.status || 500,
        mensaje: error.response?.data?.mensaje || 'Error al eliminar producto'
      };
    }
  }
};

export default {
  usuarioService,
  productoService
};
