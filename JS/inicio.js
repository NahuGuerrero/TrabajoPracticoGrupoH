// ==== CONTADOR DE CURSOS ====

// agarro el elemento del contador en el header
const contadorCarrito = document.getElementById('preview-unidades');

// si ya hay algo guardado en sessionStorage, lo uso
let cantidadCursos = sessionStorage.getItem('cantidadCursos');

// si no hay nada, lo creo desde cero
if (!cantidadCursos) {
  cantidadCursos = 0;
  sessionStorage.setItem('cantidadCursos', cantidadCursos); // arranco en 0
}

// muestro el valor actual del contador
contadorCarrito.textContent = cantidadCursos;




// SLIDER 

// selecciono las imágenes del slider y los puntitos
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let indice = 0; // guarda el número del slide que está visible

// función que muestra el slide correspondiente y actualiza los puntitos
function mostrarSlide(i) {
  slides.forEach((slide, index) => {
    // si el índice coincide con el slide que quiero mostrar, lo activo
    slide.classList.toggle('active', index === i);
    dots[index].classList.toggle('active', index === i); // mismo con los puntitos
  });

  indice = i; // guardo el slide actual
}

// cambio automático cada 4 segundos
setInterval(() => {
  // paso al siguiente slide, y si estoy en el último, vuelvo al primero
  indice = (indice + 1) % slides.length;

  // muestro el nuevo slide
  mostrarSlide(indice);
}, 4000); // 4 segundos

// control manual con clics en los puntitos
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    mostrarSlide(i); // muestro el slide correspondiente al puntito clickeado
  });
});

// Se crea un array con el contenido de las tarjetas
const cursosDestacados = [
    {
        id: 1,
        titulo: "Curso de JavaScript",
        descripcion: "Aprende JavaScript desde cero y crea tus propias aplicaciones web.",
        imagen: "img/curso_js.png",
        url: "Paginas/detalle_curso.html",
        precio: 50
    },
    {
        id: 2,
        titulo: "Curso de CSS",
        descripcion: "Aprende CSS desde cero y diseña tus propias aplicaciones web.",
        imagen: "img/curso_css.png",
        url: "#",
        precio: 40
    },
    {
        id: 3,
        titulo: "Curso de Inteligencia Artificial",
        descripcion: "Conoce distintas técnicas y conceptos relacionados a la construcción de sistemas inteligentes.",
        imagen: "img/curso_ia.png",
        url: "#",
        precio: 90
    },
    {
        id: 4,
        titulo: "Curso de Excel",
        descripcion: "Aprende Excel desde cero hasta nivel experto. Optimiza tu productividad personal y profesional.",
        imagen: "img/curso_excel.png",
        url: "#",
        precio: 30
    },
    {
        id: 5,
        titulo: "Curso de Java",
        descripcion: "Iniciate desde cero. Con Java, desarrollarás aplicaciones versátiles, efectivas y ligeras.",
        imagen: "img/curso_java.png",
        url: "#",
        precio: 75
    },
    {
        id: 6,
        titulo: "Curso de Python",
        descripcion: "Curso de Python, Programación de código abierto y desarrollo de aplicaciones.",
        imagen: "img/curso_python.png",
        url: "#",
        precio: 80
    }
];

//Se barajan las opciones del array asignando un randomIndex 
function barajarArray(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;

}

if (localStorage.getItem('cursos') === null) {
    // Se crea una copia del array y se baraja antes de guardarlo
    const cursosAleatoriosIniciales = barajarArray([...cursosDestacados]);
    
    // Guardamos el orden aleatorio inicial
    localStorage.setItem('cursos', JSON.stringify(cursosAleatoriosIniciales));
}

//Funcion para generar las tarjetas de forma dinamica
function generarTarjetasCursos() {
    const contenedorCursosTotal = document.querySelector('.cursos-total');
    
    if (!contenedorCursosTotal) return;
    
    const cursosJSON = localStorage.getItem('cursos');
    if (!cursosJSON) return;
    
    //Se convierte la cadena JSON a un array de cursos
    let cursos = JSON.parse(cursosJSON); 
    
    //Se baraja el array cada vez que se cargue la pagina
    cursos = barajarArray(cursos); 
    
    //Se limpian los contenedores
    let contenedorActual = contenedorCursosTotal.querySelector('.cursos-disponibles');
    while (contenedorActual) {
        contenedorCursosTotal.removeChild(contenedorActual);
        contenedorActual = contenedorCursosTotal.querySelector('.cursos-disponibles');
    }
    
    let filaContenedor = document.createElement('div');
    filaContenedor.classList.add('cursos-disponibles');
    
    cursos.forEach((curso, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');
        //Formato de cada tarjeta
    tarjeta.innerHTML = `
      <img src="${curso.imagen}" alt="Curso de ${curso.titulo}" class="curso-imagen" loading="lazy">
       <div class="curso-contenido">
         <h3 class="curso-titulo">${curso.titulo}</h3>
          <p class="curso-descripcion">
             ${curso.descripcion}
         </p>
         <p class="curso-precio">Precio: $${curso.precio}</p> 
          <a href="Paginas/detalle_curso.html?id=${curso.id}" class="curso-boton">Ver curso</a>
      </div>
  `;
        
        filaContenedor.appendChild(tarjeta);
        
        // Agrega la fila al contenedor principal cada 3 elementos o al final
        if ((index + 1) % 3 === 0 || index === cursos.length - 1) {
            contenedorCursosTotal.appendChild(filaContenedor);
            
            if (index !== cursos.length - 1) {
                filaContenedor = document.createElement('div');
                filaContenedor.classList.add('cursos-disponibles');
            }
        }
    });

}
document.addEventListener('DOMContentLoaded', generarTarjetasCursos);

// ==== CARRUSEL DE MÉTODOS DE PAGO ====
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.medios-pago-track');
  if (!track) return;

  const logos = Array.from(track.querySelectorAll('img'));
  if (logos.length === 0) return;

  let indice = 0;

  const mostrarLogo = () => {
    logos.forEach((logo, i) => {
      logo.classList.toggle('activo', i === indice);
    });
  };

  const btnPrev = document.querySelector('.medios-pago .prev');
  const btnNext = document.querySelector('.medios-pago .next');

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      indice = (indice - 1 + logos.length) % logos.length;
      mostrarLogo();
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      indice = (indice + 1) % logos.length;
      mostrarLogo();
    });
  }

  // Mostrar el primer logo al cargar
  mostrarLogo();

  // Rotación automática cada 4 segundos (opcional)
  setInterval(() => {
    indice = (indice + 1) % logos.length;
    mostrarLogo();
  }, 4000);
});
