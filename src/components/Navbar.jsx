import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar({
  carrito = [],
  usuarioActual,
  cerrarSesion
}) {
  const [abierto, setAbierto] = useState(false);

  const cerrarMenu = () => setAbierto(false);

  const cantidadProductos = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-pasteleria sticky-top">
      <div className="container">

        <NavLink
          to="/"
          className="navbar-brand marca-pasteleria"
          onClick={cerrarMenu}
        >
          Mil Sabores
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            abierto ? "show" : ""
          }`}
        >
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            <NavLink
              to="/"
              end
              className="nav-link"
              onClick={cerrarMenu}
            >
              Inicio
            </NavLink>

            <NavLink
              to="/productos"
              className="nav-link"
              onClick={cerrarMenu}
            >
              Productos
            </NavLink>

            <NavLink
              to="/ofertas"
              className="nav-link"
              onClick={cerrarMenu}
            >
              Ofertas
            </NavLink>

            <NavLink
              to="/carrito"
              className="nav-link"
              onClick={cerrarMenu}
            >
              Carrito ({cantidadProductos})
            </NavLink>

            <NavLink
              to="/administracion"
              className="nav-link"
              onClick={cerrarMenu}
            >
              Administración
            </NavLink>

            {usuarioActual ? (
              <>
                <span className="nav-link">
                  Hola, {usuarioActual.nombre}
                </span>

                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => {
                    cerrarSesion();
                    cerrarMenu();
                  }}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="nav-link"
                  onClick={cerrarMenu}
                >
                  Iniciar sesión
                </NavLink>

                <NavLink
                  to="/registro"
                  className="nav-link"
                  onClick={cerrarMenu}
                >
                  Registro
                </NavLink>
              </>
            )}

          </div> 
        </div>
      </div>
    </nav>
  );
}

export default Navbar;