import { Link } from "react-router-dom";
import { calcularTotal } from "../utils/tienda";

function Carrito({
  carrito,
  agregarAlCarrito,
  disminuirCantidad,
  eliminarDelCarrito
}) {

  // Calculamos el total usando la función probada con Jasmine.
  const total = calcularTotal(carrito);

  return (
    <>
      <section className="seccion-verde py-5">
        <div className="container text-center">
          <p className="etiqueta">
            PASTELERÍA MIL SABORES
          </p>

          <h1 className="titulo-seccion">
            Mi carrito de compras
          </h1>

          <p className="texto-suave">
            Revisa los productos que seleccionaste.
          </p>
        </div>
      </section>

      <section className="container seccion">
        {carrito.length === 0 ? (
          <div className="text-center">
            <h3>Tu carrito está vacío</h3>

            <p className="texto-suave my-4">
              ¡Agrega algo delicioso de nuestra pastelería!
            </p>

            <Link
              to="/productos"
              className="btn-verde"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {carrito.map((producto) => (
                <div
                  className="col-12"
                  key={`${producto.id}-${producto.precio}`}
                >
                  <div className="producto-card p-4">
                    <div className="row align-items-center g-3">

                      {/* IMAGEN DEL PRODUCTO */}
                      <div className="col-md-2 text-center">
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "12px"
                          }}
                        />
                      </div>

                      {/* NOMBRE Y PRECIO */}
                      <div className="col-md-4">
                        <h4>
                          {producto.nombre}
                        </h4>

                        <p className="producto-precio">
                          ${producto.precio.toLocaleString("es-CL")}
                        </p>
                      </div>

                      {/* CANTIDAD */}
                      <div className="col-md-3 text-center">
                        <p>Cantidad</p>

                        <div className="d-flex justify-content-center align-items-center gap-3">

                          {/* DISMINUIR CANTIDAD */}
                          <button
                            type="button"
                            className="categoria-btn"
                            onClick={() =>
                              disminuirCantidad(
                                producto.id,
                                producto.precio
                              )
                            }
                          >
                            -
                          </button>

                          <strong>
                            {producto.cantidad}
                          </strong>

                          {/* AUMENTAR CANTIDAD */}
                          <button
                            type="button"
                            className="categoria-btn"
                            onClick={() =>
                              agregarAlCarrito(producto)
                            }
                          >
                            +
                          </button>

                        </div>
                      </div>

                      {/* SUBTOTAL Y ELIMINAR */}
                      <div className="col-md-3 text-center">
                        <p className="producto-precio">
                          ${(producto.precio * producto.cantidad).toLocaleString("es-CL")}
                        </p>

                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() =>
                            eliminarDelCarrito(
                              producto.id,
                              producto.precio
                            )
                          }
                        >
                          Eliminar
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL DE LA COMPRA */}
            <div className="text-end mt-5">
              <h2 className="titulo-seccion">
                Total: ${total.toLocaleString("es-CL")}
              </h2>

              <div className="d-flex flex-wrap justify-content-end gap-3 mt-4">

                <Link
                  to="/productos"
                  className="btn-verde"
                >
                  Seguir comprando
                </Link>

                <Link
                  to="/checkout"
                  className="btn-verde"
                >
                  Finalizar compra
                </Link>

              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Carrito;