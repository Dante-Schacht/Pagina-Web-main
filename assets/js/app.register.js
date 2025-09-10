// app.register.js
// Validación de registro
const v = window.validators;
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-registro');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const pass = form.password.value;
    if (!v.validarNombre(nombre)) {
      alert('Nombre inválido'); return;
    }
    if (!v.validarEmail(email)) {
      alert('Email inválido'); return;
    }
    if (!v.validarPassword(pass)) {
      alert('Contraseña muy corta'); return;
    }
    document.getElementById('registro-exito').style.display = 'block';
    form.reset();
  });
});
