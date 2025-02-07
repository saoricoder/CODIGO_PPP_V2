// validaciones.js

function validarTelefono(telefono) {
    const formatoTelefono = /^\d{10}$/;
    if (!formatoTelefono.test(telefono)) {
        throw new Error('El formato del teléfono no es válido. Debe ser un número de 10 dígitos.');
    }
}

function validarCorreoElectronico(email) {
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(email)) {
        throw new Error('El formato del correo electrónico no es válido.');
    }
}

module.exports = { validarTelefono, validarCorreoElectronico };
