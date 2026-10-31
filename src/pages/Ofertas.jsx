import { useState } from "react";
import { Link } from "react-router-dom";
import { productos as productosIniciales } from "../data/productos";
import { calcularPrecioOferta } from "../utils/tienda";

function Ofertas({
  agregarAlCarrito,
  productos = productosIniciales
}) {
  const [mensaje, setMensaje] = useState("");

  // PRODUCTOS QUE TIENEN DESCUENTO
  const ofertas = [
    { id: 1, descuento: 15 },
    { id: 3, descuento: 20 },
    { id: 5, descuento: 10 }
  ];

  // AGREGAR PRODUCTO CON PRECIO DE OFERTA
  const agregarOferta = (producto, precioOferta) => {
    agregarAlCarrito({
      ...producto,
      precio: precioOferta
    });

    setMensaje(
      `${producto.nombre} agregado al carrito.`
    );
  };

  return (
    <section className="seccion">
      <div className="container">

        {/* ENCABEZADO */}
        <div className="text-center mb-5">
          <span className="etiqueta">
            Precios especiales
          </span>

          <h1 className="titulo-seccion">
            Ofertas para endulzar tu día
          </h1>

          <p className="texto-suave">
            Descubre nuestros productos seleccionados.
          </p>
        </div>

        {/* MENSAJE DE CONFIRMACIÓN */}
        {mensaje && (
          <div
            className="alert alert-success text-center mb-4"
            role="status"
          >
            {mensaje}
          </div>
        )}

        {/* PRODUCTOS EN OFERTA */}
        <div className="row g-4">
          {ofertas.map((oferta) => {
            const producto = productos.find(
              (p) => p.id === oferta.id
            );

            // Si el producto fue eliminado, no se muestra.
            if (!producto) {
              return null;
            }

            // CALCULAR PRECIO CON DESCUENTO
            const precioOferta = calcularPrecioOferta(
              producto.precio,
              oferta.descuento
            );

            return (
              <div
                className="col-md-4"
                key={oferta.id}
              >
                <div className="producto-card h-100 d-flex flex-column">

                  {/* IMAGEN */}
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="producto-imagen"
                  />

                  <div className="p-4 d-flex flex-column flex-grow-1">

                    {/* DESCUENTO */}
                    <span className="oferta-etiqueta">
                      {oferta.descuento}% de descuento
                    </span>

                    {/* NOMBRE */}
                    <h4 className="mt-3">
                      {producto.nombre}
                    </h4>

                    {/* PRECIO ORIGINAL */}
                    <p className="precio-anterior mb-1">
                      ${producto.precio.toLocaleString("es-CL")}
                    </p>

                    {/* PRECIO CON DESCUENTO */}
                    <p className="producto-precio">
                      ${precioOferta.toLocaleString("es-CL")}
                    </p>

                    {/* VER DETALLE */}
                    <Link
                      to={`/productos/${producto.id}`}
                      className="btn-verde text-center mt-auto"
                    >
                      Ver producto →
                    </Link>

                    {/* AGREGAR AL CARRITO */}
                    <button
                      type="button"
                      className="btn-verde mt-3"
                      onClick={() =>
                        agregarOferta(producto, precioOferta)
                      }
                    >
                      Agregar al carrito
                    </button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Ofertas;