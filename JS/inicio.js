// contador de cursos

const contadorCarrito = document.getElementById('preview-unidades');
let cantidadCursos = sessionStorage.getItem('cantidadCursos');

if (!cantidadCursos) {
  cantidadCursos = 0;
  sessionStorage.setItem('cantidadCursos', cantidadCursos);
}

contadorCarrito.textContent = cantidadCursos;


// slider

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let indice = 0;

function mostrarSlide(i) {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === i);
    dots[index].classList.toggle('active', index === i);
  });

  indice = i;
}

setInterval(() => {
  indice = (indice + 1) % slides.length;
  mostrarSlide(indice);
}, 4000);

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    mostrarSlide(i);
  });
});


// cursos dinamicos

const cursosDestacados = [
    {
        id: 1,
        titulo: "Curso de JavaScript",
        descripcion: "Aprendé JavaScript desde cero con ejercicios reales y proyectos prácticos.",
        imagen: "img/curso_js.png",
        precio: 50,
        beneficios: [
            "Aprendés desde cero",
            "Ejercicios reales",
            "Acceso de por vida",
            "Proyectos aplicados"
        ],
        requisitos: [
            "Ningún conocimiento previo",
            "PC o notebook",
            "Ganas de aprender"
        ],
        temario: [
            { titulo: "Introducción a JavaScript", descripcion: "Qué es JS, historia, dónde se usa, cómo funciona en el navegador." },
            { titulo: "Variables y tipos de datos", descripcion: "let, const, var, tipos de datos, coerción y buenas prácticas." },
            { titulo: "Operadores y expresiones", descripcion: "Operadores lógicos, aritméticos, comparaciones y precedencia." },
            { titulo: "Condicionales", descripcion: "Uso de if, else, else if y operadores ternarios." },
            { titulo: "Bucles", descripcion: "for, while, do while, for...of, for...in." },
            { titulo: "Funciones", descripcion: "Funciones declaradas, expresadas, callbacks, arrow functions." },
            { titulo: "Objetos y Arrays", descripcion: "Estructuras, métodos importantes, manipulación y recorrido." },
            { titulo: "DOM (Document Object Model)", descripcion: "Seleccionar elementos, modificar HTML, estilos y atributos." },
            { titulo: "Eventos", descripcion: "click, input, submit, listeners, delegación y propagación." },
            { titulo: "Fetch API", descripcion: "Pedir datos online, JSON, promesas y async/await." },
            { titulo: "Proyecto Final", descripcion: "Creación de mini app web con DOM + eventos + lógica real." }
        ],
        docente: {
            nombre: "Mariana Torres",
            especialidad: "JavaScript & Desarrollo Frontend",
            descripcion: "Desarrolladora Senior con más de 10 años en proyectos web modernos.",
            imagen: "img/docente_js.jpg"
        }

    },

    {
        id: 2,
        titulo: "Curso de CSS Profesional",
        descripcion: "Aprendé diseño web moderno con CSS3, Flexbox, Grid y Responsive Design.",
        imagen: "img/curso_css.png",
        precio: 40,
        beneficios: ["Responsive Design", "Flexbox", "Grid", "Animaciones"],
        requisitos: ["HTML básico", "PC o notebook"],
        temario: [
            { titulo: "Selectores y propiedades", descripcion: "Selectores básicos, combinadores, pseudo clases y pseudo elementos." },
            { titulo: "Modelo de caja (Box Model)", descripcion: "Padding, margin, border, display, overflow y box-sizing." },
            { titulo: "Tipografías y colores", descripcion: "Importación, variables, webfonts y teoría del color." },
            { titulo: "Flexbox", descripcion: "Ejes, alineación, distribución, orden y diseño flexible." },
            { titulo: "CSS Grid", descripcion: "Filas, columnas, áreas, layout avanzado y responsive." },
            { titulo: "Animaciones y transiciones", descripcion: "Transform, transition, keyframes, animaciones suaves." },
            { titulo: "Media Queries", descripcion: "Sitios responsive para móvil, tablet y escritorio." },
            { titulo: "Proyecto Final", descripcion: "Maquetación completa de un sitio profesional." }
        ],
        docente: {
            nombre: "Carlos Jiménez",
            especialidad: "CSS, UI/UX & Diseño Web",
            descripcion: "Diseñador web experto en responsive design y experiencia de usuario.",
            imagen: "img/docente_css.jpg"
        }

    },

    {
        id: 3,
        titulo: "Curso de Inteligencia Artificial",
        descripcion: "Introducción a la IA moderna: Machine Learning, Deep Learning y redes neuronales.",
        imagen: "img/curso_ia.png",
        precio: 90,
        beneficios: ["Machine Learning", "Redes Neuronales", "Conceptos modernos de IA"],
        requisitos: ["Python básico", "Lógica de programación"],
        temario: [
            { titulo: "Qué es la IA", descripcion: "Historia, aplicaciones modernas y futuro." },
            { titulo: "Machine Learning", descripcion: "Modelos supervisados y no supervisados." },
            { titulo: "Redes neuronales", descripcion: "Perceptrón, capas ocultas, funciones de activación." },
            { titulo: "Deep Learning", descripcion: "Redes profundas, entrenamiento y validación." },
            { titulo: "Procesamiento de datos", descripcion: "Limpieza, normalización y dataset." },
            { titulo: "Proyecto Final", descripcion: "Creación de un modelo predictivo básico." }
        ],
        docente: {
            nombre: "Lucía Fernández",
            especialidad: "Machine Learning & Deep Learning",
            descripcion: "Ingeniera en Sistemas especializada en IA aplicada a soluciones reales.",
            imagen: "img/docente_ia.jpg"
        }

    },

    {
        id: 4,
        titulo: "Curso de Excel Profesional",
        descripcion: "Aprendé Excel desde cero hasta nivel avanzado con funciones y dashboards.",
        imagen: "img/curso_excel.png",
        precio: 30,
        beneficios: ["Tablas", "Fórmulas", "Dashboard", "Funciones avanzadas"],
        requisitos: ["PC con Excel", "Manejo básico de PC"],
        temario: [
            { titulo: "Introducción a Excel", descripcion: "Interfaz, celdas, hojas, formatos y atajos." },
            { titulo: "Funciones básicas", descripcion: "SUMA, PROMEDIO, CONTAR, MAX, MIN, etc." },
            { titulo: "Funciones avanzadas", descripcion: "BUSCARV, BUSCARX, SI, CONTAR.SI.CONJUNTO, filtros." },
            { titulo: "Tablas y gráficos", descripcion: "Tablas dinámicas, gráficos y segmentación." },
            { titulo: "Dashboards", descripcion: "Diseño profesional + automatización." },
            { titulo: "Proyecto Final", descripcion: "Dashboard completo con KPIs reales." }
        ],
        docente: {
            nombre: "Sebastián Martínez",
            especialidad: "Data Analyst & Excel Avanzado",
            descripcion: "Analista con experiencia internacional en manejo avanzado de datos.",
            imagen: "img/docente_excel.jpg"
        }

    }
];


// guardar cursos en localStorage

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
    const cursosAleatoriosIniciales = barajarArray([...cursosDestacados]);
    localStorage.setItem('cursos', JSON.stringify(cursosAleatoriosIniciales));
}


// generar tarjetas en INDEX

function generarTarjetasCursos() {
    const contenedorCursosTotal = document.querySelector('.cursos-total');
    
    if (!contenedorCursosTotal) return;
    
    const cursosJSON = localStorage.getItem('cursos');
    if (!cursosJSON) return;

    let cursos = JSON.parse(cursosJSON); 
    cursos = barajarArray(cursos); 
    
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

        tarjeta.innerHTML = `
          <img src="${curso.imagen}" alt="${curso.titulo}" class="curso-imagen" loading="lazy">
          <div class="curso-contenido">
            <h3 class="curso-titulo">${curso.titulo}</h3>
            <p class="curso-descripcion">${curso.descripcion}</p>
            <p class="curso-precio">Precio: $${curso.precio}</p> 
            <a href="Paginas/detalle_curso.html?id=${curso.id}" class="curso-boton">Ver curso</a>
          </div>
        `;
        
        filaContenedor.appendChild(tarjeta);
        
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
