// admin.products.js
// CRUD de productos para admin
// Requiere data.products.js

document.addEventListener('DOMContentLoaded', function() {
  // Renderizar lista de productos
  const lista = document.getElementById('admin-productos-lista');
  if (!lista || typeof productos === 'undefined') return;
  lista.innerHTML = productos.map(prod => `
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-2">
          <img src="${prod.img}" class="img-fluid rounded-start" alt="${prod.nombre}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text">Precio: $${prod.precio.toLocaleString('es-CL')}</p>
          </div>
        </div>
        <div class="col-md-2 d-flex flex-column justify-content-center align-items-center gap-2">
          <a href="producto-editar.html?id=${prod.id}" class="btn btn-warning btn-sm"><i class="bi bi-pencil"></i> Editar</a>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${prod.id})"><i class="bi bi-trash"></i> Eliminar</button>
        </div>
      </div>
    </div>
  `).join('');
});

function eliminarProducto(id) {
  // Implementar lógica de eliminación (localStorage, API, etc.)
  alert('Eliminar producto ' + id);
}
window.eliminarProducto = eliminarProducto;
