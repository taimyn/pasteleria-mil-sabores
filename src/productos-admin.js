
import { useEffect, useState } from 'react';
import { listaProductos } from './productos';

const CLAVE = 'productosMilSaboresReact';

// Obtener productos guardados
export function leerProductos() {
    try {
        const datos = localStorage.getItem(CLAVE);

        if (!datos) {
            return listaProductos;
        }

        const productos = JSON.parse(datos);

        return Array.isArray(productos)
            ? productos
            : listaProductos;
    } catch {
        return listaProductos;
    }
}

// Guardar productos
export function guardarProductos(productos) {
    localStorage.setItem(
        CLAVE,
        JSON.stringify(productos)
    );

    window.dispatchEvent(
        new Event('productos-actualizados')
    );
}

// Actualizar productos en React
export function useProductos() {
    const [productos, setProductos] = useState(leerProductos);

    useEffect(() => {
        function actualizar() {
            setProductos(leerProductos());
        }

        window.addEventListener(
            'productos-actualizados',
            actualizar
        );

        window.addEventListener('storage', actualizar);

        return () => {
            window.removeEventListener(
                'productos-actualizados',
                actualizar
            );

            window.removeEventListener('storage', actualizar);
        };
    }, []);

    return productos;
}
