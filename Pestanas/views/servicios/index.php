<!-- VISTA DE ADMINISTRADOR -->
<h1 class="nombre-pagina">Servicios</h1>
<p class="descripcion-pagina">Administración de Servicios</p>

<?php
    include_once __DIR__ . '/../templates/barra.php';
?>

<!-- Anuncio de oferta -->


<ul class="servicios">
    <?php foreach($servicios as $servicio) { ?>
        <li>
            <p>Nombre: <span><?php echo $servicio->nombre; ?></span> </p>
            <p>Precio: <span>$<?php echo $servicio->precio; ?></span> </p>
            <!-- <p>Imagen: <span><?php echo $servicio->imagen_id; ?></span> </p> -->
            <!-- <p>Informacion: <span><?php echo $servicio->informacion; ?></span> </p> -->

            <div class="acciones">
                <a class="boton" href="/servicios/actualizar?id=<?php echo $servicio->id; ?>">Actualizar</a>

                <form action="/servicios/eliminar" method="POST">
                    <input type="hidden" name="id" value="<?php echo $servicio->id; ?>">

                    <input type="submit" value="Borrar" class="boton-eliminar">
                </form>
            </div>

            <!-- <div class="imagen">
                <img src="<?php echo $servicio->imagen; ?>" alt="Imagen del servicio">
            </div> -->
        </li>
    <?php } ?>
</ul>


