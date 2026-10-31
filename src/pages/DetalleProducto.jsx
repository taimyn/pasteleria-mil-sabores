import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productos as productosIniciales } from "../data/productos";

function DetalleProducto({
  agregarAlCarrito,
  productos = productosIniciales
}) {
  const { id } = useParams();

  const [mensaje, setMensaje] = useState("");

  // Buscar el producto por su ID
  const producto = productos.find(
    (p) => p.id === Number(id)
  );

  // Si el producto no existe
  if (!producto) {
    return (
      <section className="seccion">
        <div className="container text-center">
          <h2 className="titulo-seccion">
            Producto no encontrado
          </h2>

          <p className="texto-suave">
            El producto que buscas no está disponible.
          </p>

          <Link
            to="/productos"
            className="btn-verde d-inline-block mt-3"
          >
            Volver al catálogo
          </Link>
        </div>
      </section>
    );
  }

  // Agregar el producto al carrito
  const agregarProducto = () => {
    agregarAlCarrito(producto);

    setMensaje("Producto agregado correctamente al carrito.");
  };

  return (
    <section className="seccion">
      <div className="container">

        {/* VOLVER AL CATÁLOGO */}
        <Link
          to="/productos"
          className="d-inline-block mb-4"
          style={{ color: "#617b68" }}
        >
          Volver al catálogo
        </Link>

        <div className="row g-5 align-items-center">

          {/* IMAGEN DEL PRODUCTO */}
          <div className="col-12 col-md-6">
            <div className="producto-card overflow-hidden">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid w-100"
                style={{
                  height: "420px",
                  objectFit: "cover"
                }}
              />
            </div>
          </div>

          {/* INFORMACIÓN DEL PRODUCTO */}
          <div className="col-12 col-md-6">

            <p className="etiqueta">
              PASTELERÍA MIL SABORES
            </p>

            <h1 className="titulo-seccion mb-3">
              {producto.nombre}
            </h1>

            <p className="texto-suave mb-3">
              Categoría: {producto.categoria}
            </p>

            <p className="producto-precio mb-4">
              ${producto.precio.toLocaleString("es-CL")}
            </p>

            <p className="texto-suave mb-4">
              Disfruta de nuestros productos artesanales,
              preparados con dedicación para acompañar
              tus momentos especiales.
            </p>

            {/* MENSAJE DE CONFIRMACIÓN */}
            {mensaje && (
              <div
                className="alert alert-success mb-4"
                role="status"
              >
                {mensaje}
              </div>
            )}

            {/* BOTÓN AGREGAR AL CARRITO */}
            <button
              type="button"
              className="btn-verde"
              onClick={agregarProducto}
            >
              Agregar al carrito
            </button>

            {/* ENLACE AL CARRITO */}
            <div className="mt-4">
              <Link
                to="/carrito"
                style={{ color: "#617b68" }}
              >
                Ver mi carrito
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default DetalleProducto;