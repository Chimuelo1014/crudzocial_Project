const activeUser = JSON.parse(sessionStorage.getItem("sesionActiva"));
if (!activeUser) {
  window.location.href = "index.html";
}
// Función para registrar logs
function addLog(action) {
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  const newLog = {
    userEmail: activeUser.email,
    timestamp: new Date().toISOString(),
    action
  };
  logs.push(newLog);
  localStorage.setItem("logs", JSON.stringify(logs));
}

// Obtener elementos del DOM
const noteForm = document.getElementById("noteForm");
const titleInput = document.getElementById("noteTitle");
const contentInput = document.getElementById("noteContent");
const notesContainer = document.getElementById("notesContainer");
const logoutBtn = document.getElementById("logout");

// Cargar notas desde localStorage
function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

// Guardar notas en localStorage
function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Mostrar todas las notas del usuario (o todas si es admin)
function displayNotes() {
  const notes = getNotes();
  const isAdmin = activeUser.rol === "admin";
  const userNotes = isAdmin
    ? notes
    : notes.filter(note => note.userEmail === activeUser.email);

  notesContainer.innerHTML = "";

  if (userNotes.length === 0) {
    notesContainer.innerHTML = "<p>No tienes notas todavía.</p>";
    return;
  }

  userNotes.forEach(note => {
    const noteElement = document.createElement("div");
    noteElement.className = "box";
    noteElement.innerHTML = `
      <h3 class="title is-5">${note.title}</h3>
      <p>${note.content}</p>
      <p class="has-text-grey is-size-7">Creado: ${new Date(note.createdAt).toLocaleString()}</p>
      ${isAdmin ? `<p class="has-text-info is-size-7">Autor: ${note.userEmail}</p>` : ""}
      <button class="button is-small is-warning mt-2" onclick="editNote('${note.id}')">Editar</button>
      <button class="button is-small is-danger mt-2" onclick="deleteNote('${note.id}')">Eliminar</button>
    `;
    notesContainer.appendChild(noteElement);
  });
}

function displayLogs() {
  const logsContainer = document.getElementById("logsContainer");
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  const isAdmin = activeUser.rol === "admin";

  const userLogs = isAdmin
    ? logs
    : logs.filter(log => log.userEmail === activeUser.email);

  if (userLogs.length === 0) {
    logsContainer.innerHTML = "<p>No hay actividad registrada.</p>";
    return;
  }

  logsContainer.innerHTML = "<ul>";
  userLogs.reverse().forEach(log => {
    logsContainer.innerHTML += `
      <li>
        <strong>${log.userEmail}</strong> — ${log.action} —
        <span class="has-text-grey is-size-7">${new Date(log.timestamp).toLocaleString()}</span>
      </li>
    `;
  });
  logsContainer.innerHTML += "</ul>";
}

// Crear una nueva nota
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) return;

  const notes = getNotes();

  const newNote = {
    id: Date.now().toString(),
    userEmail: activeUser.email,
    title,
    content,
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);
  saveNotes(notes);
  displayNotes();
  noteForm.reset();

  addLog("crear nota");
  displayLogs();
});

// Editar una nota
window.editNote = function (id) {
  const notes = getNotes();
  const note = notes.find(n => n.id === id);

  if (!note) return;

  if (note.userEmail !== activeUser.email && activeUser.rol !== "admin") {
    alert("No tienes permiso para editar esta nota.");
    return;
  }

  const newTitle = prompt("Editar título:", note.title);
  const newContent = prompt("Editar contenido:", note.content);

  if (newTitle !== null && newContent !== null) {
    note.title = newTitle.trim();
    note.content = newContent.trim();
    saveNotes(notes);
    displayNotes();

    addLog("editar nota");
    displayLogs();
  }
};

// Eliminar una nota
window.deleteNote = function (id) {
  const notes = getNotes();
  const note = notes.find(n => n.id === id);
  if (!note) return;

  if (note.userEmail !== activeUser.email && activeUser.rol !== "admin") {
    alert("No tienes permiso para eliminar esta nota.");
    return;
  }

  if (!confirm("¿Estás seguro de eliminar esta nota?")) return;

  const filteredNotes = notes.filter(n => n.id !== id);
  saveNotes(filteredNotes);
  displayNotes();

  addLog("eliminar nota");
  displayLogs();
};

// Cerrar sesión
logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("sesionActiva");
  window.location.href = "index.html";
});

// Cargar notas al iniciar
displayNotes();
displayLogs();
