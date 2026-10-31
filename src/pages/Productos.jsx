import { useState } from "react";
import { productos as productosIniciales } from "../data/productos";
import ProductoCard from "../components/ProductoCard";

function Productos({
  agregarAlCarrito,
  productos = productosIniciales
}) {
  const [categoria, setCategoria] = useState("Todos");

  const categorias = [
    "Todos",
    "Tortas",
    "Postres",
    "Galletas",
    "Croissants",
    "Macarons",
    "Cupcakes"
  ];

  const productosFiltrados =
    categoria === "Todos"
      ? productos
      : productos.filter(
          (producto) => producto.categoria === categoria
        );

  return (
    <main>
      {/* ENCABEZADO */}
      <section className="seccion-verde py-5">
        <div className="container text-center">
          <p className="etiqueta">
            PASTELERÍA MIL SABORES
          </p>

          <h1 className="titulo-seccion">
            Nuestros productos
          </h1>

          <p className="texto-suave">
            Descubre nuestras tortas, postres,
            galletas y delicias artesanales.
          </p>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section className="container seccion">

        {/* FILTROS DE CATEGORÍAS */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {categorias.map((opcion) => (
            <button
              key={opcion}
              type="button"
              className={
                categoria === opcion
                  ? "categoria-btn activo"
                  : "categoria-btn"
              }
              onClick={() => setCategoria(opcion)}
            >
              {opcion}
            </button>
          ))}
        </div>

        {/* CANTIDAD DE PRODUCTOS */}
        <p className="texto-suave mb-4">
          Mostrando {productosFiltrados.length} productos
        </p>

        {/* TARJETAS DE PRODUCTOS */}
        <div className="row g-4">
          {productosFiltrados.map((producto) => (
            <div
              className="col-12 col-sm-6 col-lg-4"
              key={producto.id}
            >
              <ProductoCard
                producto={producto}
                agregarAlCarrito={agregarAlCarrito}
              />
            </div>
          ))}
        </div>

        {/* MENSAJE SI NO HAY PRODUCTOS */}
        {productosFiltrados.length === 0 && (
          <div className="text-center py-5">
            <h3>No hay productos disponibles</h3>
            <p className="texto-suave">
              Actualmente no tenemos productos
              en esta categoría.
            </p>
          </div>
        )}

      </section>
    </main>
  );
}

export default Productos;