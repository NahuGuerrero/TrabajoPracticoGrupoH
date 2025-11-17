// los usuarios se guardan en localStorage bajo la clave 'usuarios'


// Agarro el form de registro si existe en la página
const formRegistro = document.getElementById('form-registro');

if (formRegistro) {
  formRegistro.addEventListener('submit', e => {
    e.preventDefault(); // Evito que se recargue la página

    // Agarro los valores del form
    const nombre = document.getElementById('registro-nombre').value.trim();
    const email = document.getElementById('registro-email').value.trim();
    const password = document.getElementById('registro-password').value.trim();

    // chequeo que no haya campos vacíos
    if (!nombre || !email || !password) {
      alert('Completá todos los campos.');
      return;
    }

    // traigo los usuarios guardados, o arranco con un array vacío
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // reviso si ya existe alguien con ese mail
    if (usuarios.some(u => u.email === email)) {
      alert('Ya existe una cuenta con ese correo.');
      return;
    }

    // creo el nuevo usuario y lo agrego al array
    const nuevoUsuario = { nombre, email, password };
    usuarios.push(nuevoUsuario);

    // guardo todo actualizado en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cuenta creada exitosamente. Ahora podés iniciar sesión.');
    window.location.href = 'login.html'; // redirige al login
  });
}


function cargarContadorUsuario() {
    // 1. Obtener el usuario activo de sessionStorage
    const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));
    
    // Determinar la clave de almacenamiento (Usamos el email como ID único)
    const USER_KEY = usuarioActivo ? usuarioActivo.email : 'carrito_invitado';
    const STORAGE_KEY = `carrito_${USER_KEY}`;
    
    // 2. Obtener el carrito específico del usuario
    const carritoUsuario = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    // 3. Calcular el total de unidades (sumando la cantidad de cada ítem)
    const totalUnidades = carritoUsuario.reduce((total, item) => total + item.cantidad, 0);
    
    // 4. Actualizar el contador visual en el header
    const contadorPreview = document.getElementById('preview-unidades');
    if (contadorPreview) {
        contadorPreview.textContent = totalUnidades;
        
        // 5. Opcional: Mantener sessionStorage actualizado con el total correcto
        sessionStorage.setItem('cantidadCursos', totalUnidades);
    }
}

// 6. Ejecutar la función cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarContadorUsuario);

// Nota: Si tus scripts se cargan al final del <body>,
// la llamada a document.addEventListener('DOMContentLoaded', ...) asegura la ejecución.

// INICIO DE SESIÓN 

const formLogin = document.getElementById('form-login');

if (formLogin) {
  formLogin.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // traigo los usuarios guardados (si no hay, queda vacío)
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // busco uno que coincida con el mail y la contraseña
    const usuarioValido = usuarios.find(u => u.email === email && u.password === password);

    // si no encontró ninguno, muestro error
    if (!usuarioValido) {
      alert('Credenciales inválidas. Revisá tu email o contraseña.');
      return;
    }

    // si encontró, lo guardo como usuario activo en sessionStorage
    sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido));

    alert(`Bienvenido, ${usuarioValido.nombre}`);
    window.location.href = '../index.html'; // redirige al inicio
  });
}


//  USUARIO ACTIVO 

// si hay alguien logueado, lo muestro en consola
const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));
if (usuarioActivo) {
  console.log(`Usuario logueado: ${usuarioActivo.nombre}`);
}

function cerrarSesion() {
    // 1. Elimina la clave que identifica al usuario activo de sessionStorage
    sessionStorage.removeItem('usuarioActivo');

    // Opcional: Limpiar el contador global (ya que el usuario ya no está logeado)
    sessionStorage.removeItem('cantidadCursos'); 

    // 2. Notificar o redirigir al inicio
    alert('Sesión cerrada exitosamente.');
    window.location.href = '../index.html'; // Redirige a la página principal
}
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');

// VERIFICACIÓN Y VINCULACIÓN AL CARGAR LA PÁGINA
if (btnCerrarSesion) {
    // Verificar si hay un usuario logeado (variable 'usuarioActivo' ya la tienes definida)
    const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));

    if (usuarioActivo) {
        // Mostrar el botón si hay sesión activa
        btnCerrarSesion.style.display = 'block'; 
        
        // Asignar el evento click para cerrar la sesión
        btnCerrarSesion.addEventListener('click', cerrarSesion);
    } else {
        // Ocultar el botón si no hay sesión
        btnCerrarSesion.style.display = 'none';
    }
}


// ELIMINAR CUENTA 


function eliminarCuenta(email) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // filtro todos menos el que quiero eliminar
  const nuevosUsuarios = usuarios.filter(u => u.email !== email);

  // guardo el nuevo array sin ese usuario
  localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));

  // borro la sesión activa
  sessionStorage.removeItem('usuarioActivo');

  alert('Tu cuenta ha sido eliminada.');
  window.location.href = '../index.html'; // vuelvo al inicio
}
