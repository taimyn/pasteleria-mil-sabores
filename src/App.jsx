import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Ofertas from "./pages/Ofertas";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import Confirmacion from "./pages/Confirmacion";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Administracion from "./pages/Administracion";

import { agregarProducto } from "./utils/tienda";

import {
  obtenerProductos,
  guardarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "./utils/gestionProductos";

function App() {
  // PRODUCTOS
  const [productos, setProductos] = useState(obtenerProductos);

  useEffect(() => {
    guardarProductos(productos);
  }, [productos]);

  const agregarNuevoProducto = (nuevoProducto) => {
    setProductos((actuales) =>
      crearProducto(actuales, nuevoProducto)
    );
  };

  const editarProducto = (id, datosActualizados) => {
    setProductos((actuales) =>
      actualizarProducto(actuales, id, datosActualizados)
    );
  };

  const borrarProducto = (id) => {
    setProductos((actuales) =>
      eliminarProducto(actuales, id)
    );
  };

  // USUARIOS
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);

  const registrarUsuario = (nuevoUsuario) => {
    setUsuarios((actuales) => [
      ...actuales,
      nuevoUsuario
    ]);
  };

  const iniciarSesion = (usuario) => {
    setUsuarioActual({
      nombre: usuario.nombre,
      correo: usuario.correo
    });
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
  };

  // CARRITO
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem(
        "carritoMilSabores"
      );

      const datos = guardado
        ? JSON.parse(guardado)
        : [];

      return Array.isArray(datos) ? datos : [];
    } catch (error) {
      console.error(
        "Error al recuperar el carrito:",
        error
      );

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "carritoMilSabores",
      JSON.stringify(carrito)
    );
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((actual) =>
      agregarProducto(actual, producto)
    );
  };

  const disminuirCantidad = (id, precio) => {
    setCarrito((actual) =>
      actual
        .map((item) =>
          item.id === id &&
          item.precio === precio
            ? {
                ...item,
                cantidad: item.cantidad - 1
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id, precio) => {
    setCarrito((actual) =>
      actual.filter(
        (item) =>
          !(
            item.id === id &&
            item.precio === precio
          )
      )
    );
  };

  const finalizarCompra = () => {
    setCarrito([]);
  };

  return (
    <>
      {/* BARRA DE NAVEGACIÓN */}
      <Navbar
        carrito={carrito}
        usuarioActual={usuarioActual}
        cerrarSesion={cerrarSesion}
      />

      <main>
        <Routes>

          {/* INICIO */}
          <Route
            path="/"
            element={<Inicio />}
          />

          {/* PRODUCTOS */}
          <Route
            path="/productos"
            element={
              <Productos
                productos={productos}
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          {/* OFERTAS */}
          <Route
            path="/ofertas"
            element={
              <Ofertas
                productos={productos}
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          {/* DETALLE DEL PRODUCTO */}
          <Route
            path="/productos/:id"
            element={
              <DetalleProducto
                productos={productos}
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          {/* CARRITO */}
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                agregarAlCarrito={agregarAlCarrito}
                disminuirCantidad={disminuirCantidad}
                eliminarDelCarrito={eliminarDelCarrito}
              />
            }
          />

          {/* FINALIZAR COMPRA */}
          <Route
            path="/checkout"
            element={
              <Checkout
                carrito={carrito}
                finalizarCompra={finalizarCompra}
                usuarioActual={usuarioActual}
              />
            }
          />

          {/* CONFIRMACIÓN */}
          <Route
            path="/confirmacion"
            element={<Confirmacion />}
          />

          {/* INICIAR SESIÓN */}
          <Route
            path="/login"
            element={
              <Login
                usuarios={usuarios}
                iniciarSesion={iniciarSesion}
                usuarioActual={usuarioActual}
              />
            }
          />

          {/* REGISTRO */}
          <Route
            path="/registro"
            element={
              <Registro
                usuarios={usuarios}
                registrarUsuario={registrarUsuario}
              />
            }
          />

          {/* ADMINISTRACIÓN */}
          <Route
            path="/administracion"
            element={
              <Administracion
                productos={productos}
                agregarNuevoProducto={agregarNuevoProducto}
                editarProducto={editarProducto}
                borrarProducto={borrarProducto}
              />
            }
          />

        </Routes>
      </main>

      {/* PIE DE PÁGINA */}
      <Footer />
    </>
  );
}

export default App;