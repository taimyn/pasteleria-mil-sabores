
import { Link } from "react-router-dom";

function ProductoCard({ producto }) {
  return (
    <div className="producto-card h-100 d-flex flex-column">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="producto-imagen"
      />

      <div className="p-4 d-flex flex-column flex-grow-1">
        <span className="producto-categoria mb-2">
          {producto.categoria}
        </span>

        <h4 className="mb-3">
          {producto.nombre}
        </h4>

        <p className="producto-precio mb-4">
          ${producto.precio.toLocaleString("es-CL")}
        </p>

        <Link
          to={`/productos/${producto.id}`}
          className="btn-verde text-center mt-auto"
        >
          Ver producto →
        </Link>
      </div>
    </div>
  );
}

export default ProductoCard;
