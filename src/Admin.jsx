
import React, { useState } from 'react';
import { useProductos, guardarProductos } from './productos-admin';

const moneda = n => '$' + Number(n).toLocaleString('es-CL');

// Datos iniciales del formulario
const formularioVacio = {
    codigo: '',
    nombre: '',
    categoria: '',
    precio: '',
    descripcion: '',
    imagen: 'images/imagestortachocolate.jpg'
};

// Panel de administracion
export default function Admin() {
    const productos = useProductos();

    const [formulario, setFormulario] = useState(formularioVacio);
    const [editando, setEditando] = useState(false);
    const [mensaje, setMensaje] = useState('');

    // Actualizar campos
    function cambiarCampo(e) {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    }

    // Limpiar formulario
    function limpiar() {
        setFormulario(formularioVacio);
        setEditando(false);
    }

    // Agregar o actualizar producto
    function guardar(e) {
        e.preventDefault();

        const codigo = formulario.codigo.trim().toUpperCase();
        const precio = Number(formulario.precio);

        if (!codigo || !formulario.nombre.trim() ||
            !formulario.categoria.trim() ||
            !formulario.descripcion.trim() ||
            !Number.isFinite(precio) || precio <= 0) {
            setMensaje('Completa correctamente todos los campos.');
            return;
        }

        if (!editando && productos.some(p => p.codigo === codigo)) {
            setMensaje('Ya existe un producto con ese código.');
            return;
        }

        const producto = {
            codigo: codigo,
            nombre: formulario.nombre.trim(),
            categoria: formulario.categoria.trim(),
            precio: precio,
            descripcion: formulario.descripcion.trim(),
            imagen: formulario.imagen.trim() ||
                'images/imagestortachocolate.jpg'
        };

        if (editando) {
            const actualizados = productos.map(p =>
                p.codigo === codigo ? producto : p
            );

            guardarProductos(actualizados);
            setMensaje('Producto actualizado correctamente.');
        } else {
            guardarProductos([...productos, producto]);
            setMensaje('Producto agregado correctamente.');
        }

        limpiar();
    }

    // Seleccionar producto para editar
    function editar(producto) {
        setFormulario({
            ...producto,
            precio: String(producto.precio)
        });

        setEditando(true);
        setMensaje('');
        window.scrollTo(0, 0);
    }

    // Eliminar producto
    function eliminar(codigo) {
        const confirmar = window.confirm(
            '¿Deseas eliminar este producto?'
        );

        if (!confirmar) {
            return;
        }

        const actualizados = productos.filter(
            p => p.codigo !== codigo
        );

        guardarProductos(actualizados);
        limpiar();
        setMensaje('Producto eliminado correctamente.');
    }

    return (
        <main className="container py-4">

            <h2>Panel de administración</h2>

            <p>
                Gestión de productos de Pastelería Mil Sabores.
            </p>

            <h3>
                {editando ? 'Editar producto' : 'Agregar producto'}
            </h3>

            {mensaje && (
                <div className="alert alert-secondary">
                    {mensaje}
                </div>
            )}

            <form className="row g-3" onSubmit={guardar}>

                <div className="col-md-6">
                    <label className="form-label">
                        Código
                    </label>

                    <input
                        className="form-control"
                        name="codigo"
                        value={formulario.codigo}
                        onChange={cambiarCampo}
                        readOnly={editando}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">
                        Nombre
                    </label>

                    <input
                        className="form-control"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={cambiarCampo}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">
                        Categoría
                    </label>

                    <input
                        className="form-control"
                        name="categoria"
                        value={formulario.categoria}
                        onChange={cambiarCampo}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">
                        Precio
                    </label>

                    <input
                        className="form-control"
                        type="number"
                        min="1"
                        name="precio"
                        value={formulario.precio}
                        onChange={cambiarCampo}
                        required
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">
                        Descripción
                    </label>

                    <textarea
                        className="form-control"
                        name="descripcion"
                        value={formulario.descripcion}
                        onChange={cambiarCampo}
                        required
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">
                        Ruta de la imagen
                    </label>

                    <input
                        className="form-control"
                        name="imagen"
                        value={formulario.imagen}
                        onChange={cambiarCampo}
                        placeholder="images/imagestortachocolate.jpg"
                    />

                    <small className="text-muted">
                        Escribe la ruta de una imagen existente
                        dentro de la carpeta public/images.
                    </small>
                </div>

                <div className="col-12 d-flex gap-2">

                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        {editando
                            ? 'Guardar cambios'
                            : 'Agregar producto'}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={limpiar}
                    >
                        Cancelar
                    </button>

                </div>
            </form>

            <hr className="my-4" />

            <h3>Lista de productos ({productos.length})</h3>

            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">

                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productos.map(p => (
                            <tr key={p.codigo}>
                                <td>{p.codigo}</td>
                                <td>{p.nombre}</td>
                                <td>{p.categoria}</td>
                                <td>{moneda(p.precio)}</td>

                                <td>
                                    <div className="d-flex gap-2">

                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => editar(p)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => eliminar(p.codigo)}
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

        </main>
    );
}
