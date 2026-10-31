import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  validarContrasena,
  correoRegistrado
} from "../utils/tienda";

function Registro({ usuarios, registrarUsuario }) {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    aceptaTerminos: false
  });

  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");

  const cambiarDato = (evento) => {
    const { name, value, type, checked } = evento.target;

    setDatos({
      ...datos,
      [name]: type === "checkbox" ? checked : value
    });

    setError("");
  };

  // Requisitos que se muestran mientras se escribe la contraseña.
  const requisitos = {
    longitud: datos.contrasena.length >= 8,
    mayuscula: /[A-Z]/.test(datos.contrasena),
    minuscula: /[a-z]/.test(datos.contrasena),
    numero: /[0-9]/.test(datos.contrasena),
    especial: /[^A-Za-z0-9]/.test(datos.contrasena)
  };

  const registrar = (evento) => {
    evento.preventDefault();
    setError("");

    const nombre = datos.nombre.trim();
    const correo = datos.correo.trim().toLowerCase();

    // Validar nombre
    if (nombre.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    // Validar correo
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    // Función que ya probamos con Jasmine.
    if (correoRegistrado(usuarios, correo)) {
      setError("Este correo ya tiene una cuenta registrada.");
      return;
    }

    // Función que ya probamos con Jasmine.
    if (!validarContrasena(datos.contrasena)) {
      setError(
        "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    // Validar que las contraseñas coincidan
    if (datos.contrasena !== datos.confirmarContrasena) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Validar términos
    if (!datos.aceptaTerminos) {
      setError("Debes aceptar los términos de la demostración.");
      return;
    }

    // Registrar cuenta de demostración.
    registrarUsuario({
      nombre,
      correo,
      contrasena: datos.contrasena
    });

    // Ir al inicio de sesión.
    navigate("/login");
  };

  const mostrarRequisito = (cumple, texto) => (
    <p
      className={`mb-1 ${cumple ? "text-success" : "text-muted"}`}
    >
      {cumple ? "✓" : "○"} {texto}
    </p>
  );

  return (
    <>
      <section className="seccion-verde py-5">
        <div className="container text-center">
          <p className="etiqueta">
            PASTELERÍA MIL SABORES
          </p>

          <h1 className="titulo-seccion">
            Crear una cuenta
          </h1>

          <p className="texto-suave">
            Regístrate para formar parte de nuestra pastelería.
          </p>
        </div>
      </section>

      <section className="container seccion">
        <div
          className="producto-card p-4 p-md-5 mx-auto"
          style={{ maxWidth: "550px" }}
        >
          <h2 className="text-center mb-4">
            Registro de usuario
          </h2>

          <form onSubmit={registrar}>
            <div className="mb-3">
              <label
                htmlFor="nombreRegistro"
                className="form-label"
              >
                Nombre completo
              </label>

              <input
                id="nombreRegistro"
                type="text"
                name="nombre"
                className="form-control"
                value={datos.nombre}
                onChange={cambiarDato}
                minLength={3}
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="correoRegistro"
                className="form-label"
              >
                Correo electrónico
              </label>

              <input
                id="correoRegistro"
                type="email"
                name="correo"
                className="form-control"
                value={datos.correo}
                onChange={cambiarDato}
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="claveRegistro"
                className="form-label"
              >
                Contraseña
              </label>

              <div className="input-group">
                <input
                  id="claveRegistro"
                  type={mostrarContrasena ? "text" : "password"}
                  name="contrasena"
                  className="form-control"
                  value={datos.contrasena}
                  onChange={cambiarDato}
                  required
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setMostrarContrasena(!mostrarContrasena)
                  }
                >
                  {mostrarContrasena ? "Ocultar" : "Mostrar"}
                </button>
              </div>

              <div className="mt-3 p-3 bg-light rounded">
                <strong>
                  Tu contraseña debe tener:
                </strong>

                <div className="mt-2 small">
                  {mostrarRequisito(
                    requisitos.longitud,
                    "Mínimo 8 caracteres"
                  )}

                  {mostrarRequisito(
                    requisitos.mayuscula,
                    "Una letra mayúscula"
                  )}

                  {mostrarRequisito(
                    requisitos.minuscula,
                    "Una letra minúscula"
                  )}

                  {mostrarRequisito(
                    requisitos.numero,
                    "Un número"
                  )}

                  {mostrarRequisito(
                    requisitos.especial,
                    "Un carácter especial, como @, # o !"
                  )}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="confirmarClave"
                className="form-label"
              >
                Confirmar contraseña
              </label>

              <input
                id="confirmarClave"
                type={mostrarContrasena ? "text" : "password"}
                name="confirmarContrasena"
                className="form-control"
                value={datos.confirmarContrasena}
                onChange={cambiarDato}
                required
              />

              {datos.confirmarContrasena && (
                <small
                  className={
                    datos.contrasena === datos.confirmarContrasena
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {datos.contrasena === datos.confirmarContrasena
                    ? "Las contraseñas coinciden."
                    : "Las contraseñas no coinciden."}
                </small>
              )}
            </div>

            <div className="form-check mb-4">
              <input
                id="terminosRegistro"
                type="checkbox"
                name="aceptaTerminos"
                className="form-check-input"
                checked={datos.aceptaTerminos}
                onChange={cambiarDato}
                required
              />

              <label
                htmlFor="terminosRegistro"
                className="form-check-label"
              >
                Acepto los términos de esta demostración.
              </label>
            </div>

            {error && (
              <div
                className="alert alert-danger"
                role="alert"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-verde w-100"
            >
              Crear cuenta
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Registro;