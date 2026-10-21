
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Ofertas from "./pages/Ofertas";
import DetalleProducto from "./pages/DetalleProducto";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route
            path="/productos/:id"
            element={<DetalleProducto />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
