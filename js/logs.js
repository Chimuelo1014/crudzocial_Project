// Usuario activo
const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));
if (!usuarioActivo) {
  location.href = "login.html";
}

// Función  crea un nuevo log
function crearLog(accion) {
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  const nuevoLog = {
    usuario: usuarioActivo.email,
    fecha: new Date().toLocaleString(),
    accion
  };
  logs.push(nuevoLog);
  localStorage.setItem("logs", JSON.stringify(logs));
}

//  Mostrar logs en pantalla
function mostrarLogs() {
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  const contenedor = document.getElementById("logContainer");
  const filtroUsuario = document.getElementById("filtroUsuario").value.toLowerCase();
  const filtroAccion = document.getElementById("filtroAccion").value.toLowerCase();

  // Filtrar logs si no es admin
  const logsFiltrados = logs.filter(log => {
    const esPropio = log.usuario === usuarioActivo.email;
    const puedeVer = usuarioActivo.rol === "admin" || esPropio;
    const coincideUsuario = log.usuario.toLowerCase().includes(filtroUsuario);
    const coincideAccion = log.accion.toLowerCase().includes(filtroAccion);
    return puedeVer && coincideUsuario && coincideAccion;
  });

  contenedor.innerHTML = "";
  if (logsFiltrados.length === 0) {
    contenedor.innerHTML = "<p>No hay resultados.</p>";
    return;
  }

  logsFiltrados.forEach(log => {
    contenedor.innerHTML += `
      <div class="box">
        <strong>Usuario:</strong> ${log.usuario}<br>
        <strong>Acción:</strong> ${log.accion}<br>
        <strong>Fecha:</strong> ${log.fecha}
      </div>`;
  });
}

// Esperar que el DOM cargue para agregar eventos
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnFiltrar").addEventListener("click", mostrarLogs);
  mostrarLogs(); // Mostrar logs por defecto al cargar
});
