// admin.users.js
// CRUD de usuarios para admin
// Requiere data.users.js

document.addEventListener('DOMContentLoaded', function() {
  // Renderizar lista de usuarios
  const lista = document.getElementById('admin-usuarios-lista');
  if (!lista || typeof usuarios === 'undefined') return;
  lista.innerHTML = usuarios.map(user => `
    <div class="card mb-3">
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-title mb-1">${user.nombre}</h5>
          <p class="mb-0">${user.email} <span class="badge bg-secondary ms-2">${user.rol}</span></p>
        </div>
        <div class="d-flex gap-2">
          <a href="usuario-editar.html?id=${user.id}" class="btn btn-warning btn-sm"><i class="bi bi-pencil"></i> Editar</a>
          <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${user.id})"><i class="bi bi-trash"></i> Eliminar</button>
        </div>
      </div>
    </div>
  `).join('');
});

function eliminarUsuario(id) {
  // Implementar lógica de eliminación (localStorage, API, etc.)
  alert('Eliminar usuario ' + id);
}
window.eliminarUsuario = eliminarUsuario;
