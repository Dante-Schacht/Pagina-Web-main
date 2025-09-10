// admin.common.js
// Funciones comunes para panel admin
// Ejemplo: navbar toggle

document.addEventListener('DOMContentLoaded', function() {
  var toggler = document.querySelector('.navbar-toggler');
  var nav = document.getElementById('adminNav');
  if (toggler && nav) {
    toggler.addEventListener('click', function() {
      nav.classList.toggle('show');
    });
  }
});
