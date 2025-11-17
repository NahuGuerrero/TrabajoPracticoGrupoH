// agarro todos los inputs y elementos que voy a usar
const colorOpciones = document.querySelectorAll('input[name="color"]');
const previewDestinatario = document.getElementById("preview-destinatario");
const inputDestinatario = document.getElementById("nombre");

const fuenteOpciones = document.querySelectorAll('input[name="fuente"]');

const inputMonto = document.getElementById("monto");
const previewMonto = document.getElementById("preview-monto");

const ubicacionOpciones = document.querySelectorAll('input[name="ubicacion"]');
const fondoOpciones = document.querySelectorAll('input[name="fondo"]');
const giftcard = document.getElementById("giftcard");

const btnConfirmar = document.getElementById("confirmar");

// cambio de color del nombre del destinatario
colorOpciones.forEach(op => {
  op.addEventListener("change", () => {
    previewDestinatario.style.color = op.value;
  });
});

// cuando escribo el nombre, se actualiza en la preview
inputDestinatario.addEventListener("input", () => {
  previewDestinatario.textContent = inputDestinatario.value || "Destinatario";
});

// cambio de tamaño de fuente del nombre
fuenteOpciones.forEach(op => {
  op.addEventListener("change", () => {
    previewDestinatario.style.fontSize = op.value;
  });
});

// actualización en tiempo real del monto
inputMonto.addEventListener("input", () => {
  previewMonto.textContent = `$${inputMonto.value || "0000"}.-`;
});

// cambio de ubicación del monto dentro de la tarjeta
ubicacionOpciones.forEach(op => {
  op.addEventListener("change", () => {
    // limpio las posiciones anteriores
    previewMonto.style.top = "";
    previewMonto.style.right = "";
    previewMonto.style.left = "";
    previewMonto.style.bottom = "";
    previewMonto.style.transform = "";

    // según el id, muevo el monto a una esquina distinta
    switch (op.id) {
      case "ubic1": // arriba a la izquierda
        previewMonto.style.top = "0.2em";
        previewMonto.style.left = "0.2em";
        break;

      case "ubic2": // arriba a la derecha
        previewMonto.style.top = "0.2em";
        previewMonto.style.right = "0.2em";
        break;

      case "ubic3": // abajo a la izquierda
        previewMonto.style.bottom = "0.2em";
        previewMonto.style.left = "0.2em";
        break;
    }
  });
});

// apenas carga la página, aplico la ubicación marcada por defecto
window.addEventListener("DOMContentLoaded", () => {
  const seleccionado = document.querySelector('input[name="ubicacion"]:checked');
  if (seleccionado) seleccionado.dispatchEvent(new Event("change"));
});

// cambio de fondo de la giftcard
fondoOpciones.forEach(op => {
  op.addEventListener("change", () => {
    if (op.id === "fondo1") giftcard.style.backgroundColor = "gray";
    if (op.id === "fondo2") giftcard.style.backgroundColor = "lightblue";
    if (op.id === "fondo3") giftcard.style.backgroundColor = "lightcoral";
  });
});

// botón confirmar → guarda la giftcard en el carrito (localStorage)
btnConfirmar.addEventListener("click", () => {
  const destinatario = inputDestinatario.value;
  const monto = inputMonto.value;
  const color = document.querySelector('input[name="color"]:checked')?.value || "";
  const fuente = document.querySelector('input[name="fuente"]:checked')?.value || "";
  const fondo = document.querySelector('input[name="fondo"]:checked')?.id || "";

  // armo el objeto con los datos de la giftcard actual
  const giftcardData = {
    destinatario,
    monto,
    color,
    fuente,
    fondo
  };

  // traigo el carrito del localStorage (si no hay, arranca vacío)
  let carrito = JSON.parse(localStorage.getItem("giftcardsEnCarrito")) || [];

  // agrego la nueva giftcard
  carrito.push(giftcardData);

  // guardo todo de nuevo en localStorage
  localStorage.setItem("giftcardsEnCarrito", JSON.stringify(carrito));

  // aviso rápido al usuario
  alert("Giftcard agregada al carrito");
});
