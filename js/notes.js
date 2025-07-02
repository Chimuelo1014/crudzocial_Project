// Verificar sesión activa
const activeUser = JSON.parse(sessionStorage.getItem("sesionActiva"));
if (!activeUser) {
  window.location.href = "index.html";
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
      <button class="button is-small is-warning" onclick="editNote('${note.id}')">Editar</button>
      <button class="button is-small is-danger" onclick="deleteNote('${note.id}')">Eliminar</button>
    `;
    notesContainer.appendChild(noteElement);
  });
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

  // Aquí se registrará un log en la tarea de registrar los logs
});

// Editar una nota
window.editNote = function (id) {
  const notes = getNotes();
  const note = notes.find(n => n.id === id);

  if (!note) return;

  const newTitle = prompt("Editar título:", note.title);
  const newContent = prompt("Editar contenido:", note.content);

  if (newTitle !== null && newContent !== null) {
    note.title = newTitle.trim();
    note.content = newContent.trim();
    saveNotes(notes);
    displayNotes();

    // Aquí se registrará un log en la tarea de registrar los logs
  }
};

// Eliminar una nota
window.deleteNote = function (id) {
  if (!confirm("¿Estás seguro de eliminar esta nota?")) return;

  let notes = getNotes();
  notes = notes.filter(n => n.id !== id);
  saveNotes(notes);
  displayNotes();

  // Aquí se registrará un log en la tarea de registrar los logs
};

// Cerrar sesión
logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("activeUser");
  window.location.href = "index.html";
});

// Cargar notas al iniciar
displayNotes();
