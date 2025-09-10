// app.login.js
// Validación de login
const v = window.validators;
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-login');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = form.email.value.trim();
    const pass = form.password.value;
    if (!v.validarEmail(email)) {
      alert('Email inválido'); return;
    }
    if (!v.validarPassword(pass)) {
      alert('Contraseña muy corta'); return;
    }
    document.getElementById('login-exito').style.display = 'block';
    form.reset();
  });
});
