import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Productos from "./pages/Productos";
import CartView from "./pages/CartView";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/ingresar" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/productos" element={<ProtectedRoute><Productos /></ProtectedRoute>} />
            <Route path="/carrito" element={<ProtectedRoute><CartView /></ProtectedRoute>} />
            <Route path="/nosotros" element={<ProtectedRoute><Nosotros /></ProtectedRoute>} />
            <Route path="/contacto" element={<ProtectedRoute><Contacto /></ProtectedRoute>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
