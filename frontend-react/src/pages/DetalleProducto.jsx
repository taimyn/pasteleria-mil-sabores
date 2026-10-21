
import { Link, useParams } from "react-router-dom";
import { productos } from "../data/productos";

function DetalleProducto() {
  const { id } = useParams();

  const producto = productos.find(
    (p) => p.id === Number(id)
  );

  if (!producto) {
    return (
      <div className="container text-center seccion">
        <h2>Producto no encontrado</h2>
        <p className="texto-suave">
          El producto que buscas no está disponible.
        </p>
        <Link to="/productos" className="btn-verde">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <section className="seccion">
      <div className="container">
        <Link
          to="/productos"
          className="d-inline-block mb-4"
          style={{ color: "#617b68" }}
        >
          ← Volver a productos
        </Link>

        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="detalle-imagen shadow-sm"
            />
          </div>

          <div className="col-lg-6">
            <span className="etiqueta">
              {producto.categoria}
            </span>

            <h1 className="titulo-seccion">
              {producto.nombre}
            </h1>

            <p className="texto-suave fs-5">
              Un delicioso producto de Pastelería
              Mil Sabores para disfrutar en tus
              momentos especiales.
            </p>

            <p className="producto-precio fs-2 my-4">
              ${producto.precio.toLocaleString("es-CL")}
            </p>

            <div className="p-4 rounded-4 mb-4"
                 style={{ background: "#e6eee5" }}>
              <h5>Un dulce momento 🌿</h5>
              <p className="texto-suave mb-0">
                Explora nuestro catálogo para descubrir
                más opciones de tortas, postres y galletas.
              </p>
            </div>

            <Link to="/productos" className="btn-verde">
              Seguir explorando →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetalleProducto;
