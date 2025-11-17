const titulo_texto = document.getElementById('titulo-popup');
const descripcion = document.getElementById('descripcion-popup');
const modal_container = document.getElementById('modal-container');
const close = document.getElementById('close');
const vinculo = document.getElementById('vinculo');

const botones = document.getElementsByName('boton-accion');

if (botones.length > 0) {
  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const texto = boton.innerText.trim().toLowerCase();

      if (texto.includes("javascript")) {
        titulo_texto.innerText = "Curso de JavaScript";
        descripcion.innerText = "Aprende JavaScript desde cero y domina la lógica de la web dinámica.";
        vinculo.href = "../Paginas/detalle_curso.HTML";
        
      } else if (texto.includes("html")) {
        titulo_texto.innerText = "Curso de HTML y CSS";
        descripcion.innerText = "Aprende a diseñar y maquetar páginas web desde cero con HTML5 y CSS3.";
        vinculo.href = "./cursoHTML.html";

      } else if (texto.includes("python")) {
        titulo_texto.innerText = "Curso de Python";
        descripcion.innerText = "Descubre el lenguaje más versátil para desarrollo web, análisis de datos y más.";
        vinculo.href = "../cursoPhyton.html";
      }

      modal_container.classList.add('show');
    });
  });
}

close.addEventListener('click', () => {
  modal_container.classList.remove('show');
});

window.addEventListener('click', e => {
  if (e.target === modal_container) {
    modal_container.classList.remove('show');
  }
});

const menuHamburguesa = document.getElementById("menu-hamburguesa");
if (menuHamburguesa) {
  menuHamburguesa.addEventListener("click", () => {
    const menu = document.getElementById("menu-horizontal");
    menu.classList.toggle("menu-abierto");
  });
};
