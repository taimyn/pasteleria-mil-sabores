const CLAVE_CARRITO = "carritoMilSabores";

export function agregarAlCarrito(producto, precio = producto.precio) {
    let carrito = [];

    try {
        const guardado = JSON.parse(
            localStorage.getItem(CLAVE_CARRITO) || "[]"
        );

        if (Array.isArray(guardado)) {
            carrito = guardado;
        }
    } catch {
        carrito = [];
    }

    const encontrado = carrito.find(
        item => item.codigo === producto.codigo
    );

    if (encontrado) {
        encontrado.cantidad += 1;
    } else {
        carrito.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: Number(precio),
            cantidad: 1
        });
    }

    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );

    alert(producto.nombre + " agregado al carrito");
}