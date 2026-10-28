
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const moneda = n => '$' + Number(n).toLocaleString('es-CL');

// Leer los productos del carrito
function leerCarrito() {
    try {
        const datos = JSON.parse(
            localStorage.getItem('carritoMilSabores') || '[]'
        );

        return Array.isArray(datos) ? datos : [];
    } catch {
        return [];
    }
}

// Formulario de compra
export default function Checkout() {
    const navegar = useNavigate();
    const [carrito] = useState(leerCarrito);

    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        direccion: '',
        comuna: '',
        entrega: 'domicilio'
    });

    const total = carrito.reduce(
        (suma, item) =>
            suma + Number(item.precio) * Number(item.cantidad),
        0
    );

    // Actualizar formulario
    function actualizar(e) {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    // Finalizar compra
    function finalizar(e) {
        e.preventDefault();

        const resultado = e.nativeEvent.submitter?.value || 'exito';

        const compra = {
            numero: Date.now(),
            cliente: datos,
            productos: carrito,
            total: total,
            fecha: new Date().toLocaleString('es-CL')
        };

        sessionStorage.setItem(
            'ultimaCompraMilSabores',
            JSON.stringify(compra)
        );

        if (resultado === 'exito') {
            localStorage.removeItem('carritoMilSabores');
            navegar('/compra-exitosa');
        } else {
            navegar('/pago-fallido');
        }
    }

    if (carrito.length === 0) {
        return (
            <main className="container py-4">
                <h2>Finalizar compra</h2>
                <p>Tu carrito está vacío.</p>
                <Link to="/productos">Ver productos</Link>
            </main>
        );
    }

    return (
        <main className="container py-4">
            <h2>Finalizar compra</h2>

            <p>Completa tus datos para realizar el pedido.</p>

            <div className="alert alert-info">
                Compra de demostración: no se cobrará dinero real.
            </div>

            <form className="row g-3" onSubmit={finalizar}>

                <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input
                        className="form-control"
                        name="nombre"
                        value={datos.nombre}
                        onChange={actualizar}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Apellido</label>
                    <input
                        className="form-control"
                        name="apellido"
                        value={datos.apellido}
                        onChange={actualizar}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Correo electrónico</label>
                    <input
                        className="form-control"
                        type="email"
                        name="correo"
                        value={datos.correo}
                        onChange={actualizar}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input
                        className="form-control"
                        type="tel"
                        name="telefono"
                        value={datos.telefono}
                        onChange={actualizar}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Tipo de entrega</label>

                    <select
                        className="form-select"
                        name="entrega"
                        value={datos.entrega}
                        onChange={actualizar}
                    >
                        <option value="domicilio">
                            Despacho a domicilio
                        </option>

                        <option value="retiro">
                            Retiro en tienda
                        </option>
                    </select>
                </div>

                {datos.entrega === 'domicilio' && (
                    <>
                        <div className="col-md-6">
                            <label className="form-label">Comuna</label>
                            <input
                                className="form-control"
                                name="comuna"
                                value={datos.comuna}
                                onChange={actualizar}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">
                                Dirección de entrega
                            </label>

                            <input
                                className="form-control"
                                name="direccion"
                                value={datos.direccion}
                                onChange={actualizar}
                                required
                            />
                        </div>
                    </>
                )}

                <div className="col-12">
                    <h3>Total: {moneda(total)}</h3>

                    <p>
                        El costo de envío no está incluido
                        en esta simulación.
                    </p>

                    <div className="d-flex flex-wrap gap-2">
                        <button
                            className="btn btn-success"
                            type="submit"
                            value="exito"
                        >
                            Simular compra exitosa
                        </button>

                        <button
                            className="btn btn-outline-danger"
                            type="submit"
                            value="fallo"
                        >
                            Simular pago fallido
                        </button>
                    </div>
                </div>

            </form>
        </main>
    );
}

// Mostrar resultado de compra
export function ResultadoCompra({ exitosa }) {
    let compra = null;

    try {
        compra = JSON.parse(
            sessionStorage.getItem('ultimaCompraMilSabores') || 'null'
        );
    } catch {
        compra = null;
    }

    if (!compra) {
        return (
            <main className="container py-4">
                <h2>No hay una compra reciente</h2>
                <Link to="/productos">Volver a productos</Link>
            </main>
        );
    }

    return (
        <main className="container py-4">

            <div className={
                'alert ' +
                (exitosa ? 'alert-success' : 'alert-danger')
            }>
                <h2>
                    {exitosa
                        ? '¡Compra exitosa!'
                        : 'No se pudo realizar el pago'}
                </h2>

                <p>
                    {exitosa
                        ? 'Tu pedido fue confirmado en la demostración.'
                        : 'Tu carrito sigue disponible para volver a intentar.'}
                </p>
            </div>

            <p>
                <strong>Cliente: </strong>
                {compra.cliente.nombre} {compra.cliente.apellido}
            </p>

            <p>
                <strong>Correo: </strong>
                {compra.cliente.correo}
            </p>

            <p>
                <strong>Entrega: </strong>
                {compra.cliente.entrega === 'retiro'
                    ? 'Retiro en tienda'
                    : compra.cliente.direccion + ', ' +
                      compra.cliente.comuna}
            </p>

            <h3>Resumen del pedido</h3>

            <ul>
                {compra.productos.map(p => (
                    <li key={p.codigo}>
                        {p.nombre} × {p.cantidad}
                        {' — '}
                        {moneda(p.precio * p.cantidad)}
                    </li>
                ))}
            </ul>

            <h3>Total: {moneda(compra.total)}</h3>

            <p>
                {exitosa ? (
                    <Link
                        className="btn btn-success"
                        to="/productos"
                    >
                        Seguir comprando
                    </Link>
                ) : (
                    <Link
                        className="btn btn-warning"
                        to="/checkout"
                    >
                        Reintentar pago
                    </Link>
                )}
            </p>

            <small>
                Resultado simulado para la evaluación académica.
            </small>

        </main>
    );
}
