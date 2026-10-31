import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ usuarios, iniciarSesion, usuarioActual }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const ingresar = (evento) => {
    evento.preventDefault();

    setError("");
    setMensaje("");

    const correoNormalizado = correo.trim().toLowerCase();

    const usuario = usuarios.find(
      (item) => item.correo === correoNormalizado
    );

    if (!usuario) {
      setError("No existe una cuenta registrada con este correo.");
      return;
    }

    if (usuario.contrasena !== contrasena) {
      setError("La contraseña es incorrecta.");
      return;
    }

    iniciarSesion(usuario);

    setContrasena("");
    setMensaje("¡Inicio de sesión exitoso!");
  };

  if (usuarioActual) {
    return (
      <section className="container seccion text-center">
        <div
          className="producto-card p-5 mx-auto"
          style={{ maxWidth: "550px" }}
        >
          <h1 className="titulo-seccion">
            ¡Bienvenido, {usuarioActual.nombre}!
          </h1>

          <p className="mt-3">
            Has iniciado sesión correctamente.
          </p>

          <Link to="/productos" className="btn-verde">
            Ver productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="seccion-verde py-5">
        <div className="container text-center">
          <p className="etiqueta">PASTELERÍA MIL SABORES</p>

          <h1 className="titulo-seccion">
            Iniciar sesión
          </h1>

          <p className="texto-suave">
            Ingresa con tu cuenta de nuestra pastelería.
          </p>
        </div>
      </section>

      <section className="container seccion">
        <div
          className="producto-card p-4 p-md-5 mx-auto"
          style={{ maxWidth: "500px" }}
        >
          <h2 className="text-center mb-4">
            Bienvenido
          </h2>

          <form onSubmit={ingresar}>
            <div className="mb-3">
              <label htmlFor="correoLogin" className="form-label">
                Correo electrónico
              </label>

              <input
                id="correoLogin"
                type="email"
                className="form-control"
                placeholder="ejemplo@correo.cl"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="claveLogin" className="form-label">
                Contraseña
              </label>

              <div className="input-group">
                <input
                  id="claveLogin"
                  type={mostrarContrasena ? "text" : "password"}
                  className="form-control"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
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
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {mensaje && (
              <div className="alert alert-success" role="status">
                {mensaje}
              </div>
            )}

            <button type="submit" className="btn-verde w-100">
              Iniciar sesión
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            ¿No tienes una cuenta?{" "}
            <Link to="/registro">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;