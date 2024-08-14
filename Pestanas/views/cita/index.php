<!-- VISTA DE USUARIO -->
<h1 class="nombre-pagina">Crear Nueva Cita</h1>
<p class="descripcion-pagina">Elige tus servicios y coloca tus datos</p>

<?php 
    include_once __DIR__ . '/../templates/barra.php';
?>

<div id="app">
    <nav class="tabs">
        <button class="actual" type="button" data-paso="1">Servicios</button>
        <button type="button" data-paso="2">Información Cita</button>
        <button type="button" data-paso="3">Resumen</button>
    </nav>

    <h1 class="nombre-pagina">Servicios</h1>
    <p class="descripcion-pagina">Administración de Servicios</p>

    <?php
        include_once __DIR__ . '/../templates/barra.php';
    ?>

    <!-- Anuncio de oferta -->
    <div class="oferta">
        <h2>¡Oferta Especial de Pestañas!</h2>
        <p>Consigue un 20% de descuento en tu próximo servicio de pestañas.</p>
        <button id="mostrarCodigo">Obtener Código de Descuento</button>
        <button id="mostrarCuponesAnteriores">Cupones Anteriores</button>
    </div>

    <!-- Ventana emergente -->
    <div id="codigoDescuentoModal" class="modal">
        <div class="modal-contenido">
            <span class="cerrar">&times;</span>
            <p>¡Aquí tienes tu código de descuento: <strong>DESCUENTO_LASHES</strong>!</p>
        </div>
    </div>

    <!-- Ventana emergente para Cupones Anteriores -->
    <div id="cuponesAnterioresModal" class="modal">
        <div class="modal-contenido">
            <span class="cerrar">&times;</span>
            <p>ERROR: SE BORRARON LOS CUPONES ANTERIORES</p>
        </div>
    </div>

    <!-- Pelotas -->
    <div class="pelota" id="pelota1"></div>
    <div class="pelota" id="pelota2"></div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var modal = document.getElementById('codigoDescuentoModal');
            var btnMostrarCodigo = document.getElementById('mostrarCodigo');
            var btnMostrarCuponesAnteriores = document.getElementById('mostrarCuponesAnteriores');
            var spanCerrarCodigo = document.getElementsByClassName('cerrar')[0];
            var spanCerrarCupones = document.getElementsByClassName('cerrar')[1];

            btnMostrarCodigo.onclick = function() {
                modal.style.display = 'block';
            }

            spanCerrarCodigo.onclick = function() {
                modal.style.display = 'none';
            }

            btnMostrarCuponesAnteriores.onclick = function() {
                document.getElementById('cuponesAnterioresModal').style.display = 'block';
            }

            spanCerrarCupones = function() {
                document.getElementById('cuponesAnterioresModal').style.display = 'none';
            }

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
                if (event.target == document.getElementById('cuponesAnterioresModal')) {
                    document.getElementById('cuponesAnterioresModal').style.display = 'none';
                }
            }

            // Animación de las pelotas
            function moverPelota(pelota) {
                let x = Math.random() * window.innerWidth;
                let y = Math.random() * window.innerHeight;
                let dx = 1 * (Math.random() < 0.5 ? 1 : -1); // Velocidad reducida
                let dy = 1 * (Math.random() < 0.5 ? 1 : -1); // Velocidad reducida
                let contadorBotes = 0;

                function animar() {
                    x += dx;
                    y += dy;

                    if (x + pelota.clientWidth >= window.innerWidth || x <= 0) {
                        dx *= -1;
                        contadorBotes++;
                    }
                    if (y + pelota.clientHeight >= window.innerHeight || y <= 0) {
                        dy *= -1;
                        contadorBotes++;
                    }

                    if (contadorBotes >= 3) {
                        // Bloquea la interacción
                        pelota.style.pointerEvents = 'none';
                        pelota.style.opacity = 0.5; // Indica visualmente que está bloqueado
                    }

                    pelota.style.left = x + 'px';
                    pelota.style.top = y + 'px';

                    requestAnimationFrame(animar);
                }

                animar();
            }

            moverPelota(document.getElementById('pelota1'));
            moverPelota(document.getElementById('pelota2'));
        });
    </script>

    <style>
        /* Estilos para el anuncio */
        .oferta {
            background-color: #d183f9;
            border: 1px solid #ddd;
            padding: 20px;
            margin-bottom: 20px;
            text-align: center;
        }
        .oferta h2 {
            margin-top: 0;
        }

        /* Estilos para la ventana emergente */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            padding-top: 60px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
        }

        .modal-contenido {
            background-color: rgb(209, 131, 249);
            color: white;
            margin: 5% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 500px;
            text-align: center;
        }

        .cerrar {
            color: white;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }

        .cerrar:hover,
        .cerrar:focus {
            color: black;
            text-decoration: none;
        }

        /* Estilos para las pelotas */
        .pelota {
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: red;
        }

        #pelota1 {
            background-color: pink;
        }

        #pelota2 {
            background-color: purple;
        }
    </style>

    <div id="paso-1" class="seccion">
        <h2>Servicios</h2>
        <p class="text-center">Elige tus servicios a continuación</p>
        <div id="servicios" class="listado-servicios"></div>
    </div>



    <div id="paso-2" class="seccion">
        <h2>Tus Datos y Cita</h2>
        <p class="text-center">Coloca tus datos y fecha de tu cita</p>
        
        <form class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input
                    id="nombre"
                    type="text"
                    placeholder="Tu Nombre"
                    value="<?php echo $nombre; ?>"
                    disabled
                />
            </div>

            <div class="campo">
                <label for="fecha">Fecha</label>
                <input
                    id="fecha"
                    type="date"
                    min="<?php echo date('Y-m-d', strtotime('+1 day') ); ?>"
                />
            </div>

            <div class="campo">
                <label for="hora">Hora</label>
                <input
                    id="hora"
                    type="time"
                />
            </div>
            <input type="hidden" id="id" value="<?php echo $id; ?>" >
        </form>
    </div>




    <div id="paso-3" class="seccion contenido-resumen">
        <h2>Resumen</h2>
        <p class="text-center">Verifica que la información sea correcta</p>
    </div>

    <div class="paginacion">
        <button 
            id="anterior"
            class="boton"
        >&laquo; Anterior</button>

        <button 
            id="siguiente"
            class="boton"
        >Siguiente &raquo;</button>
    </div>
</div>

<?php 
    $script = "
        <script src='//cdn.jsdelivr.net/npm/sweetalert2@11'></script>
        <script src='build/js/app.js'></script>
    ";
?>
