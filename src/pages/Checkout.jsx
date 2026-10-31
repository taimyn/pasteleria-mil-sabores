import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout({
  carrito = [],
  finalizarCompra,
  usuarioActual = null
}) {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    nombre: usuarioActual?.nombre || "",
    correo: usuarioActual?.correo || "",
    telefono: "",
    direccion: "",
    comuna: "",
    observaciones: ""
  });

  const [error, setError] = useState("");

  // CALCULAR TOTAL DEL PEDIDO
  const total = carrito.reduce(
    (suma, producto) =>
      suma + producto.precio * producto.cantidad,
    0
  );

  // ACTUALIZAR LOS CAMPOS DEL FORMULARIO
  const cambiarDato = (evento) => {
    const { name, value } = evento.target;

    setDatos((anteriores) => ({
      ...anteriores,
      [name]: value
    }));

    setError("");
  };

  // VALIDAR LOS DATOS DEL CLIENTE
  const validarDatos = () => {
    if (datos.nombre.trim().length < 3) {
      return "El nombre debe tener al menos 3 caracteres.";
    }

    const correoValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correoValido.test(datos.correo.trim())) {
      return "Ingresa un correo electrónico válido.";
    }

    const telefonoLimpio = datos.telefono.replace(
      /[\s()-]/g,
      ""
    );

    if (!/^\+?\d{8,12}$/.test(telefonoLimpio)) {
      return "Ingresa un teléfono válido de 8 a 12 dígitos.";
    }

    if (datos.direccion.trim().length < 5) {
      return "Ingresa una dirección válida.";
    }

    if (datos.comuna.trim().length < 2) {
      return "Ingresa una comuna válida.";
    }

    return "";
  };

  // CONFIRMAR PEDIDO
  const confirmarPedido = (evento) => {
    evento.preventDefault();

    if (carrito.length === 0) {
      setError("No puedes realizar un pedido con el carrito vacío.");
      return;
    }

    const mensajeError = validarDatos();

    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    const numeroPedido = Date.now()
      .toString()
      .slice(-6);

    const pedido = {
      numeroPedido,
      nombre: datos.nombre.trim(),
      correo: datos.correo.trim(),
      telefono: datos.telefono.trim(),
      direccion: datos.direccion.trim(),
      comuna: datos.comuna.trim(),
      observaciones: datos.observaciones.trim(),
      productos: carrito.map((producto) => ({
        ...producto
      })),
      total
    };

    // SIMULACIÓN DE COMPRA
    finalizarCompra();

    navigate("/confirmacion", {
      state: pedido
    });
  };

  // CARRITO VACÍO
  if (carrito.length === 0) {
    return (
      <section className="container seccion text-center">
        <h1 className="titulo-seccion">
          Tu carrito está vacío
        </h1>

        <p className="texto-suave">
          Agrega productos antes de finalizar la compra.
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
    <>
      {/* ENCABEZADO */}
      <section className="seccion-verde py-5">
        <div className="container text-center">
          <p className="etiqueta">
            PASTELERÍA MIL SABORES
          </p>

          <h1 className="titulo-seccion">
            Finalizar compra
          </h1>

          <p className="texto-suave">
            Completa tus datos para confirmar el pedido.
          </p>
        </div>
      </section>

      <section className="container seccion">
        <div className="row g-5">

          {/* DATOS DEL CLIENTE */}
          <div className="col-lg-7">
            <h2 className="mb-4">
              Datos del cliente
            </h2>

            {usuarioActual && (
              <div className="alert alert-success">
                Has iniciado sesión como{" "}
                <strong>{usuarioActual.nombre}</strong>.
                Tus datos se han completado automáticamente.
              </div>
            )}

            {/* MENSAJE DE ERROR */}
            {error && (
              <div
                className="alert alert-danger"
                role="alert"
              >
                {error}
              </div>
            )}

            <form onSubmit={confirmarPedido}>

              {/* NOMBRE */}
              <div className="mb-3">
                <label
                  htmlFor="nombre"
                  className="form-label"
                >
                  Nombre completo
                </label>

                <input
                  id="nombre"
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={datos.nombre}
                  onChange={cambiarDato}
                  minLength={3}
                  required
                />
              </div>

              {/* CORREO */}
              <div className="mb-3">
                <label
                  htmlFor="correo"
                  className="form-label"
                >
                  Correo electrónico
                </label>

                <input
                  id="correo"
                  type="email"
                  className="form-control"
                  name="correo"
                  value={datos.correo}
                  onChange={cambiarDato}
                  required
                />
              </div>

              {/* TELÉFONO */}
              <div className="mb-3">
                <label
                  htmlFor="telefono"
                  className="form-label"
                >
                  Teléfono
                </label>

                <input
                  id="telefono"
                  type="tel"
                  className="form-control"
                  name="telefono"
                  value={datos.telefono}
                  onChange={cambiarDato}
                  placeholder="912345678"
                  required
                />
              </div>

              {/* DIRECCIÓN */}
              <div className="mb-3">
                <label
                  htmlFor="direccion"
                  className="form-label"
                >
                  Dirección de entrega
                </label>

                <input
                  id="direccion"
                  type="text"
                  className="form-control"
                  name="direccion"
                  value={datos.direccion}
                  onChange={cambiarDato}
                  placeholder="Calle y número"
                  required
                />
              </div>

              {/* COMUNA */}
              <div className="mb-3">
                <label
                  htmlFor="comuna"
                  className="form-label"
                >
                  Comuna
                </label>

                <input
                  id="comuna"
                  type="text"
                  className="form-control"
                  name="comuna"
                  value={datos.comuna}
                  onChange={cambiarDato}
                  placeholder="Ejemplo: Melipilla"
                  required
                />
              </div>

              {/* OBSERVACIONES */}
              <div className="mb-4">
                <label
                  htmlFor="observaciones"
                  className="form-label"
                >
                  Observaciones del pedido (opcional)
                </label>

                <textarea
                  id="observaciones"
                  className="form-control"
                  name="observaciones"
                  rows={3}
                  value={datos.observaciones}
                  onChange={cambiarDato}
                  placeholder="Indicaciones para la entrega"
                />
              </div>

              <button
                type="submit"
                className="btn-verde"
              >
                Confirmar pedido
              </button>

            </form>
          </div>

          {/* RESUMEN DEL PEDIDO */}
          <div className="col-lg-5">
            <div className="producto-card p-4">

              <h3 className="mb-4">
                Resumen del pedido
              </h3>

              {carrito.map((producto) => (
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

              <h3 className="producto-precio">
                Total: ${total.toLocaleString("es-CL")}
              </h3>

              <p className="texto-suave mt-3">
                Esta es una compra de demostración.
                No se realizará ningún cobro ni se enviará
                el pedido a la pastelería.
              </p>

              <Link
                to="/carrito"
                className="d-block mt-3"
              >
                Volver al carrito
              </Link>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Checkout;