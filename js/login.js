document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formLogin");
    const mensajeExito = document.getElementById("mensajeExito");

    const campoCorreo = document.getElementById("campoCorreo");
    const inputCorreo = document.getElementById("correo");
    const errorCorreo = campoCorreo.querySelector(".error");

    const campoPassword = document.getElementById("campoPassword");
    const inputPassword = document.getElementById("password");
    const errorPassword = campoPassword.querySelector(".error");

    // ---- Funciones para cada resultado posible ----

    function iniciarSesionExitosa(usuario) {
        mensajeExito.textContent = "¡Bienvenido/a, " + usuario.nombre + "! Sesión iniciada correctamente.";
        mensajeExito.classList.add("visible");
        formulario.reset();
    }

    function marcarPasswordIncorrecta() {
        campoPassword.classList.add("invalido");
        errorPassword.textContent = "La contraseña ingresada es incorrecta.";
    }

    function marcarCorreoNoExiste() {
        campoCorreo.classList.add("invalido");
        errorCorreo.textContent = "No existe una cuenta registrada con este correo.";
    }

    function verificarPassword(usuario) {
        const passwordCorrecta = usuario.password === inputPassword.value;
        passwordCorrecta ? iniciarSesionExitosa(usuario) : marcarPasswordIncorrecta();
    }

    function buscarUsuario(correo) {
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuariosMilSabores")) || [];
        const usuarioEncontrado = usuariosGuardados.find(function (usuario) {
            return usuario.correo === correo;
        });
        usuarioEncontrado ? verificarPassword(usuarioEncontrado) : marcarCorreoNoExiste();
    }

    // ---- Envío del formulario ----

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        mensajeExito.classList.remove("visible");
        campoCorreo.classList.remove("invalido");
        campoPassword.classList.remove("invalido");

        // ---- Validar formato de correo ----
        const correo = inputCorreo.value.trim().toLowerCase();
        const dominiosValidos = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        const correoValidoFormato = correo !== "" && correo.length <= 100 && dominiosValidos.test(correo);

        errorCorreo.textContent = correoValidoFormato ? "" : "Ingresa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com";
        campoCorreo.classList.toggle("invalido", !correoValidoFormato);

        // ---- Validar formato de contraseña ----
        const largoPassword = inputPassword.value.length;
        const passwordValidoFormato = largoPassword >= 4 && largoPassword <= 10;

        errorPassword.textContent = passwordValidoFormato ? "" : "La contraseña debe tener entre 4 y 10 caracteres.";
        campoPassword.classList.toggle("invalido", !passwordValidoFormato);

        // ---- Solo buscamos en la "base de datos" si el formato está bien ----
        const formularioValido = correoValidoFormato && passwordValidoFormato;
        formularioValido && buscarUsuario(correo);
    });

});