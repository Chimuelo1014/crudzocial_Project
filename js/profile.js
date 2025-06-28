document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("usuarioActual"));
  if (!user) return (window.location.href = "login.html");

  // Referencias a campos
  const campos = ["nombre", "apellido", "email", "telefono", "pais", "ciudad", "direccion", "postal"];
  campos.forEach((campo) => {
    document.getElementById(campo).value = user[campo] || "";
  });

  // Formulario de perfil
  document.getElementById("perfilForm").addEventListener("submit", (e) => {
    e.preventDefault();
    campos.forEach((campo) => {
      user[campo] = document.getElementById(campo).value.trim();
    });
    localStorage.setItem("usuarioActual", JSON.stringify(user));
    alert("Perfil actualizado con éxito");
  });

  // Botón cerrar sesión
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("usuarioActual");
    window.location.href = "login.html";
  });

  // Mostrar logs (si existen)
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  const propios = logs.filter(log => log.email === user.email);
  const contenedor = document.getElementById("logs");
  contenedor.innerHTML = propios.length
    ? propios.map(log => `<p>${log.fecha} - ${log.accion}</p>`).join("")
    : "<p>No hay actividad registrada.</p>";
});
