
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [abierto, setAbierto] = useState(false);

  const cerrarMenu = () => setAbierto(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-pasteleria sticky-top">
      <div className="container">
        <NavLink
          to="/"
          className="navbar-brand marca-pasteleria"
          onClick={cerrarMenu}
        >
          🌿 Mil Sabores
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

        <div className={`collapse navbar-collapse ${abierto ? "show" : ""}`}>
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
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
