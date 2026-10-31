
import { useRef } from "react";
import { Link } from "react-router-dom";
import { productos } from "../data/productos";
import ProductoCard from "../components/ProductoCard";

function Inicio() {
  const galeriaRef = useRef(null);

  const imagenes = [
    {
      src: "/images/galletas_avena.jpg",
      alt: "Galletas artesanales",
    },
    {
      src: "/images/cheescacke_sinazucar.jpg",
      alt: "Cheesecake artesanal",
    },
    {
      src: "/images/imagestortachocolate.jpg",
      alt: "Torta de chocolate",
    },
    {
      src: "/images/brownie_chocolate.jpg",
      alt: "Brownie de chocolate",
    },
    {
      src: "/images/torta_frutas.jpg",
      alt: "Torta de frutas",
    },
    {
      src: "/images/torta_matrimonio.jpg",
      alt: "Torta de matrimonio",
    },
  ];

  function moverGaleria(direccion) {
    if (galeriaRef.current) {
      const ancho = galeriaRef.current.clientWidth / 5;

      galeriaRef.current.scrollBy({
        left: direccion * ancho,
        behavior: "smooth",
      });
    }
  }

  return (
    <main>
      {/* PORTADA PRINCIPAL */}
      <section className="inicio-portada">
        <div className="container inicio-contenido">
          <p className="inicio-subtitulo">
            PASTELERÍA ARTESANAL · MIL SABORES
          </p>

          <h1 className="inicio-titulo">
            Pequeños dulces,
            <br />
            grandes momentos.
          </h1>

          <p className="inicio-descripcion">
            Hecho con cariño, ingredientes especiales
            y mucho sabor para compartir.
          </p>

          <Link to="/productos" className="inicio-boton">
            EXPLORAR PRODUCTOS <span>↗</span>
          </Link>
        </div>
      </section>

      {/* GALERÍA DE FOTOGRAFÍAS */}
      <section className="inicio-galeria-seccion">
        <div className="inicio-galeria" ref={galeriaRef}>
          {imagenes.map((imagen, index) => (
            <div className="inicio-foto" key={index}>
              <img src={imagen.src} alt={imagen.alt} />
            </div>
          ))}
        </div>

        <div className="inicio-galeria-controles">
          <button
            type="button"
            onClick={() => moverGaleria(-1)}
            aria-label="Ver fotografías anteriores"
          >
            ←
          </button>

          <span>UN POQUITO DE NUESTRO MUNDO</span>

          <button
            type="button"
            onClick={() => moverGaleria(1)}
            aria-label="Ver fotografías siguientes"
          >
            →
          </button>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="container seccion">
        <div className="text-center mb-5">
          <p className="etiqueta">HECHOS CON AMOR</p>

          <h2 className="titulo-seccion">
            Nuestros favoritos
          </h2>

          <p className="texto-suave">
            Descubre algunos de los sabores que tenemos para ti.
          </p>
        </div>

        <div className="row g-4">
          {productos.slice(0, 3).map((producto) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={producto.id}
            >
              <ProductoCard producto={producto} />
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/productos" className="btn-verde">
            VER TODOS LOS PRODUCTOS
          </Link>
        </div>
      </section>

      {/* BANNER DE OFERTAS */}
      <section className="container mb-5">
        <div className="inicio-banner">
          <p className="etiqueta">ALGO ESPECIAL PARA TI</p>

          <h2>Un dulce siempre alegra el día.</h2>

          <p>
            Conoce nuestras ofertas y encuentra
            algo rico para compartir.
          </p>

          <Link to="/ofertas" className="inicio-boton">
            VER OFERTAS ↗
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Inicio;
