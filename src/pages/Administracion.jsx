import { useState } from "react";

const formularioVacio = {
  nombre: "",
  precio: "",
  categoria: "Tortas",
  imagen: ""
};

function Administracion({
  productos,
  agregarNuevoProducto,
  editarProducto,
  borrarProducto
}) {
  const [formulario, setFormulario] = useState(formularioVacio);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const categorias = [
    "Tortas",
    "Postres",
    "Galletas",
    "Croissants",
    "Macarons",
    "Cupcakes"
  ];

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const guardarProducto = (evento) => {
    evento.preventDefault();

    if (
      !formulario.nombre.trim() ||
      !formulario.imagen.trim() ||
      formulario.precio === "" ||
      Number(formulario.precio) <= 0 ||
      !Number.isFinite(Number(formulario.precio))
    ) {
      setMensaje("Completa correctamente todos los campos.");
      return;
    }

    const datos = {
      nombre: formulario.nombre.trim(),
      precio: Number(formulario.precio),
      categoria: formulario.categoria,
      imagen: formulario.imagen.trim()
    };

    if (productoEditando !== null) {
      editarProducto(productoEditando, datos);
      setMensaje("Producto actualizado correctamente.");
    } else {
      agregarNuevoProducto(datos);
      setMensaje("Producto agregado correctamente.");
    }

    setFormulario(formularioVacio);
    setProductoEditando(null);
  };

  const seleccionarProducto = (producto) => {
    setProductoEditando(producto.id);

    setFormulario({
      nombre: producto.nombre,
      precio: String(producto.precio),
      categoria: producto.categoria,
      imagen: producto.imagen
    });

    setMensaje("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const eliminar = (producto) => {
    const confirmar = window.confirm(
      `¿Quieres eliminar "${producto.nombre}"?`
    );

    if (confirmar) {
      borrarProducto(producto.id);
      setMensaje("Producto eliminado correctamente.");

      if (productoEditando === producto.id) {
        setFormulario(formularioVacio);
        setProductoEditando(null);
      }
    }
  };

  const cancelarEdicion = () => {
    setFormulario(formularioVacio);
    setProductoEditando(null);
    setMensaje("");
  };

  return (
    <main>
      {/* ENCABEZADO */}
      <section className="seccion-verde py-5">
        <div className="container text-center">
          <p className="etiqueta">
            PASTELERÍA MIL SABORES
          </p>

          <h1 className="titulo-seccion">
            Administración de productos
          </h1>

          <p className="texto-suave">
            Agrega, modifica y elimina los productos
            de nuestra pastelería.
          </p>
        </div>
      </section>

      <section className="container seccion">

        {/* MENSAJES */}
        {mensaje && (
          <div
            className="alert alert-success mb-4"
            role="status"
          >
            {mensaje}
          </div>
        )}

        {/* FORMULARIO */}
        <div className="card border-0 shadow-sm mb-5">
          <div className="card-body p-4">

            <h2 className="mb-4">
              {productoEditando !== null
                ? "Editar producto"
                : "Agregar nuevo producto"}
            </h2>

            <form onSubmit={guardarProducto}>
              <div className="row g-3">

                <div className="col-md-6">
                  <label
                    htmlFor="nombre"
                    className="form-label"
                  >
                    Nombre del producto
                  </label>

                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={formulario.nombre}
                    onChange={cambiarCampo}
                    placeholder="Ejemplo: Torta de Manjar"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="precio"
                    className="form-label"
                  >
                    Precio
                  </label>

                  <input
                    id="precio"
                    type="number"
                    name="precio"
                    className="form-control"
                    value={formulario.precio}
                    onChange={cambiarCampo}
                    placeholder="Ejemplo: 15000"
                    min="1"
                    step="1"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="categoria"
                    className="form-label"
                  >
                    Categoría
                  </label>

                  <select
                    id="categoria"
                    name="categoria"
                    className="form-select"
                    value={formulario.categoria}
                    onChange={cambiarCampo}
                  >
                    {categorias.map((categoria) => (
                      <option
                        key={categoria}
                        value={categoria}
                      >
                        {categoria}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="imagen"
                    className="form-label"
                  >
                    Ruta de la imagen
                  </label>

                  <input
                    id="imagen"
                    type="text"
                    name="imagen"
                    className="form-control"
                    value={formulario.imagen}
                    onChange={cambiarCampo}
                    placeholder="/images/torta_nueva.jpg"
                    required
                  />
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn-verde me-2"
                  >
                    {productoEditando !== null
                      ? "Guardar cambios"
                      : "Agregar producto"}
                  </button>

                  {productoEditando !== null && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={cancelarEdicion}
                    >
                      Cancelar
                    </button>
                  )}
                </div>

              </div>
            </form>
          </div>
        </div>

        {/* LISTADO */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Productos registrados</h2>

          <span className="badge bg-success fs-6">
            {productos.length} productos
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-success">
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      width="75"
                      height="65"
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px"
                      }}
                    />
                  </td>

                  <td>{producto.nombre}</td>

                  <td>{producto.categoria}</td>

                  <td>
                    ${producto.precio.toLocaleString("es-CL")}
                  </td>

                  <td>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={() =>
                          seleccionarProducto(producto)
                        }
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          eliminar(producto)
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {productos.length === 0 && (
          <p className="text-center texto-suave py-4">
            No hay productos registrados.
          </p>
        )}

      </section>
    </main>
  );
}

export default Administracion;