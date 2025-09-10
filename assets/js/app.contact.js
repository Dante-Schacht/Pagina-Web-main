// app.contact.js
// Validación de formulario de contacto
const v = window.validators;
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-contacto');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();
    if (!v.validarNombre(nombre)) {
      alert('Nombre inválido'); return;
    }
    if (!v.validarEmail(email)) {
      alert('Email inválido'); return;
    }
    if (!v.validarMensaje(mensaje)) {
      alert('Mensaje muy corto'); return;
    }
    document.getElementById('contacto-exito').style.display = 'block';
    form.reset();
  });
});
