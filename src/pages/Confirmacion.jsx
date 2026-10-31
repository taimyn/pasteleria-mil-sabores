import { Link, useLocation } from "react-router-dom";

function Confirmacion() {
  const location = useLocation();
  const pedido = location.state;

  if (!pedido) {
    return (
      <section className="container seccion text-center">
        <h1 className="titulo-seccion">
          No hay un pedido para mostrar
        </h1>

        <p className="texto-suave">
          Todavía no has confirmado ninguna compra.
        </p>

        <Link
          to="/productos"
          className="btn-verde d-inline-block mt-3"
        >
          Ver productos
        </Link>
      </section>
    );
  }

  return (
    <section className="container seccion">
      <div
        className="producto-card p-4 p-md-5 mx-auto"
        style={{ maxWidth: "750px" }}
      >
        {/* CONFIRMACIÓN */}
        <div className="text-center">
          <p className="etiqueta">
            PASTELERÍA MIL SABORES
          </p>

          <h1 className="titulo-seccion">
            Pedido confirmado
          </h1>

          <p className="fs-5 mt-4">
            Muchas gracias por tu compra,{" "}
            <strong>{pedido.nombre}</strong>.
          </p>

          <p className="mt-4">
            Tu número de pedido es:
          </p>

          <h2 className="producto-precio">
            #{pedido.numeroPedido}
          </h2>
        </div>

        <hr className="my-4" />

        {/* DATOS DE ENTREGA */}
        <h3 className="mb-3">
          Datos de entrega
        </h3>

        <p>
          <strong>Nombre:</strong> {pedido.nombre}
        </p>

        <p>
          <strong>Correo:</strong> {pedido.correo}
        </p>

        <p>
          <strong>Teléfono:</strong> {pedido.telefono}
        </p>

        <p>
          <strong>Dirección:</strong> {pedido.direccion}
        </p>

        <p>
          <strong>Comuna:</strong> {pedido.comuna}
        </p>

        {pedido.observaciones && (
          <p>
            <strong>Observaciones:</strong>{" "}
            {pedido.observaciones}
          </p>
        )}

        <hr className="my-4" />

        {/* PRODUCTOS COMPRADOS */}
        <h3 className="mb-3">
          Productos del pedido
        </h3>

        {pedido.productos?.map((producto) => (
          <div
            key={`${producto.id}-${producto.precio}`}
            className="d-flex justify-content-between mb-3 gap-3"
          >
            <span>
              {producto.nombre} x {producto.cantidad}
            </span>

            <strong>
              $
              {(
                producto.precio * producto.cantidad
              ).toLocaleString("es-CL")}
            </strong>
          </div>
        ))}

        <hr />

        {/* TOTAL */}
        <div className="text-center">
          <p className="mt-4">
            Total del pedido:
          </p>

          <h2 className="producto-precio">
            ${pedido.total.toLocaleString("es-CL")}
          </h2>

          <p className="texto-suave mt-4">
            Esta confirmación es una simulación.
            No se ha enviado ningún correo,
            no se ha registrado un pedido real
            ni se ha realizado ningún cobro.
          </p>

          <Link
            to="/"
            className="btn-verde d-inline-block mt-4"
          >
            Volver al inicio
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Confirmacion;