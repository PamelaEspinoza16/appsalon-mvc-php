let paso = 1;
const pasoInicial = 1, pasoFinal = 3;
const cita = { id: "", nombre: "", fecha: "", hora: "", servicios: [] };

function iniciarApp() {
    mostrarSeccion();
    tabs();
    botonesPaginador();
    paginaSiguiente();
    paginaAnterior();
    consultarAPI();
    idCliente();
    nombreCliente();
    seleccionarFecha();
    seleccionarHora();
    mostrarResumen();
}

function mostrarSeccion() {
    const seccionActual = document.querySelector(".mostrar");
    seccionActual && seccionActual.classList.remove("mostrar");
    const pasoSelector = `#paso-${paso}`;
    document.querySelector(pasoSelector).classList.add("mostrar");

    const tabActual = document.querySelector(".actual");
    tabActual && tabActual.classList.remove("actual");
    document.querySelector(`[data-paso="${paso}"]`).classList.add("actual");
}

function tabs() {
    document.querySelectorAll(".tabs button").forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();
        });
    });
}

function botonesPaginador() {
    const btnAnterior = document.querySelector("#anterior");
    const btnSiguiente = document.querySelector("#siguiente");

    if (paso === 1) {
        btnAnterior.classList.add("ocultar");
        btnSiguiente.classList.remove("ocultar");
    } else if (paso === 3) {
        btnAnterior.classList.remove("ocultar");
        btnSiguiente.classList.add("ocultar");
        mostrarResumen();
    } else {
        btnAnterior.classList.remove("ocultar");
        btnSiguiente.classList.remove("ocultar");
    }

    mostrarSeccion();
}

function paginaAnterior() {
    document.querySelector("#anterior").addEventListener("click", function() {
        if (paso > pasoInicial) {
            paso--;
            botonesPaginador();
        }
    });
}

function paginaSiguiente() {
    document.querySelector("#siguiente").addEventListener("click", function() {
        if (paso < pasoFinal) {
            paso++;
            botonesPaginador();
        }
    });
}

async function consultarAPI() {
    try {
        const url = "http://localhost:3000/api/servicios";
        const respuesta = await fetch(url);
        const servicios = await respuesta.json();
        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const { id, nombre, precio, informacion } = servicio;

        const nombreServicio = document.createElement("P");
        nombreServicio.classList.add("nombre-servicio");
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement("P");
        precioServicio.classList.add("precio-servicio");
        precioServicio.textContent = `$${precio}`;

        const infoServicio = document.createElement("P");
        infoServicio.classList.add("informacion");
        infoServicio.textContent = informacion;

        const contenedorServicio = document.createElement("DIV");
        contenedorServicio.classList.add("servicio");
        contenedorServicio.dataset.idServicio = id;
        contenedorServicio.onclick = function() {
            seleccionarServicio(servicio);
        };

        const imagenServicio = document.createElement("IMG");
        imagenServicio.src = `http://localhost/Pestanas/public/build/img/imagen${id}.jpg`;
        imagenServicio.alt = `Imagen del servicio ${nombre}`;

        contenedorServicio.appendChild(imagenServicio);
        contenedorServicio.appendChild(nombreServicio);
        contenedorServicio.appendChild(precioServicio);
        contenedorServicio.appendChild(infoServicio);

        document.querySelector("#servicios").appendChild(contenedorServicio);
    });
}



function seleccionarServicio(servicio) {
    const { id } = servicio;
    const { servicios } = cita;
    const elementoServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    if (servicios.some(servicio => servicio.id === id)) {
        cita.servicios = servicios.filter(servicio => servicio.id !== id);
        elementoServicio.classList.remove("seleccionado");
    } else {
        cita.servicios = [...servicios, servicio];
        elementoServicio.classList.add("seleccionado");
    }
}

function idCliente() {
    cita.id = document.querySelector("#id").value;
}

function nombreCliente() {
    cita.nombre = document.querySelector("#nombre").value;
}

function seleccionarFecha() {
    document.querySelector("#fecha").addEventListener("input", function(e) {
        const dia = new Date(e.target.value).getUTCDay();
        if ([6, 0].includes(dia)) {
            e.target.value = "";
            mostrarAlerta("Fines de semana no permitidos", "error", ".formulario");
        } else {
            cita.fecha = e.target.value;
        }
    });
}

function seleccionarHora() {
    document.querySelector("#hora").addEventListener("input", function(e) {
        const hora = e.target.value.split(":")[0];
        if (hora < 10 || hora > 18) {
            e.target.value = "";
            mostrarAlerta("Hora No Válida", "error", ".formulario");
        } else {
            cita.hora = e.target.value;
        }
    });
}

