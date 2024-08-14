<?php 
// MODELO DE USUARIO
namespace Model;

class Servicio extends ActiveRecord {
    // Base de datos
    protected static $tabla = 'servicios';
    protected static $columnasDB = ['id', 'nombre', 'precio', 'imagen_id', 'informacion'];

    public $id;
    public $nombre;
    public $precio;
    public $imagen_id;
    public $informacion;

    public $imagen;

    
    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->precio = $args['precio'] ?? '';
        // $this->imagen = $args['imagen_id'] ?? '';
        $this->informacion = $args['informacion'] ?? '';
        $this->imagen = $args['imagen'] ?? '/Pestanas/public/build/img/imagen1.jpg'; // Ruta de la imagen 


    }
}