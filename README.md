# Crudzocial - Equipo Moodle Boys JS

##  Integrantes del equipo

- Samuel Quintero
- Cristian Chaverra
- Juan David Olaya
- Andres Restrepo
- Carlos Tangarife

---

##  Descripción del sistema

**Crudzocial** es una aplicación web que permite a los usuarios crear y gestionar imágenes, notas personales y perfiles, mientras mantiene un registro de actividad (logs). También ofrece un panel administrativo con permisos especiales para un usuario "admin", quien puede gestionar a todos los usuarios, sus contenidos y sus actividades.

El objetivo principal es aplicar conocimientos clave de desarrollo web, como manejo del DOM, estructuras de datos, persistencia local y control de sesiones, todo usando JavaScript puro.

---

##  Tecnologías utilizadas

- HTML5  
- CSS3 (Bulma como librería de estilos)  
- JavaScript (Vanilla JS)  
- `localStorage` para persistencia de datos  
- `sessionStorage` para gestión de sesiones  
- Git + GitHub  
- Azure DevOps (para el tablero y asignación de tareas)

---

##  Cómo ejecutar y probar el sistema

1. Clona este repositorio en tu máquina local.
2. Abre el archivo `index.html` en tu navegador.
3. Inicia sesión con el usuario por defecto (admin) o crea uno nuevo.
4. Navega entre las secciones: Perfil, Imágenes, Notas, Logs.
5. Para acceder al panel de administración, inicia sesión como admin.

---

##  Funcionalidades Implementadas

### Autenticación
- Inicio de sesión con validación de usuario.
- Creación automática del usuario admin.
- Control de acceso mediante sessionStorage.

### Middleware (Guardian)
- Protección de páginas sensibles redireccionando al login si no hay sesión activa.

### Galería de imágenes
- Agregar imágenes mediante URL.
- Ver y eliminar imágenes propias.
- Admin puede ver y eliminar imágenes de todos.

### Módulo de notas
- Crear, ver, editar y eliminar notas personales.
- Usuarios comunes solo acceden a sus propias notas.
- Admin puede ver y modificar notas de todos.
- Visualización del autor de cada nota (solo visible para el admin).
- Validación de permisos antes de editar o eliminar.

### Perfil
- Mostrar y editar nombre, apellido, email, teléfono, país, ciudad, dirección y código postal.
- Botón de cerrar sesión.
- Visualización del resumen de actividad (logs propios).

### Panel de administración
- Solo visible al admin.
- Listado de todos los usuarios.
- Edición de imágenes y notas de cualquier usuario.
- Acceso completo a los logs de todos los usuarios.

### Logs
- Registro automático de:
  - Inicio de sesión
  - Crear, editar y eliminar imágenes o notas
- Cada log incluye: correo del usuario, tipo de acción y fecha/hora.
- Usuarios comunes solo ven sus propios logs.
- Admin ve todos los logs.
- Logs mostrados dinámicamente en pantalla mediante innerHTML.

---

##  Persistencia de datos

### localStorage:
- `usuarios`: lista de usuarios registrados.
- `notes`: lista de notas.
- `imagenes`: lista de imágenes.
- `logs`: historial de acciones realizadas.

### sessionStorage:
- `sesionActiva`: almacena el usuario logueado en ese momento.

---

## Explicación técnica de la lógica aplicada

###  Uso de `localStorage`
- Se utiliza para guardar de forma persistente:
  - Usuarios registrados (`usuarios`)
  - Notas (`notes`)
  - Imágenes (`imagenes`)
  - Logs de actividad (`logs`)
- Esto permite que la información se conserve incluso al cerrar el navegador.

###  Uso de `sessionStorage`
- Se usa para guardar el usuario que ha iniciado sesión bajo la clave `"sesionActiva"`.
- Si no hay sesión activa, se redirige automáticamente al login.
- Se elimina automáticamente al cerrar el navegador.

###  Uso de funciones
- Se utilizan funciones declaradas (`getNotes`, `saveNotes`, `displayNotes`, etc.).
- También se usan funciones anónimas y funciones flecha dentro de eventos y ciclos.
- Se evita el uso de `onClick` en HTML y se aplica solo `addEventListener`.

###  Permisos adicionales para el admin
- El usuario con `rol: "admin"` puede:
  - Ver, editar y eliminar notas e imágenes de cualquier usuario.
  - Ver todos los logs.
  - Acceder al panel de administración.
- Los usuarios comunes solo acceden a su contenido.

### Manejo de logs
- Cada acción (crear, editar, eliminar nota) genera un log automático.
- Cada log incluye: correo del usuario, tipo de acción, fecha y hora.
- Los logs se almacenan en `localStorage` y se muestran con `innerHTML`.
- El admin ve todos los logs, los demás solo los suyos.

---

## Estado actual del proyecto

- [x] Login funcional y guardian de sesión implementado
- [x] Galería de imágenes terminada
- [x] Módulo de notas completamente funcional (con logs)
- [x] Logs generados y visualizados correctamente
- [x] Perfil editable y actualizado
- [x] Panel de administración visible solo al admin
- [ ] Ajustes finales en diseño visual

---

## Sitio de referencia

[https://andrescortesdev.github.io/crudzocial](https://andrescortesdev.github.io/crudzocial)

---
