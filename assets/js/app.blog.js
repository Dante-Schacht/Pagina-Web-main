// app.blog.js
// Renderiza detalle de blog
window.blogs = window.blogs || [
  { id: 1, titulo: 'Cómo elegir tus accesorios tech', resumen: 'Consejos para seleccionar los mejores gadgets y accesorios para tu día a día.' },
  { id: 2, titulo: 'Tendencias en tecnología 2025', resumen: 'Descubre lo último en innovación y productos tech que están marcando el año.' },
  { id: 3, titulo: 'Cuida tus dispositivos', resumen: 'Tips para mantener y prolongar la vida útil de tus equipos electrónicos.' }
];
document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const blog = blogs.find(b => b.id === id);
  const detalle = document.getElementById('blog-detalle');
  if (!detalle || !blog) return;
  detalle.innerHTML = `<div class="card p-4 shadow-sm">
    <h2 class="card-title mb-3">${blog.titulo}</h2>
    <p>${blog.resumen}</p>
    <a href="blogs.html" class="btn btn-outline-secondary mt-3">Volver a blogs</a>
  </div>`;
});
