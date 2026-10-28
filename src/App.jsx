import React, { useState } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { listaProductos } from './productos';
import { agregarAlCarrito } from './carrito-react';
import Checkout, { ResultadoCompra } from './Checkout';
import Admin from './Admin';
import { useProductos } from './productos-admin';
import Nosotros from './Nosotros';
import Contacto from './Contacto';
import Blogs, { BlogDetalle } from './Blogs';



import {
  descuentos,
  obtenerCategorias,
  filtrarProductos,
  calcularPrecioOferta,
  obtenerOfertas,
  buscarProducto
} from './catalogo-utils';

const moneda = n => '$' + Number(n).toLocaleString('es-CL');

// MENU PRINCIPAL
function Cabecera() {
  return (
    <header>
      <h1>Pastelería Mil Sabores</h1>

      <nav className="menu">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/ofertas">Ofertas</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/contacto">Contacto</Link>
        <a href="/login.html">Iniciar sesión</a>
        <a href="/registro.html">Registrarme</a>
        <a href="/carrito.html">Carrito</a>
        <Link to="/admin">Administración</Link>
      </nav>
    </header>
  );
}

// PIE DE PAGINA
function Pie() {
  return (
    <footer>
      <p>Pastelería Mil Sabores · Repostería artesanal</p>
    </footer>
  );
}

// TARJETA DE PRODUCTOS
function Tarjeta({ p, oferta = false }) {
  const descuento = oferta ? (descuentos[p.codigo] || 0) : 0;

  const precioFinal = descuento > 0
    ? calcularPrecioOferta(p.precio, descuento)
    : p.precio;

  return (
    <article className="tarjeta-react">

      <Link to={'/productos/' + p.codigo}>
        <img
          src={'/' + p.imagen}
          width="220"
          height="200"
          alt={p.nombre}
        />
      </Link>

      <h3>{p.nombre}</h3>
      <p>{p.descripcion}</p>

      {descuento > 0 ? (
        <>
          <span className="descuento">-{descuento}%</span>
          <p className="precio-anterior">
            {moneda(p.precio)}
          </p>
          <p><strong>{moneda(precioFinal)}</strong></p>
        </>
      ) : (
        <p><strong>{moneda(p.precio)}</strong></p>
      )}

      <Link to={'/productos/' + p.codigo}>
        Ver detalle →
      </Link>

      <div className="mt-3">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => agregarAlCarrito(p, precioFinal)}
        >
          Añadir al carrito
        </button>
      </div>

    </article>
  );
}

// PAGINA DE INICIO
function Inicio() {
    const listaProductos = useProductos();
    const destacados = [
        'TC001',
        'TT001',
        'PI002',
        'TE001'
    ]
    .map(c => listaProductos.find(p => p.codigo === c))
    .filter(Boolean);

  return (
    <main>
      <section id="aboutUs">
        <h2>
          Celebra la dulzura de la vida con Pastelería Mil Sabores
        </h2>

        <p>
          Pastelería 1000 Sabores celebra su 50° aniversario
          como un referente en la repostería chilena.
          Famosa por su participación en un récord Guinness
          en 1995, cuando colaboró en la creación de la
          torta más grande del mundo, la pastelería busca
          renovar su sistema de ventas online para ofrecer
          una experiencia de compra moderna y accesible
          para sus clientes.
        </p>

        <p>
          Nuestra misión es ofrecer una experiencia dulce
          y memorable a nuestros clientes, proporcionando
          tortas y productos de repostería de alta calidad
          para todas las ocasiones, mientras celebramos
          nuestras raíces históricas y fomentando la
          creatividad en la repostería.
        </p>
      </section>

      <h2>Nuestros productos destacados</h2>

      <section id="productos">
        {destacados.map(p => (
          <Tarjeta key={p.codigo} p={p} />
        ))}
      </section>

      <p className="ver-todos">
        <Link to="/productos">
          Ver todos los productos →
        </Link>
      </p>

      <p className="enlace-ofertas">
        <Link to="/ofertas">
          Ver ofertas especiales →
        </Link>
      </p>
    </main>
  );
}

// PAGINA DE PRODUCTOS
function Productos() {
    const listaProductos = useProductos();
    const [categoria, setCategoria] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');

  const categorias = obtenerCategorias(listaProductos);

  const filtrados = filtrarProductos(
    listaProductos,
    categoria,
    busqueda
  );

  return (
    <main className="contenedor-react">
      <h2>Nuestros productos</h2>

      <div className="filtros">
        {categorias.map(c => (
          <button
            key={c}
            className={categoria === c ? 'activo' : ''}
            onClick={() => setCategoria(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="aviso">
        <input
          aria-label="Buscar productos"
          placeholder="Buscar productos"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      <section id="productos">
        {filtrados.map(p => (
          <Tarjeta key={p.codigo} p={p} />
        ))}
      </section>

      {filtrados.length === 0 && (
        <p className="aviso">
          No encontramos productos.
        </p>
      )}
    </main>
  );
}

// PAGINA DE OFERTAS
function Ofertas() {
    const listaProductos = useProductos();
    return (
    <main className="contenedor-react">
      <h2>Ofertas especiales</h2>

      <p className="aviso">
        Descuentos de ejemplo para la evaluación.
      </p>

      <section id="productos">
        {obtenerOfertas(listaProductos).map(p => (
          <Tarjeta
            key={p.codigo}
            p={p}
            oferta={true}
          />
        ))}
      </section>
    </main>
  );
}

// DETALLE DEL PRODUCTO
function Detalle() {
    const listaProductos = useProductos();
    const { codigo } = useParams();

  const p = buscarProducto(listaProductos, codigo);

  if (!p) {
    return (
      <main>
        <h2>Producto no encontrado</h2>
        <Link to="/productos">Volver</Link>
      </main>
    );
  }

  return (
    <main>
      <div className="detalle-react">
        <img
          src={'/' + p.imagen}
          alt={p.nombre}
        />

        <div>
          <Link to="/productos">
            ← Volver al catálogo
          </Link>

          <p>{p.categoria}</p>
          <h2>{p.nombre}</h2>
          <p>{p.descripcion}</p>
          <h3>{moneda(p.precio)}</h3>
          <p>Código: {p.codigo}</p>

          <button
            type="button"
            className="btn btn-success"
            onClick={() => agregarAlCarrito(p)}
          >
            Añadir al carrito
          </button>

          <div className="mt-3">
            <a href="/carrito.html">
              Ir al carrito
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}


// RUTAS PRINCIPALES
export default function App() {
    return (
        <>
            <Cabecera />

            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/ofertas" element={<Ofertas />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<BlogDetalle />} />


                <Route
                    path="/productos/:codigo"
                    element={<Detalle />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/compra-exitosa"
                    element={<ResultadoCompra exitosa={true} />}
                />

                <Route
                    path="/pago-fallido"
                    element={<ResultadoCompra exitosa={false} />}
                />

                // Panel de administracion
                <Route
                    path="/admin"
                    element={<Admin />}
                />

                <Route path="*" element={<Inicio />} />
            </Routes>

            <Pie />
        </>
    );
}
