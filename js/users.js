
// Verificar sesión activa
const activeUser = JSON.parse(sessionStorage.getItem("sesionActiva"));
if (!activeUser) {
  window.location.href = "index.html";
}
// Obtener todos los usuarios registrados
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Renderizar tabla de usuarios
function mostrarUsuarios() {
  const contenedor = document.getElementById('usuariosContainer');

  contenedor.innerHTML = `
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${usuarios.map(usuario => `
          <tr>
            <td>${usuario.nombre || 'Sin nombre'}</td>
            <td>${usuario.email}</td>
            <td>${usuario.rol}</td>
            <td>
              <button class="button is-small is-info" onclick="verNotas('${usuario.email}')">Notas</button>
              <button class="button is-small is-warning" onclick="verImagenes('${usuario.email}')">Imágenes</button>
              <button class="button is-small is-primary" onclick="verLogs('${usuario.email}')">Logs</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}
mostrarUsuarios();

// Funciones para ver datos específicos de cada usuario
function verNotas(email) {
  const notas = JSON.parse(localStorage.getItem('notas')) || [];
  const notasUsuario = notas.filter(nota => nota.usuario === email);
  const contenido = notasUsuario.length
    ? notasUsuario.map(n => `<p>📝 ${n.texto}</p>`).join('')
    : "<p>No hay notas para este usuario.</p>";
  mostrarModal(`Notas de ${email}`, contenido);
}

function verImagenes(email) {
  const imagenes = JSON.parse(localStorage.getItem('imagenes')) || [];
  const imagenesUsuario = imagenes.filter(img => img.usuario === email);
  const contenido = imagenesUsuario.length
    ? imagenesUsuario.map(i => `<img src="${i.url}" style="max-width: 100%; margin-bottom: 10px;">`).join('')
    : "<p>No hay imágenes para este usuario.</p>";
  mostrarModal(`Imágenes de ${email}`, contenido);
}

function verLogs(email) {
  const logs = JSON.parse(localStorage.getItem('logs')) || [];
  const logsUsuario = logs.filter(log => log.usuario === email);
  const contenido = logsUsuario.length
    ? logsUsuario.map(log => `<p>📅 ${new Date(log.fecha).toLocaleString()} - ${log.accion}</p>`).join('')
    : "<p>No hay logs para este usuario.</p>";
  mostrarModal(`Logs de ${email}`, contenido);
}

// Modal reutilizable
function mostrarModal(titulo, contenidoHtml) {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'is-active');
  modal.innerHTML = `
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">${titulo}</p>
        <button class="delete" aria-label="close" onclick="cerrarModal(this)"></button>
      </header>
      <section class="modal-card-body">
        ${contenidoHtml}
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" onclick="cerrarModal(this)">Cerrar</button>
      </footer>
    </div>
  `;
  document.body.appendChild(modal);
}

// Cerrar modal
function cerrarModal(boton) {
  const modal = boton.closest('.modal');
  if (modal) modal.remove();
}
