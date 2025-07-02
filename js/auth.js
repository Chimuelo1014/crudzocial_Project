document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Crear admin por defecto si no existe
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (!usuarios.find(u => u.email === "admin@crudzocial.com")) {
    usuarios.push({ email: "admin@crudzocial.com", password: "admin123", rol: "admin" });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      return alert("Por favor completa todos los campos");
    }

    let users = JSON.parse(localStorage.getItem("usuarios")) || [];
    let user = users.find(u => u.email === email);

    if (!user) {
      // Si no existe, lo registramos como usuario común
      user = { email, password, rol: "comun" };
      users.push(user);
      localStorage.setItem("usuarios", JSON.stringify(users));
      alert("Usuario creado con éxito");
    } else {
      if (user.password !== password) {
        return alert("Contraseña incorrecta");
      }
    }

    // Guardar sesión activa
    sessionStorage.setItem("sesionActiva", JSON.stringify(user));
    localStorage.setItem("usuarioActual", JSON.stringify(user)); // Necesario para profile.html

    // Guardar log
    const logs = JSON.parse(localStorage.getItem("logs")) || [];
    logs.push({
      email: user.email,
      accion: "Inicio de sesión",
      fecha: new Date().toISOString()
    });
    localStorage.setItem("logs", JSON.stringify(logs));

    // Redirigir
    location.href = user.rol === "admin" ? "users.html" : "profile.html";
  });
});
