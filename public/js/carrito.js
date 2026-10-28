document.addEventListener("DOMContentLoaded", function () {
    mostrarContador();
    mostrarTablaCarrito();
    activarBotonesAgregar();
});

function leerCarrito() {
    const datosGuardados = localStorage.getItem("carritoMilSabores");

    if (datosGuardados === null) {
        return [];
    }

    return JSON.parse(datosGuardados);
}

function guardarCarrito(carrito) {
    localStorage.setItem("carritoMilSabores", JSON.stringify(carrito));
}

function agregarAlCarrito(codigo, nombre, precio) {
    const carrito = leerCarrito();
    let yaEstaEnElCarrito = false;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].codigo === codigo) {
            carrito[i].cantidad = carrito[i].cantidad + 1;
            yaEstaEnElCarrito = true;
        }
    }

    if (yaEstaEnElCarrito === false) {
        const productoNuevo = {
            codigo: codigo,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        };
        carrito.push(productoNuevo);
    }

    guardarCarrito(carrito);
    mostrarContador();
    mostrarTablaCarrito();
}

function quitarDelCarrito(codigo) {
    const carrito = leerCarrito();
    const carritoNuevo = [];

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].codigo !== codigo) {
            carritoNuevo.push(carrito[i]);
        }
    }

    guardarCarrito(carritoNuevo);
    mostrarContador();
    mostrarTablaCarrito();
}

function mostrarContador() {
    const carrito = leerCarrito();
    let totalProductos = 0;

    for (let i = 0; i < carrito.length; i++) {
        totalProductos = totalProductos + carrito[i].cantidad;
    }

    const contador = document.getElementById("contadorCarrito");

    if (contador !== null) {
        contador.textContent = totalProductos;
    }
}

function mostrarTablaCarrito() {
    const contenedor = document.getElementById("contenidoCarrito");

    if (contenedor === null) {
        return;
    }

    const carrito = leerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }

    let total = 0;
    let textoTabla = "<table class='tabla-carrito'>";
    textoTabla = textoTabla + "<tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr>";

    for (let i = 0; i < carrito.length; i++) {
        const codigo = carrito[i].codigo;
        const nombre = carrito[i].nombre;
        const precio = carrito[i].precio;
        const cantidad = carrito[i].cantidad;
        const subtotal = precio * cantidad;
        total = total + subtotal;

        textoTabla = textoTabla + "<tr>";
        textoTabla = textoTabla + "<td>" + nombre + "</td>";
        textoTabla = textoTabla + "<td>$" + precio + "</td>";
        textoTabla = textoTabla + "<td>" + cantidad + "</td>";
        textoTabla = textoTabla + "<td>$" + subtotal + "</td>";
        textoTabla = textoTabla + "<td><button type='button' class='btn btn-quitar' data-codigo='" + codigo + "'>Quitar</button></td>";
        textoTabla = textoTabla + "</tr>";
    }

    textoTabla = textoTabla + "</table>";
    textoTabla = textoTabla + "<p class='total-carrito'><strong>Total: $" + total + "</strong></p>";

    contenedor.innerHTML = textoTabla;

    const botonesQuitar = document.querySelectorAll(".btn-quitar");

    for (let i = 0; i < botonesQuitar.length; i++) {
        botonesQuitar[i].addEventListener("click", function () {
            const codigoProducto = this.getAttribute("data-codigo");
            quitarDelCarrito(codigoProducto);
        });
    }
}

function activarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll(".btn-agregar");

    for (let i = 0; i < botonesAgregar.length; i++) {
        botonesAgregar[i].addEventListener("click", function () {
            const codigo = this.getAttribute("data-codigo");
            const nombre = this.getAttribute("data-nombre");
            const precio = Number(this.getAttribute("data-precio"));
            agregarAlCarrito(codigo, nombre, precio);
        });
    }
}