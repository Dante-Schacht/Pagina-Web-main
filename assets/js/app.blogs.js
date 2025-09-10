// app.blogs.js
// Renderiza lista de blogs
window.blogs = [
  { id: 1, titulo: 'Cómo elegir tus accesorios tech', resumen: 'Consejos para seleccionar los mejores gadgets y accesorios para tu día a día.' },
  { id: 2, titulo: 'Tendencias en tecnología 2025', resumen: 'Descubre lo último en innovación y productos tech que están marcando el año.' },
  { id: 3, titulo: 'Cuida tus dispositivos', resumen: 'Tips para mantener y prolongar la vida útil de tus equipos electrónicos.' }
];
document.addEventListener('DOMContentLoaded', function() {
  const lista = document.getElementById('blogs-lista');
  if (!lista) return;
  lista.innerHTML = blogs.map(blog => `
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">${blog.titulo}</h5>
        <p class="card-text">${blog.resumen}</p>
        <a href="blog.html?id=${blog.id}" class="btn btn-outline-primary">Leer más</a>
      </div>
    </div>
  `).join('');
});
