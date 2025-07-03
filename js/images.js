// Verificar sesión activa
const activeUser = JSON.parse(sessionStorage.getItem("sesionActiva"));
if (!activeUser) {
  window.location.href = "index.html";
}
// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', initGallery);

function initGallery() {
    renderImages();

    // Asignamos el evento al botón
    const addButton = document.querySelector('#controls button');
    addButton.addEventListener('click', addImage);

}

function addImage() {
    const fileInput = document.getElementById('image-input');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor selecciona una imagen.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const base64Image = e.target.result;

        // Obtener imágenes actuales del localStorage o crear array vacío
        let images = JSON.parse(localStorage.getItem('images')) || [];

        // Agregar la nueva imagen
        images.push(base64Image);

        // Guardar de nuevo en localStorage
        localStorage.setItem('images', JSON.stringify(images));

        // Limpiar input
        fileInput.value = '';

        // Volver a renderizar la galería
        renderImages();
    };

    reader.onerror = function () {
        alert('Error al leer la imagen.');
    };

    reader.readAsDataURL(file);
}

function renderImages() {
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = ''; // limpiar antes de renderizar

    const images = JSON.parse(localStorage.getItem('images')) || [];

    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Imagen ${index + 1}`;
        img.title = 'Haz clic para eliminar';

        // Evento para eliminar imagen
        img.addEventListener('click', () => {
            if (confirm('¿Deseas eliminar esta imagen?')) {
                images.splice(index, 1); // eliminar del array
                localStorage.setItem('images', JSON.stringify(images));
                renderImages(); // volver a renderizar
            }
        });

        carousel.appendChild(img);
    });
}
// Mostrar log al agregar imagen
function addImage() {
    const fileInput = document.getElementById('image-input');
    const file = fileInput.files[0];

    if (!file) {
        console.warn('Log: No se seleccionó ninguna imagen.');
        alert('Por favor selecciona una imagen.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const base64Image = e.target.result;

        let images = JSON.parse(localStorage.getItem('images')) || [];
        images.push(base64Image);
        localStorage.setItem('images', JSON.stringify(images));

        console.log(`Log: Imagen agregada correctamente. `);

        fileInput.value = '';
        renderImages();
    };

    reader.onerror = function () {
        console.error('Log: Error al leer la imagen.');
        alert('Error al leer la imagen.');
    };

    reader.readAsDataURL(file);
}

// Función para agregar un mensaje de log en la página
function addLog(message, type = 'info') {
    const logsDiv = document.getElementById('logs');
    const p = document.createElement('p');
    p.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;

    // Colores según tipo de log
    if (type === 'error') p.style.color = 'red';
    else if (type === 'warn') p.style.color = 'orange';
    else if (type === 'info') p.style.color = 'blue';
    else p.style.color = 'black';

    logsDiv.appendChild(p);
    logsDiv.scrollTop = logsDiv.scrollHeight; // hacer scroll automático
}

// Modificar addImage
function addImage() {
    const fileInput = document.getElementById('image-input');
    const file = fileInput.files[0];

    if (!file) {
        addLog('No se seleccionó ninguna imagen.', 'warn');
        alert('Por favor selecciona una imagen.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const base64Image = e.target.result;

        let images = JSON.parse(localStorage.getItem('images')) || [];
        images.push(base64Image);
        localStorage.setItem('images', JSON.stringify(images));

        addLog(`Imagen agregada correctamente.`, `info`);

        fileInput.value = '';
        renderImages();
    };

    reader.onerror = function () {
        addLog('Error al leer la imagen.', 'error');
        alert('Error al leer la imagen.');
    };

    reader.readAsDataURL(file);
}

// Modificar renderImages
function renderImages() {
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = '';

    const images = JSON.parse(localStorage.getItem('images')) || [];

    addLog(`Actualizando... Hay ${images.length} imágenes en el carrusel.`, 'info');

    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Imagen ${index + 1}`;
        img.title = 'Haz clic para eliminar';

        img.addEventListener('click', () => {
            if (confirm('¿Deseas eliminar esta imagen?')) {
                images.splice(index, 1);
                localStorage.setItem('images', JSON.stringify(images));
                addLog(`Imagen eliminada. `, 'info');
                renderImages();
            }
        });

        carousel.appendChild(img);
    });
}
