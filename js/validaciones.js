// Espera a que todo el HTML esté cargado antes de buscar los elementos
document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formContacto");
    const mensajeExito = document.getElementById("mensajeExito");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // evita que la página se recargue

        let formularioValido = true; // asumimos que está bien, y lo desmentimos si algo falla

        // ---- Validar nombre ----
        const campoNombre = document.getElementById("campoNombre");
        const inputNombre = document.getElementById("nombre");

        if (inputNombre.value.trim() === "") {
            campoNombre.classList.add("invalido");
            formularioValido = false;
        } else {
            campoNombre.classList.remove("invalido");
        }

        // ---- Validar correo ----
        const campoCorreo = document.getElementById("campoCorreo");
        const inputCorreo = document.getElementById("correo");
        const correo = inputCorreo.value.trim();
        const dominiosValidos = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

        if (correo === "" || !dominiosValidos.test(correo)) {
            campoCorreo.classList.add("invalido");
            formularioValido = false;
        } else {
            campoCorreo.classList.remove("invalido");
        }

        // ---- Validar comentario ----
        const campoComentario = document.getElementById("campoComentario");
        const inputComentario = document.getElementById("comentario");

        if (inputComentario.value.trim() === "") {
            campoComentario.classList.add("invalido");
            formularioValido = false;
        } else {
            campoComentario.classList.remove("invalido");
        }

        // ---- Resultado final ----
        if (formularioValido) {
            mensajeExito.classList.add("visible");
            formulario.reset(); // limpia todos los campos
        } else {
            mensajeExito.classList.remove("visible");
        }
    });

});