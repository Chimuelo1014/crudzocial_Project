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
