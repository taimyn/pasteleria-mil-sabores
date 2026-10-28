
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CLAVE_CARRITO = 'carritoMilSabores';
const moneda = n => '$' + Number(n).toLocaleString('es-CL');

function leerCarrito() {
  try {
    const datos = JSON.parse(
      localStorage.getItem(CLAVE_CARRITO) || '[]'
    );

    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

export default function Carrito() {
  const [carrito, setCarrito] = useState(leerCarrito);

  function guardarCarrito(productos) {
    localStorage.setItem(
      CLAVE_CARRITO,
      JSON.stringify(productos)
    );

    setCarrito(productos);
  }

  function cambiarCantidad(codigo, cambio) {
    const productos = carrito
      .map(p => p.codigo === codigo
        ? { ...p, cantidad: Number(p.cantidad) + cambio }
        : p
      )
      .filter(p => p.cantidad > 0);

    guardarCarrito(productos);
  }

  function eliminarProducto(codigo) {
    const productos = carrito.filter(
      p => p.codigo !== codigo
    );

    guardarCarrito(productos);
  }

  const total = carrito.reduce(
    (suma, p) => suma + Number(p.precio) * Number(p.cantidad),
    0
  );

  return (
    <main className="container py-4">
      <h2>Mi carrito de compras</h2>

      {carrito.length === 0 ? (
        <div>
          <p>Tu carrito está vacío.</p>
          <Link to="/productos" className="btn btn-secondary">
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {carrito.map(p => (
                  <tr key={p.codigo}>
                    <td>{p.nombre}</td>
                    <td>{moneda(p.precio)}</td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => cambiarCantidad(p.codigo, -1)}
                        >
                          -
                        </button>

                        <span>{p.cantidad}</span>

                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => cambiarCantidad(p.codigo, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>
                      {moneda(Number(p.precio) * Number(p.cantidad))}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarProducto(p.codigo)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Total: {moneda(total)}</h3>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <Link to="/productos" className="btn btn-secondary">
              Seguir comprando
            </Link>

            <Link to="/checkout" className="btn btn-success">
              Finalizar compra
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
