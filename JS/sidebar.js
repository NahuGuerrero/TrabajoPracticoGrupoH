// SIDEBAR DEL CARRITO

// agarro todos los elementos que voy a usar
const carritoIcono = document.querySelector('.carrito'); // ícono del carrito en el header
const sidebar = document.getElementById('sidebar-carrito'); // panel lateral del carrito
const cerrarSidebar = document.getElementById('cerrar-sidebar'); // botón X para cerrar
const contenidoCarrito = document.getElementById('contenido-carrito'); // donde se listan los cursos
const totalCarrito = document.getElementById('total-carrito'); // texto del total $

// traigo del sessionStorage los cursos si hay algo guardado, sino arranco vacío
let cursosCarrito = JSON.parse(sessionStorage.getItem('cursosCarrito')) || [];


// FUNCIÓN PARA MOSTRAR EL CARRITO 

function mostrarCarrito() {
  contenidoCarrito.innerHTML = ''; // limpio lo anterior

  // si no hay cursos, muestro un mensaje vacío
  if (cursosCarrito.length === 0) {
    contenidoCarrito.innerHTML = '<p style="text-align:center; margin-top:30px;">Todavía no se obtuvieron cursos.</p>';
    totalCarrito.textContent = 'Total: $0';
    return; // corto acá
  }

  let total = 0; // acumulador del precio total

  // recorro el array de cursos y los muestro
  cursosCarrito.forEach((curso, index) => {
    total += curso.precio; // sumo al total

    const item = document.createElement('div'); // creo el div del curso
    item.classList.add('item-carrito');

    // armo el contenido del curso con su botón eliminar
    item.innerHTML = `
      <span>${curso.nombre}</span>
      <span>$${curso.precio}</span>
      <button data-index="${index}">Eliminar</button>
    `;

    // lo meto en el contenedor
    contenidoCarrito.appendChild(item);
  });

  // muestro el total actualizado
  totalCarrito.textContent = `Total: $${total}`;
}


//  ABRIR / CERRAR SIDEBAR 

// cuando hago click en el ícono del carrito, abro el panel
carritoIcono.addEventListener('click', () => {
  sidebar.classList.add('activo'); // activo la animación del sidebar
  mostrarCarrito(); // actualizo el contenido
});

// cuando toco la X lo cierro
cerrarSidebar.addEventListener('click', () => {
  sidebar.classList.remove('activo');
});


// ELIMINAR CURSOS DEL CARRITO 

// escucho los clicks dentro del contenido del carrito
contenidoCarrito.addEventListener('click', e => {
  // si el click fue sobre un botón
  if (e.target.tagName === 'BUTTON') {
    const index = e.target.getAttribute('data-index'); // agarro el índice
    cursosCarrito.splice(index, 1); // saco ese curso del array
    sessionStorage.setItem('cursosCarrito', JSON.stringify(cursosCarrito)); // actualizo el storage
    mostrarCarrito(); // vuelvo a renderizar
  }
});


// AÑADIR CURSOS DESDE OTROS SCRIPTS 

function agregarCurso(nombre, precio) {
  // agrego el curso nuevo al array
  cursosCarrito.push({ nombre, precio });

  // actualizo el sessionStorage
  sessionStorage.setItem('cursosCarrito', JSON.stringify(cursosCarrito));

  // actualizo el número del contador del carrito
  const contador = document.getElementById('preview-unidades');
  if (contador) contador.textContent = cursosCarrito.length;
}
