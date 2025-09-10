// validators.js
// Validaciones para login, registro y contacto
const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
const minPassLength = 6;

function validarEmail(email) {
  return emailRegex.test(email);
}
function validarPassword(pass) {
  return typeof pass === 'string' && pass.length >= minPassLength;
}
function validarNombre(nombre) {
  return typeof nombre === 'string' && nombre.trim().length >= 2;
}
function validarMensaje(mensaje) {
  return typeof mensaje === 'string' && mensaje.trim().length >= 10;
}
// Exportar para uso global
window.validators = { validarEmail, validarPassword, validarNombre, validarMensaje };
