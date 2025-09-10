// Usar productos globales de data.products.js
const productos = window.productos || [];

// Carrito
let carrito = [];
function actualizarCarrito() {
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = carrito.length;
  renderCarritoModal();
}

function renderCarritoModal() {
  const lista = document.getElementById('carrito-lista');
  if (!lista) return;
  if (carrito.length === 0) {
    lista.innerHTML = '<p class="text-center text-muted">El carrito está vacío.</p>';
    return;
  }
  lista.innerHTML = carrito.map((item, idx) => {
    return `<div class="d-flex align-items-center mb-3 border-bottom pb-2">
      <img src="${item.img}" alt="${item.nombre}" width="60" height="40" class="me-3 rounded">
      <div class="flex-grow-1">
        <span class="fw-bold">${item.nombre}</span><br>
        <span class="text-primary">$${item.precio.toLocaleString('es-CL')}</span>
      </div>
      <button class="btn btn-sm btn-outline-danger remove-cart-modal" data-idx="${idx}"><i class="fa fa-trash"></i></button>
    </div>`;
  }).join('');
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('add-cart')) {
    const card = e.target.closest('.card-producto');
    if (card) {
      const id = parseInt(card.getAttribute('data-id'));
      const prod = productos.find(p => p.id === id);
      if (prod) {
        carrito.push(prod);
        actualizarCarrito();
      }
    }
  }
  // ...existing code...
  if (e.target.classList.contains('remove-cart-modal')) {
    const idx = parseInt(e.target.getAttribute('data-idx'));
    if (!isNaN(idx)) {
      carrito.splice(idx, 1);
      actualizarCarrito();
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
    }
  }
  // Cerrar modal carrito personalizado
  if (e.target.id === 'cerrarCarritoCustom' || e.target === document.getElementById('modalCarritoCustom')) {
    const modal = document.getElementById('modalCarritoCustom');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});

