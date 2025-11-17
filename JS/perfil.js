document.addEventListener('DOMContentLoaded', () => {
    const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));

    // 1. Verificar si hay sesion activa
    if (!usuarioActivo) {
        alert('Debés iniciar sesión para ver tu perfil.');
        window.location.href = 'login.html';
        return;
    }

    // Agrega la informacion del usuario
    document.getElementById('perfil-nombre').textContent = usuarioActivo.nombre;
    document.getElementById('perfil-email').textContent = usuarioActivo.email;

    // Vincula los botones de cerrar cuenta y eliminar cuenta
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    const btnEliminarCuenta = document.getElementById('btn-eliminar-cuenta');

    // Metodo cerrar sesion
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            cerrarSesion();
        });
    }

    // Metodo eliminar cuenta
    if (btnEliminarCuenta) {
        btnEliminarCuenta.addEventListener('click', () => {
            if (confirm(`¿Estás seguro de que quieres eliminar la cuenta de ${usuarioActivo.email}? Esta acción no se puede deshacer.`)) {
                eliminarCuenta(usuarioActivo.email);
            }
        });
    }
});