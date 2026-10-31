
import { productos as productosIniciales } from "../data/productos";

const CLAVE_PRODUCTOS = "productosMilSabores";

// LEER PRODUCTOS
export function obtenerProductos() {
  try {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS);

    if (guardados !== null) {
      const datos = JSON.parse(guardados);

      if (Array.isArray(datos)) {
        return datos;
      }
    }
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }

  return productosIniciales.map((producto) => ({ ...producto }));
}

// GUARDAR PRODUCTOS
export function guardarProductos(productos) {
  localStorage.setItem(
    CLAVE_PRODUCTOS,
    JSON.stringify(productos)
  );
}

// CREAR PRODUCTO
export function crearProducto(productos, nuevoProducto) {
  const nuevoId =
    productos.length > 0
      ? Math.max(...productos.map((producto) => producto.id)) + 1
      : 1;

  const producto = {
    ...nuevoProducto,
    id: nuevoId,
    precio: Number(nuevoProducto.precio)
  };

  return [...productos, producto];
}

// ACTUALIZAR PRODUCTO
export function actualizarProducto(productos, id, datosActualizados) {
  return productos.map((producto) => {
    if (producto.id === id) {
      return {
        ...producto,
        ...datosActualizados,
        id,
        precio: Number(datosActualizados.precio)
      };
    }

    return producto;
  });
}

// ELIMINAR PRODUCTO
export function eliminarProducto(productos, id) {
  return productos.filter((producto) => producto.id !== id);
}