// Forzar cierre del modal si se navega atrás
window.addEventListener('popstate', function() {
  const modal = document.getElementById('modalCarritoCustom');
  if (modal && modal.style.display === 'flex') {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Renderiza el estado de usuario en la barra superior
  function renderUserNav() {
    const userNav = document.getElementById('userNav');
    const usuarioLog = JSON.parse(localStorage.getItem('usuarioLogueadoTiendaNube') || 'null');
    if (userNav) {
      if (usuarioLog) {
        userNav.innerHTML = `<span class="nav-link fw-bold text-primary">Hola, ${usuarioLog.nombre}</span>
          <a class="nav-link" href="#" id="btnLogout">Cerrar sesión</a>`;
      } else {
        userNav.innerHTML = `
          <a class="nav-link" href="#" id="btnRegistro">Registro</a>
          <!-- Modal Registro -->
          <div id="modalRegistro" class="modal-custom" aria-modal="true" aria-labelledby="modalRegistroLabel" tabindex="-1" style="display:none;">
            <div class="modal-custom-content">
              <div class="modal-custom-header">
                <h5 id="modalRegistroLabel">Crear cuenta</h5>
                <button id="cerrarRegistro" class="btn-close" aria-label="Cerrar">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="5" y1="5" x2="15" y2="15" stroke="#23272f" stroke-width="2"/>
                      <line x1="15" y1="5" x2="5" y2="15" stroke="#23272f" stroke-width="2"/>
                    </svg>
                </button>
              </div>
              <div class="modal-custom-body">
                <form id="formRegistro">
                  <div class="mb-3">
                    <label for="regNombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="regNombre" required>
                  </div>
                  <div class="mb-3">
                    <label for="regEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="regEmail" required>
                  </div>
                  <div class="mb-3">
                    <label for="regPass" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="regPass" required>
                  </div>
                  <button type="submit" class="btn btn-primary w-100">Registrarse</button>
                </form>
                <div id="registroExito" class="alert alert-success mt-3 d-none">¡Registro exitoso!</div>
              </div>
            </div>
          </div>
          <a class="nav-link" href="#" id="btnIngresar">Ingresar</a>
          <!-- Modal Ingresar -->
          <div id="modalIngresar" class="modal-custom" aria-modal="true" aria-labelledby="modalIngresarLabel" tabindex="-1" style="display:none;">
            <div class="modal-custom-content">
              <div class="modal-custom-header">
                <h5 id="modalIngresarLabel">Iniciar sesión</h5>
                <button id="cerrarIngresar" class="btn-close" aria-label="Cerrar">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="5" y1="5" x2="15" y2="15" stroke="#23272f" stroke-width="2"/>
                      <line x1="15" y1="5" x2="5" y2="15" stroke="#23272f" stroke-width="2"/>
                    </svg>
                </button>
              </div>
              <div class="modal-custom-body">
                <form id="formIngresar">
                  <div class="mb-3">
                    <label for="loginEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="loginEmail" required>
                  </div>
                  <div class="mb-3">
                    <label for="loginPass" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="loginPass" required>
                  </div>
                  <button type="submit" class="btn btn-primary w-100">Ingresar</button>
                </form>
                <div id="loginMensaje" class="alert alert-success mt-3 d-none">¡Bienvenido!</div>
              </div>
            </div>
          </div>
        `;
      }
    }
  }

  renderUserNav();

  // Modal Registro
  function registroListeners() {
    const btnRegistro = document.getElementById('btnRegistro');
    const modalRegistro = document.getElementById('modalRegistro');
    const cerrarRegistro = document.getElementById('cerrarRegistro');
    const formRegistro = document.getElementById('formRegistro');
    const registroExito = document.getElementById('registroExito');
    if (btnRegistro && modalRegistro) {
      btnRegistro.addEventListener('click', function(e) {
        e.preventDefault();
        modalRegistro.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    }
    if (cerrarRegistro && modalRegistro) {
      cerrarRegistro.addEventListener('click', function() {
        modalRegistro.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
    if (formRegistro) {
      formRegistro.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('regNombre').value.trim();
        const email = document.getElementById('regEmail').value.trim().toLowerCase();
        const pass = document.getElementById('regPass').value;
        if (!nombre || !email || !pass) return;
        let usuarios = JSON.parse(localStorage.getItem('usuariosTiendaNube') || '[]');
        if (usuarios.some(u => u.email === email)) {
          registroExito.classList.remove('alert-success');
          registroExito.classList.add('alert-danger');
          registroExito.textContent = 'El email ya está registrado.';
          registroExito.classList.remove('d-none');
          setTimeout(() => {
            registroExito.classList.add('d-none');
            registroExito.classList.remove('alert-danger');
            registroExito.classList.add('alert-success');
            registroExito.textContent = '¡Registro exitoso!';
          }, 2000);
          return;
        }
        usuarios.push({ nombre, email, pass });
        localStorage.setItem('usuariosTiendaNube', JSON.stringify(usuarios));
        registroExito.classList.remove('d-none');
        registroExito.classList.remove('alert-danger');
        registroExito.classList.add('alert-success');
        registroExito.textContent = '¡Registro exitoso!';
        setTimeout(() => {
          registroExito.classList.add('d-none');
          modalRegistro.style.display = 'none';
          document.body.style.overflow = '';
          formRegistro.reset();
        }, 2000);
      });
    }
  }

  // Modal Ingresar
  function ingresarListeners() {
    const btnIngresar = document.getElementById('btnIngresar');
    const modalIngresar = document.getElementById('modalIngresar');
    const cerrarIngresar = document.getElementById('cerrarIngresar');
    const formIngresar = document.getElementById('formIngresar');
    const loginMensaje = document.getElementById('loginMensaje');
    if (btnIngresar && modalIngresar) {
      btnIngresar.addEventListener('click', function(e) {
        e.preventDefault();
        modalIngresar.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    }
    if (cerrarIngresar && modalIngresar) {
      cerrarIngresar.addEventListener('click', function() {
        modalIngresar.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
    if (formIngresar) {
      formIngresar.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const pass = document.getElementById('loginPass').value;
        let usuarios = JSON.parse(localStorage.getItem('usuariosTiendaNube') || '[]');
        const usuario = usuarios.find(u => u.email === email && u.pass === pass);
        if (usuario) {
          localStorage.setItem('usuarioLogueadoTiendaNube', JSON.stringify(usuario));
          loginMensaje.classList.remove('d-none');
          loginMensaje.classList.remove('alert-danger');
          loginMensaje.classList.add('alert-success');
          loginMensaje.textContent = `¡Bienvenido, ${usuario.nombre}!`;
          setTimeout(() => {
            loginMensaje.classList.add('d-none');
            modalIngresar.style.display = 'none';
            document.body.style.overflow = '';
            formIngresar.reset();
            renderUserNav();
            registroListeners();
            ingresarListeners();
            logoutListener();
          }, 2000);
        } else {
          loginMensaje.classList.remove('d-none');
          loginMensaje.classList.remove('alert-success');
          loginMensaje.classList.add('alert-danger');
          loginMensaje.textContent = 'Email o contraseña incorrectos.';
          setTimeout(() => {
            loginMensaje.classList.add('d-none');
            loginMensaje.classList.remove('alert-danger');
            loginMensaje.classList.add('alert-success');
            loginMensaje.textContent = '¡Bienvenido!';
          }, 2000);
        }
      });
    }
  }

  // Listener para cerrar sesión
  function logoutListener() {
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
      btnLogout.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('usuarioLogueadoTiendaNube');
        renderUserNav();
        registroListeners();
        ingresarListeners();
        logoutListener();
      });
    }
  }

  // Inicializa listeners
  registroListeners();
  ingresarListeners();
  logoutListener();
  // Scroll suave a contacto desde navbar
  const contactoLink = document.querySelector('a[href="#seccion-contacto"]');
  if (contactoLink) {
    contactoLink.addEventListener('click', function(e) {
      e.preventDefault();
      const contactoSection = document.getElementById('seccion-contacto');
      if (contactoSection) {
        contactoSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  // Envío simulado del formulario de contacto
  const formContacto = document.getElementById('form-contacto');
  if (formContacto) {
    formContacto.addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('contacto-exito').style.display = 'block';
      formContacto.reset();
      setTimeout(() => {
        document.getElementById('contacto-exito').style.display = 'none';
      }, 3000);
    });
  }
  // Scroll suave a nosotros desde navbar
  const nosotrosLink = document.querySelector('a[href="#seccion-nosotros"]');
  if (nosotrosLink) {
    nosotrosLink.addEventListener('click', function(e) {
      e.preventDefault();
      const nosotrosSection = document.getElementById('seccion-nosotros');
      if (nosotrosSection) {
        nosotrosSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  renderProductos();
  actualizarCarrito();

  // Scroll suave a productos
  const btnVer = document.getElementById('btn-ver-productos');
  if (btnVer) {
    btnVer.addEventListener('click', function(e) {
      e.preventDefault();
      const grid = document.getElementById('grid-productos');
      if (grid) {
        window.scrollTo({
          top: grid.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }
    });
  }

  // Scroll suave a blogs desde navbar
  const blogsLink = document.querySelector('a[href="#seccion-blogs"]');
  if (blogsLink) {
    blogsLink.addEventListener('click', function(e) {
      e.preventDefault();
      const blogsSection = document.getElementById('seccion-blogs');
      if (blogsSection) {
        blogsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Año dinámico en footer
  const yearSpan = document.getElementById('footer-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
