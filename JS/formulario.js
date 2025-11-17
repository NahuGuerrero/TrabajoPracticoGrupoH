// FORMULARIO DE INSCRIPCIÓN

// agarro los radios (empresa / personal)
const tipoRadios = document.querySelectorAll('input[name="tipo"]');

// agarro el formulario completo para poder meter filas nuevas adentro
const formulario = document.getElementById('formulario-inscripcion');

// la primera fila que viene escrita en el HTML 
const filaBase = document.querySelector('.fila-inscripcion');

// botón para agregar una persona
const botonAgregar = document.querySelector('.boton-agregar');

// muestro el total en pantalla
const precioSpan = document.querySelector('.precio');

// botón principal de “inscribirse”
const botonInscribirse = document.querySelector('.boton-inscribirse');

// precios fijos

const PRECIO_BASE = 100;       // el precio del curso solo
const PRECIO_POR_PERSONA = 20; // extra por cada persona extra 


let tipo = 'personal';
let cantidadPersonas = 1;


// CAMBIO DE TIPO (PERSONAL / EMPRESA) 
tipoRadios.forEach(radio => {
  radio.addEventListener('change', e => {
    // guardo que tipo eligio el usuario
    tipo = e.target.value;

    // actualizo lo que se muestra según lo elegido
    actualizarVistaSegunTipo();
  });
});


// ACTUALIZAR FORMULARIO SEGÚN EL TIPO 
function actualizarVistaSegunTipo() {

  const filas = document.querySelectorAll('.fila-inscripcion');

  if (tipo === 'personal') {
    // dejo solo la primera fila
    filas.forEach((fila, index) => {
      if (index === 0) {
        fila.style.display = 'flex';  // muestro la primera
      } else {
        fila.remove();                // las demás las borro
      }
    });

    cantidadPersonas = 1;              // vuelvo a 1 persona
    botonAgregar.style.display = 'none'; // oculto el botón “+”
  } else {
    // si es empresa → muestro el botón “+”
    botonAgregar.style.display = 'block';
  }

  // cada vez que cambio el tipo recalculo el total
  recalcularTotal();
}


// AGREGAR PERSONA NUEVA

botonAgregar.addEventListener('click', () => {

  // clono la fila original (filaBase)
  const nuevaFila = filaBase.cloneNode(true);

  // limpio los inputs para que arranque vacía
  nuevaFila.querySelectorAll('input').forEach(input => input.value = '');

  // meto nueva fila 
  formulario.insertBefore(nuevaFila, document.querySelector('.acciones-formulario'));

  // sumo una persona más
  cantidadPersonas++;

  // esta fila nueva necesita su propio botón eliminar
  agregarEventosEliminar(nuevaFila);

  // recalculo el total
  recalcularTotal();
});


// AGREGAR EVENTO PARA EL BOTÓN "ELIMINAR"

function agregarEventosEliminar(fila) {
  const btnEliminar = fila.querySelector('.boton-eliminar');

  btnEliminar.addEventListener('click', () => {

    // si estoy en empresa y hay más de 1 persona, borro la fila 
    if (tipo === 'empresa' && cantidadPersonas > 1) {
      fila.remove();
      cantidadPersonas--;
      recalcularTotal();
    } else {
      // si es la primera fila y estoy en personal → NO se borra, solo limpio
      fila.querySelectorAll('input').forEach(i => i.value = '');
    }
  });
}

// activo el botón eliminar de la primera fila
agregarEventosEliminar(filaBase);


// CALCULAR EL TOTAL 
function recalcularTotal() {

  let total = PRECIO_BASE;

  // si es empresa → cada persona extra suma 20
  if (tipo === 'empresa') {
    total += (cantidadPersonas - 1) * PRECIO_POR_PERSONA;
  }

  // muestro el total en pantalla
  precioSpan.textContent = `$${total}.-`;
}



// INSCRIBIRSE 

botonInscribirse.addEventListener('click', e => {

    e.preventDefault(); // evito que el form recargue la página

    // agarro todas las filas
    const filas = document.querySelectorAll('.fila-inscripcion');

    let formularioIncompleto = false;

    // recorro cada fila para leer los inputs
    const personas = [...filas].map((fila, index) => {

        const inputs = fila.querySelectorAll('input');

        // reviso si alguno está vacío 
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                formularioIncompleto = true;   // marco que falta algo
                input.classList.add("input-error"); // le pongo clase de error
            } else {
                input.classList.remove("input-error"); // limpio error si estaba antes
            }
        });

        // devuelvo un objeto con los datos
        return {
            nombre: inputs[0].value,
            apellido: inputs[1].value,
            telefono: inputs[2].value
        };
    });

    // si encontré algún campo vacío 
    if (formularioIncompleto) {
        alert("FALTAN COMPLETAR CAMPOS. REVISAR ANTES DE SEGUIR");
        return; 
    }

    // si está todo completo 
    const resumen = personas
        .map((p, i) => `${i + 1}. ${p.nombre} ${p.apellido} - Tel: ${p.telefono}`)
        .join('\n');

    alert(`Inscripción completada (${tipo.toUpperCase()})\n\n${resumen}`);
});

