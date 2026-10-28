document.addEventListener("DOMContentLoaded", function () {

    // Leer el parámetro "codigo" desde la URL
    const parametrosURL = new URLSearchParams(window.location.search);
    const codigoBuscado = parametrosURL.get("codigo");

    // Buscar el producto que tenga ese código
    const producto = listaProductos.find(function (p) {
        return p.codigo === codigoBuscado;
    });

    const contenedor = document.getElementById("detalleProducto");

    // Si no se encontró el producto, mostrar un mensaje y detener todo
    if (producto === undefined) {
        contenedor.innerHTML = "<p>No encontramos ese producto. <a href='productos.html'>Volver al catálogo</a></p>";
        return; 
    }

    // Si sí se encontró, armar el HTML del detalle
    contenedor.innerHTML =
        "<div class='detalle-grid'>" +
            "<img src='" + producto.imagen + "' alt='" + producto.nombre + "' class='detalle-imagen'>" +
            "<div class='detalle-info'>" +
                "<p class='categoria'>" + producto.categoria + "</p>" +
                "<h2>" + producto.nombre + "</h2>" +
                "<p class='detalle-precio'>$" + producto.precio.toLocaleString("es-CL") + "</p>" +
                "<p>" + producto.descripcion + "</p>" +
                "<label for='cantidad'>Cantidad</label>" +
                "<input type='number' id='cantidad' value='1' min='1' max='20'>" +
                "<button type='button' class='btn' id='botonAgregarDetalle'>Añadir al carrito</button>" +
            "</div>" +
        "</div>";

    // Conectar el botón "Añadir al carrito" de esta página
    const botonAgregar = document.getElementById("botonAgregarDetalle");

    botonAgregar.addEventListener("click", function () {
        const inputCantidad = document.getElementById("cantidad");
        const cantidad = Number(inputCantidad.value);

        for (let i = 0; i < cantidad; i++) {
            agregarAlCarrito(producto.codigo, producto.nombre, producto.precio);
        }

        alert(cantidad + " x " + producto.nombre + " agregado(s) al carrito.");
    });

});