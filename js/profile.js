document.addEventListener("DOMContentLoaded", () => {
  const campos = ["nombre", "apellido", "email", "telefono", "pais", "ciudad", "direccion", "postal"];
  const form = document.getElementById("perfilForm");
  const logsBox = document.getElementById("logs");

  const cargarUsuario = () => {
    try {
      const user = JSON.parse(localStorage.getItem("usuarioActual"));
      if (!user || typeof user !== "object" || !user.email) {
        window.location.href = "index.html";
        return;
      }
      
      campos.forEach(campo => {
        const input = document.getElementById(campo);
        if (input) input.value = user[campo] || "";
      });

      mostrarLogs(user.email);
    } catch {
      window.location.href = "index.html";
    }
  };

  const guardarUsuario = () => {
    const user = {};
    campos.forEach(campo => {
      user[campo] = document.getElementById(campo).value.trim();
    });
    localStorage.setItem("usuarioActual", JSON.stringify(user));
    alert("Perfil actualizado con éxito");
    mostrarLogs(user.email);
  };

  const mostrarLogs = (email) => {
    const logs = JSON.parse(localStorage.getItem("logs")) || [];
    const propios = logs.filter(log => log.email === email);
    logsBox.innerHTML = propios.length
      ? propios.map(log => `<p>${log.fecha} - ${log.accion}</p>`).join("")
      : "<p>No hay actividad registrada.</p>";
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActual");
    window.location.href = "index.html";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    guardarUsuario();
  });

  document.getElementById("logout").addEventListener("click", cerrarSesion);

  cargarUsuario();
});
