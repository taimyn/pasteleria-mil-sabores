function validarRut(rut) {
    rut = rut.trim().toUpperCase();

    if (rut.length < 7 || rut.length > 9) {
        return false;
    }

    const cuerpo = rut.slice(0, -1);       // todos los dígitos menos el último
    const dv = rut.slice(-1);              // el último carácter (dígito verificador)

    if (!/^\d+$/.test(cuerpo)) {           // el cuerpo debe ser solo números
        return false;
    }

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resultado = 11 - (suma % 11);
    let dvEsperado;

    if (resultado === 11) {
        dvEsperado = "0";
    } else if (resultado === 10) {
        dvEsperado = "K";
    } else {
        dvEsperado = resultado.toString();
    }

    return dv === dvEsperado;
}


document.addEventListener("DOMContentLoaded", function () {

    const regionesConComunas = {
        "Región Metropolitana de Santiago": ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto", "Melipilla"],
        "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "San Antonio"],
        "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"],
        "Región de la Araucanía": ["Temuco", "Villarrica", "Angol"]
    };

    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    // 1. Llenar el select de regiones al cargar la página
    for (const region in regionesConComunas) {
        const opcion = document.createElement("option");
        opcion.value = region;
        opcion.textContent = region;
        selectRegion.appendChild(opcion);
    }

    // 2. Cuando cambie la región, actualizar las comunas
    selectRegion.addEventListener("change", function () {
        const regionElegida = selectRegion.value;

        // Vaciar el select de comunas (dejando solo la opción por defecto)
        selectComuna.innerHTML = '<option value="">-- Selecciona tu comuna --</option>';

        if (regionElegida !== "") {
            const comunas = regionesConComunas[regionElegida];
            comunas.forEach(function (comuna) {
                const opcion = document.createElement("option");
                opcion.value = comuna;
                opcion.textContent = comuna;
                selectComuna.appendChild(opcion);
            });
        }
    });


    const formulario = document.getElementById("formRegistro");
    const mensajeExito = document.getElementById("mensajeExito");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        let formularioValido = true;

        // ---- RUT ----
        const campoRun = document.getElementById("campoRun");
        const inputRun = document.getElementById("run");

        if (!validarRut(inputRun.value)) {
            campoRun.classList.add("invalido");
            formularioValido = false;
        } else {
            campoRun.classList.remove("invalido");
        }

        // ---- Nombre ----
        const campoNombre = document.getElementById("campoNombre");
        const inputNombre = document.getElementById("nombre");

        if (inputNombre.value.trim() === "") {
            campoNombre.classList.add("invalido");
            formularioValido = false;
        } else {
            campoNombre.classList.remove("invalido");
        }

        // ---- Apellidos ----
        const campoApellidos = document.getElementById("campoApellidos");
        const inputApellidos = document.getElementById("apellidos");

        if (inputApellidos.value.trim() === "") {
            campoApellidos.classList.add("invalido");
            formularioValido = false;
        } else {
            campoApellidos.classList.remove("invalido");
        }

        // ---- Correo ----
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

        // ---- Contraseña ----
        const campoPassword = document.getElementById("campoPassword");
        const inputPassword = document.getElementById("password");
        const largoPassword = inputPassword.value.length;

        if (largoPassword < 4 || largoPassword > 10) {
            campoPassword.classList.add("invalido");
            formularioValido = false;
        } else {
            campoPassword.classList.remove("invalido");
        }

        // ---- Confirmar contraseña ----
        const campoPassword2 = document.getElementById("campoPassword2");
        const inputPassword2 = document.getElementById("password2");

        if (inputPassword2.value !== inputPassword.value || inputPassword2.value === "") {
            campoPassword2.classList.add("invalido");
            formularioValido = false;
        } else {
            campoPassword2.classList.remove("invalido");
        }

        // ---- Región ----
        const campoRegion = document.getElementById("campoRegion");

        if (selectRegion.value === "") {
            campoRegion.classList.add("invalido");
            formularioValido = false;
        } else {
            campoRegion.classList.remove("invalido");
        }

        // ---- Comuna ----
        const campoComuna = document.getElementById("campoComuna");

        if (selectComuna.value === "") {
            campoComuna.classList.add("invalido");
            formularioValido = false;
        } else {
            campoComuna.classList.remove("invalido");
        }

        // ---- Dirección ----
        const campoDireccion = document.getElementById("campoDireccion");
        const inputDireccion = document.getElementById("direccion");

        if (inputDireccion.value.trim() === "") {
            campoDireccion.classList.add("invalido");
            formularioValido = false;
        } else {
            campoDireccion.classList.remove("invalido");
        }

        // ---- Resultado final ----
        if (formularioValido) {
            mensajeExito.classList.add("visible");
            formulario.reset();
            selectComuna.innerHTML = '<option value="">-- Primero elige una región --</option>';
        } else {
            mensajeExito.classList.remove("visible");
        }
    });

});