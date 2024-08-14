<?php

$db = mysqli_connect('localhost', 'root', 'MySQL12', 'appsalon_mvc_php');


if (!$db) {
    echo "Error: No se pudo conectar a MySQL.";
    echo "errno de depuración: " . mysqli_connect_error();
    echo "error de depuración: " . mysqli_connect_error();
    exit;
}
