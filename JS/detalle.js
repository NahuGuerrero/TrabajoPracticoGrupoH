// Inicializo el contador en el header
// agarro el elemento del contador en el header
const contadorCarrito = document.getElementById('preview-unidades');

// si ya hay algo guardado en sessionStorage, lo uso
let cantidadCursos = sessionStorage.getItem('cantidadCursos');

// si no hay nada, lo creo desde cero
if (!cantidadCursos) {
    cantidadCursos = 0;
    sessionStorage.setItem('cantidadCursos', cantidadCursos);
}

// muestro el valor actual del contador
if (contadorCarrito) {
    contadorCarrito.textContent = cantidadCursos;
}



document.addEventListener('DOMContentLoaded', () => {

    // Metodo para buscar y obtener el curso seleccionado
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = parseInt(urlParams.get('id'));

    if (isNaN(cursoId)) return;

    const cursosJSON = localStorage.getItem('cursos');
    if (!cursosJSON) return;

    const cursos = JSON.parse(cursosJSON);
    const cursoActual = cursos.find(curso => curso.id === cursoId);

    if (!cursoActual) return;

    const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));



    //   generar contenido

    function generarDetalleCurso(curso) {

        const contenedor = document.getElementById("curso-detalle-dinamico");
        if (!contenedor) return;

        contenedor.innerHTML = `
            <h2>CONTENIDOS</h2>

            <div class="acordeon">
                ${curso.temario.map(tema => `
                    <details>
                        <summary>${tema.titulo}</summary>
                        <p>${tema.descripcion}</p>
                    </details>
                `).join("")}
            </div>


            <br>


            <h2>DOCENTE</h2>
            <div class="docente-info">
                <img src="../${curso.docente.imagen}" alt="${curso.docente.nombre}">
                <div>
                        <h3>${curso.docente.nombre}</h3>
                        <p><strong>${curso.docente.especialidad}</strong></p>
                        <p>${curso.docente.descripcion}</p>
                </div>
            </div>

        `;
    }

    // Ejecutamos la generación visual
    generarDetalleCurso(cursoActual);





    //          Carga de datos para la parte superior

    const botonInscribirse = document.getElementById('btn-inscribirse');

    document.querySelector('title').textContent = `${cursoActual.titulo}`;
    document.getElementById('curso-titulo-detalle').textContent = `${cursoActual.titulo.toUpperCase()}`;
    document.getElementById('curso-valor-detalle').textContent = `U$D ${cursoActual.precio}`;
    document.getElementById('curso-duracion-detalle').textContent = '30 Horas';
    document.getElementById('curso-desc-detalle').textContent = cursoActual.descripcion;

    const imgDetalle = document.getElementById('curso-imagen-detalle');
    imgDetalle.src = `../${cursoActual.imagen}`;
    imgDetalle.alt = `Foto del ${cursoActual.titulo}`;



    //           metodo para el carrito

    const modal = document.getElementById('modal-felicitacion');
    const cerrarModal = document.getElementById('cerrar-modal');
    const aceptarModal = document.getElementById('aceptar-modal');
    const detalleCursoModal = document.getElementById('detalle-curso');


    function agregarACarrito(curso) {
        const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));
        const USER_KEY = usuarioActivo ? usuarioActivo.email : 'carrito_invitado';
        const STORAGE_KEY = `carrito_${USER_KEY}`;

        let carrito = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        const cursoExistenteIndex = carrito.findIndex(item => item.id === curso.id);

        if (cursoExistenteIndex !== -1) {
            carrito[cursoExistenteIndex].cantidad += 1;
        } else {
            carrito.push({
                id: curso.id,
                titulo: curso.titulo,
                precio: curso.precio,
                imagen: curso.imagen,
                cantidad: 1
            });
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));

        const totalUnidades = carrito.reduce((total, item) => total + item.cantidad, 0);
        sessionStorage.setItem('cantidadCursos', totalUnidades);

    }



    if (botonInscribirse) {
        botonInscribirse.addEventListener('click', e => {
            e.preventDefault();
            if (!usuarioActivo) {
                alert('Debés iniciar sesión para poder inscribirte a un curso.');
                window.location.href = '../Paginas/login.html';
                return;
            }

            // Añade el curso al carrito
            agregarACarrito(cursoActual);

            // Muestra el modal con la descripcion
            detalleCursoModal.textContent = `${cursoActual.titulo} — Valor: U$D ${cursoActual.precio}`;
            modal.style.display = 'flex';
        });
    }


    // Evento de aceptar redirige a pagar
    aceptarModal.addEventListener('click', () => {
        modal.style.display = 'none';
        window.location.href = '../Paginas/carrito.html';
    });

    // Eventos para cerrar el modal
    cerrarModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });


});
