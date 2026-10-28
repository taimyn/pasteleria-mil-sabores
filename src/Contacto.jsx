
import React, { useState } from 'react';

export default function Contacto() {
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    comentario: ''
  });

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function cambiar(e) {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
    setEnviado(false);
  }

  function enviar(e) {
    e.preventDefault();

    const dominiosValidos = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    const nuevosErrores = {
      nombre: datos.nombre.trim() === '',
      correo: !dominiosValidos.test(datos.correo.trim()),
      comentario: datos.comentario.trim() === ''
    };

    setErrores(nuevosErrores);

    if (Object.values(nuevosErrores).some(error => error)) {
      setEnviado(false);
      return;
    }

    setEnviado(true);
    setDatos({
      nombre: '',
      correo: '',
      comentario: ''
    });
    setErrores({});
  }

  return (
    <main className="container py-4">
      <h2>Contáctanos</h2>
      <p>¿Tienes dudas o quieres hacer un pedido especial? Escríbenos.</p>

      {enviado && (
        <div className="alert alert-success">
          ¡Gracias! Tu mensaje fue validado correctamente.
        </div>
      )}

      <form className="formulario" onSubmit={enviar} noValidate>

        <div className={'campo ' + (errores.nombre ? 'invalido' : '')}>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            maxLength="100"
            value={datos.nombre}
            onChange={cambiar}
          />
          {errores.nombre && (
            <span className="text-danger">
              Por favor ingresa tu nombre.
            </span>
          )}
        </div>

        <div className={'campo ' + (errores.correo ? 'invalido' : '')}>
          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            maxLength="100"
            value={datos.correo}
            onChange={cambiar}
          />
          {errores.correo && (
            <span className="text-danger">
              Ingresa un correo válido.
            </span>
          )}
          <small>
            Solo aceptamos @duoc.cl, @profesor.duoc.cl o @gmail.com
          </small>
        </div>

        <div className={'campo ' + (errores.comentario ? 'invalido' : '')}>
          <label htmlFor="comentario">Comentario</label>
          <textarea
            id="comentario"
            name="comentario"
            rows="5"
            maxLength="500"
            value={datos.comentario}
            onChange={cambiar}
          />
          {errores.comentario && (
            <span className="text-danger">
              Por favor escribe un comentario.
            </span>
          )}
        </div>

        <button type="submit" className="btn btn-success">
          Enviar mensaje
        </button>

      </form>
    </main>
  );
}
