// VALIDACIÓN DEL FORMULARIO DE CONTACTO 

// agarro todos los elementos que voy a usar
const formulario = document.getElementById('formulario');
const nombreInput = document.getElementById('Nombre');
const apellidoInput = document.getElementById('Apellido');
const emailInput = document.getElementById('Email');
const telefonoInput = document.getElementById('Telefono');
const consultaInput = document.getElementById('consulta');
const contador = document.getElementById('contador-caracteres');

// contador de caracteres del textarea en tiempo real
consultaInput.addEventListener('input', () => {
  const cantidad = consultaInput.value.length;
  contador.textContent = `${cantidad} / 1000 caracteres`;

  // si se pasa de 1000, lo pinto en rojo
  contador.style.color = cantidad > 1000 ? 'red' : 'black';
});

// regex para validar email y formato de teléfono
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^(\d{4}-?\d{4})$/;

// evento al enviar el form
formulario.addEventListener('submit', e => {
  e.preventDefault(); // no dejo que se recargue la página

  // chequeo nombre y apellido
  if (!nombreInput.value.trim() || !apellidoInput.value.trim()) {
    alert('⚠️ Por favor, completá nombre y apellido.');
    return;
  }

  // chequeo formato del mail
  if (!regexEmail.test(emailInput.value)) {
    alert('⚠️ Ingresá un correo electrónico válido.');
    return;
  }

  // chequeo teléfono (si escribió algo)
  if (telefonoInput.value.trim() !== '' && !regexTelefono.test(telefonoInput.value)) {
    alert('⚠️ El teléfono debe tener 8 dígitos (ej: 1234-5678 o 12345678).');
    return;
  }

  // si el mensaje es demasiado largo
  if (consultaInput.value.length > 1000) {
    alert('⚠️ El mensaje supera los 1000 caracteres permitidos.');
    return;
  }

  // si pasó todas las validaciones, muestro el modal de éxito
  mostrarModalExito();
});

// función que crea el popup de confirmación
function mostrarModalExito() {
  // creo el div del modal
  const modal = document.createElement('div');
  modal.classList.add('modal-exito');
  modal.innerHTML = `
    <div class="modal-contenido">
      <h2>Consulta enviada ✅</h2>
      <p>Gracias por contactarte con nosotros. Te responderemos pronto.</p>
      <button id="aceptar-modal">Aceptar</button>
    </div>
  `;

  // lo meto al body
  document.body.appendChild(modal);

  // cuando toca "Aceptar", cierro el modal y lo mando al inicio
  document.getElementById('aceptar-modal').addEventListener('click', () => {
    modal.remove();
    window.location.href = '../index.html';
  });
}
