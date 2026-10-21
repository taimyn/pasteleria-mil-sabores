
import { Link } from "react-router-dom";
import { productos } from "../data/productos";

function Ofertas() {
  // Ofertas de ejemplo: confirmar descuentos con el equipo.
  const ofertas = [
    { id: 1, descuento: 15 },
    { id: 3, descuento: 20 },
    { id: 5, descuento: 10 }
  ];

  return (
    <section className="seccion">
      <div className="container">
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

        <div className="row g-4">
          {ofertas.map((oferta) => {
            const producto = productos.find(
              (p) => p.id === oferta.id
            );

            if (!producto) return null;

            const precioOferta = Math.round(
              producto.precio * (1 - oferta.descuento / 100)
            );

            return (
              <div className="col-md-4" key={oferta.id}>
                <div className="producto-card h-100">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="producto-imagen"
                  />

                  <div className="p-4">
                    <span className="oferta-etiqueta">
                      {oferta.descuento}% de descuento
                    </span>

                    <h4 className="mt-3">
                      {producto.nombre}
                    </h4>

                    <p className="precio-anterior mb-1">
                      ${producto.precio.toLocaleString("es-CL")}
                    </p>

                    <p className="producto-precio">
                      ${precioOferta.toLocaleString("es-CL")}
                    </p>

                    <Link
                      to={`/productos/${producto.id}`}
                      className="btn-verde text-center"
                    >
                      Ver producto →
                    </Link>
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
