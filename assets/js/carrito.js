// Carrito global con localStorage
const CARRITO_KEY = 'tiendaNubeCarrito';
function getCarrito() {
  return JSON.parse(localStorage.getItem(CARRITO_KEY) || '[]');
}

function agruparCarrito(carrito) {
  const agrupado = [];
  carrito.forEach(prod => {
    const idx = agrupado.findIndex(p => p.id === prod.id);
    if (idx !== -1) {
      agrupado[idx].cantidad++;
    } else {
      agrupado.push({ ...prod, cantidad: 1 });
    }
  });
  return agrupado;
}
function setCarrito(arr) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(arr));
}
function actualizarCarritoBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = getCarrito().length;
}
function renderCarritoModal() {
  const lista = document.getElementById('carrito-lista');
  if (!lista) return;
  const carrito = getCarrito();
  const agrupado = agruparCarrito(carrito);
  if (agrupado.length === 0) {
    lista.innerHTML = '<p class="text-center text-muted">El carrito está vacío.</p>';
    return;
  }
  lista.innerHTML = agrupado.map((item, idx) => {
    return `<div class="d-flex align-items-center mb-3 border-bottom pb-2">
      <img src="${item.img}" alt="${item.nombre}" width="60" height="40" class="me-3 rounded">
      <div class="flex-grow-1">
        <span class="fw-bold">${item.nombre}</span><br>
        <span class="text-primary">$${item.precio.toLocaleString('es-CL')}</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary menos-cart-modal" data-id="${item.id}"><i class="bi bi-dash"></i></button>
        <span class="fw-bold">${item.cantidad}</span>
        <button class="btn btn-sm btn-outline-secondary mas-cart-modal" data-id="${item.id}"><i class="bi bi-plus"></i></button>
        <button class="btn btn-sm btn-outline-danger remove-cart-modal" data-id="${item.id}"><i class="bi bi-trash"></i></button>
      </div>
    </div>`;
  }).join('');
}
function addToCarrito(prod) {
  const carrito = getCarrito();
  carrito.push(prod);
  setCarrito(carrito);
  actualizarCarritoBadge();
  renderCarritoModal();
}
function removeFromCarrito(idx) {
  const carrito = getCarrito();
  // Elimina todas las unidades del producto con ese id
  const agrupado = agruparCarrito(carrito);
  const id = agrupado[idx]?.id;
  const nuevo = carrito.filter(p => p.id !== id);
  setCarrito(nuevo);
  actualizarCarritoBadge();
  renderCarritoModal();
}

function sumarUnidad(id) {
  const carrito = getCarrito();
  // Añade una unidad más del producto
  const prod = carrito.find(p => p.id === id);
  if (prod) {
    carrito.push(prod);
    setCarrito(carrito);
    actualizarCarritoBadge();
    renderCarritoModal();
  }
}
function restarUnidad(id) {
  const carrito = getCarrito();
  const idx = carrito.findIndex(p => p.id === id);
  if (idx !== -1) {
    carrito.splice(idx, 1);
    setCarrito(carrito);
    actualizarCarritoBadge();
    renderCarritoModal();
  }
}
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('add-cart')) {
    const card = e.target.closest('.card-producto');
    if (card) {
      const id = parseInt(card.getAttribute('data-id'));
      const nombre = card.getAttribute('data-nombre');
      const precio = parseInt(card.getAttribute('data-precio'));
      const img = card.querySelector('img').src;
      addToCarrito({ id, nombre, precio, img });
    }
  }
  // Eliminar producto del carrito (por id)
  if (e.target.classList.contains('remove-cart-modal') || (e.target.closest('.remove-cart-modal') && e.target.closest('.remove-cart-modal').classList.contains('remove-cart-modal'))) {
    const btn = e.target.classList.contains('remove-cart-modal') ? e.target : e.target.closest('.remove-cart-modal');
    const id = parseInt(btn.getAttribute('data-id'));
    if (!isNaN(id)) {
      const agrupado = agruparCarrito(getCarrito());
      const idx = agrupado.findIndex(p => p.id === id);
      if (idx !== -1) removeFromCarrito(idx);
    }
  }
  // Sumar unidad
  if (e.target.classList.contains('mas-cart-modal') || (e.target.closest('.mas-cart-modal') && e.target.closest('.mas-cart-modal').classList.contains('mas-cart-modal'))) {
    const btn = e.target.classList.contains('mas-cart-modal') ? e.target : e.target.closest('.mas-cart-modal');
    const id = parseInt(btn.getAttribute('data-id'));
    if (!isNaN(id)) {
      sumarUnidad(id);
    }
  }
  // Restar unidad
  if (e.target.classList.contains('menos-cart-modal') || (e.target.closest('.menos-cart-modal') && e.target.closest('.menos-cart-modal').classList.contains('menos-cart-modal'))) {
    const btn = e.target.classList.contains('menos-cart-modal') ? e.target : e.target.closest('.menos-cart-modal');
    const id = parseInt(btn.getAttribute('data-id'));
    if (!isNaN(id)) {
      restarUnidad(id);
    }
  }
  // Abrir modal carrito personalizado
  const carritoLink = e.target.closest('a[aria-label="Carrito"]');
  if (carritoLink) {
    e.preventDefault();
    const modal = document.getElementById('modalCarritoCustom');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      renderCarritoModal();
    }
  }
  // Cerrar modal carrito personalizado
  if (
    e.target.id === 'cerrarCarritoCustom' ||
    (e.target.closest && e.target.closest('#cerrarCarritoCustom')) ||
    e.target === document.getElementById('modalCarritoCustom')
  ) {
    const modal = document.getElementById('modalCarritoCustom');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});
document.addEventListener('DOMContentLoaded', function() {
  actualizarCarritoBadge();
  renderCarritoModal();
  // Conectar botón de carrito global con Bootstrap Modal
  const cartBtn = document.getElementById('cart-toggle');
  if (cartBtn) {
    cartBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const modalEl = document.getElementById('modalCarritoCustom');
      if (modalEl && window.bootstrap) {
        const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
        renderCarritoModal();
        modal.show();
      }
    });
  }
  // Año dinámico en footer
  const yearSpan = document.getElementById('footer-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