function mostrarAlerta(mensaje, tipo, elemento, desaparecer = true) {
    const alertaPrevia = document.querySelector(".alerta");
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    const alerta = document.createElement("DIV");
    alerta.textContent = mensaje;
    alerta.classList.add("alerta", tipo);
    document.querySelector(elemento).appendChild(alerta);

    if (desaparecer) {
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Otros códigos...

    const btnMostrarCodigo = document.getElementById('mostrarCodigo');

    btnMostrarCodigo.addEventListener('click', function() {
        const codigoIngresado = prompt('Ingresa el código de descuento:');
        
        if (codigoIngresado === 'DESCUENTO_LASHES!') {
            aplicarDescuento();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Código Incorrecto',
                text: 'El código ingresado no es válido.'
            });
        }
    });

    

    function aplicarDescuento() {
        const servicioSeleccionado = document.querySelector('.servicio.seleccionado');
        
        if (!servicioSeleccionado) {
            Swal.fire({
                icon: 'error',
                title: 'Selecciona un Servicio',
                text: 'Debes seleccionar un servicio antes de aplicar el descuento.'
            });
            return;
        }

        const idServicio = servicioSeleccionado.dataset.idServicio;
        const precioServicioElemento = servicioSeleccionado.querySelector('.precio-servicio');
        const precioActual = parseFloat(precioServicioElemento.textContent.replace('$', ''));
        const nuevoPrecio = precioActual * 0.8; // Aplicar 20% de descuento

        precioServicioElemento.textContent = `$${nuevoPrecio.toFixed(2)}`;

        Swal.fire({
            icon: 'success',
            title: 'Descuento Aplicado',
            text: 'Se ha aplicado un descuento del 20% al servicio seleccionado.'
        });
    }

    // Otros códigos...
});

function mostrarResumen() {
    const resumen = document.querySelector(".contenido-resumen");
    while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    if (Object.values(cita).includes("") || cita.servicios.length === 0) {
        mostrarAlerta("Faltan datos de Servicios, Fecha u Hora", "error", ".contenido-resumen", false);
        return;
    }

    const { nombre, fecha, hora, servicios } = cita;

    const encabezadoServicios = document.createElement("H3");
    encabezadoServicios.textContent = "Resumen de Servicios";
    resumen.appendChild(encabezadoServicios);

    servicios.forEach(servicio => {
        const { nombre, precio } = servicio;
        const contenedorServicio = document.createElement("DIV");
        contenedorServicio.classList.add("contenedor-servicio");

        const nombreServicio = document.createElement("P");
        nombreServicio.textContent = nombre;
        
        const nuevoPrecio = precio * 0.8;
        const precioServicio = document.createElement("P");
        precioServicio.innerHTML = `<span>Precio:</span> $${nuevoPrecio.toFixed(2)}`;

        contenedorServicio.appendChild(nombreServicio);
        contenedorServicio.appendChild(precioServicio);
        resumen.appendChild(contenedorServicio);
    });

    const encabezadoCita = document.createElement("H3");
    encabezadoCita.textContent = "Resumen de Cita";
    resumen.appendChild(encabezadoCita);

    const nombreCita = document.createElement("P");
    nombreCita.innerHTML = `<span>Nombre:</span> ${nombre}`;

    const fechaCita = new Date(fecha);
    const opcionesFecha = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const fechaFormateada = new Date(Date.UTC(fechaCita.getFullYear(), fechaCita.getMonth(), fechaCita.getDate() + 2)).toLocaleDateString("es-MX", opcionesFecha);
    const fechaElemento = document.createElement("P");
    fechaElemento.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaElemento = document.createElement("P");
    horaElemento.innerHTML = `<span>Hora:</span> ${hora} Horas`;

    const botonReservar = document.createElement("BUTTON");
    botonReservar.classList.add("boton");
    botonReservar.textContent = "Reservar Cita";
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCita);
    resumen.appendChild(fechaElemento);
    resumen.appendChild(horaElemento);
    resumen.appendChild(botonReservar);
}


async function reservarCita() {
    const { nombre, fecha, hora, servicios, id } = cita;
    const idServicios = servicios.map(servicio => servicio.id);
    const formData = new FormData();
    formData.append("fecha", fecha);
    formData.append("hora", hora);
    formData.append("usuarioId", id);
    formData.append("servicios", idServicios);

    try {
        const url = "http://localhost:3000/api/citas";
        const respuesta = await fetch(url, {
            method: "POST",
            body: formData
        });
        const resultado = await respuesta.json();

        if (resultado.resultado) {
            Swal.fire({
                icon: "success",
                title: "Cita Creada",
                text: "Tu cita fue creada correctamente",
                button: "OK"
            }).then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al guardar la cita"
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    iniciarApp();
});
