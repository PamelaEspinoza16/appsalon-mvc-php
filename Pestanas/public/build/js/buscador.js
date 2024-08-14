function iniciarApp() {
    buscarPorFecha();
}

function buscarPorFecha() {
    document.querySelector("#fecha").addEventListener("input", function(event) {
        const fecha = event.target.value;
        window.location = `?fecha=${fecha}`;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    iniciarApp();
});
