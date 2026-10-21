
import { useState } from "react";
import { productos } from "../data/productos";
import ProductoCard from "../components/ProductoCard";

function Productos() {
  const [categoria, setCategoria] = useState("Todos");

  const categorias = [
    "Todos",
    "Tortas",
    "Postres",
    "Galletas",
    "Croissants",
    "Macarons",
    "Cupcakes",
  ];

  const productosFiltrados =
    categoria === "Todos"
      ? productos
      : productos.filter(
          (producto) => producto.categoria === categoria
        );

  return (
    <main>
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
              <ProductoCard producto={producto} />
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}

export default Productos;
