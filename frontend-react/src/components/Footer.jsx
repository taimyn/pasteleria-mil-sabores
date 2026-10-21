
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-pasteleria">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <h4>🌿 Pastelería Mil Sabores</h4>
            <p className="mt-3">
              Un rincón dulce para compartir
              momentos especiales.
            </p>
          </div>

          <div className="col-md-3">
            <h4 className="fs-5">Explora</h4>
            <div className="d-flex flex-column gap-2 mt-3">
              <Link to="/" className="text-white">
                Inicio
              </Link>
              <Link to="/productos" className="text-white">
                Productos
              </Link>
              <Link to="/ofertas" className="text-white">
                Ofertas
              </Link>
            </div>
          </div>

          <div className="col-md-3">
            <h4 className="fs-5">Nuestra esencia</h4>
            <p className="mt-3">
              Sabores para celebrar, compartir y disfrutar.
            </p>
          </div>
        </div>

        <hr className="my-4" />

        <p className="text-center mb-0">
          © {new Date().getFullYear()} Pastelería Mil Sabores
        </p>
      </div>
    </footer>
  );
}

export default Footer;
