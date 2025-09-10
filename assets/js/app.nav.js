// app.nav.js
// Toggle navbar para Bootstrap 5
// No requiere jQuery
// Se activa con el botón hamburguesa

document.addEventListener('DOMContentLoaded', function() {
  var toggler = document.querySelector('.navbar-toggler');
  var nav = document.getElementById('navbarNav');
  if (toggler && nav) {
    toggler.addEventListener('click', function() {
      nav.classList.toggle('show');
    });
  }
});
