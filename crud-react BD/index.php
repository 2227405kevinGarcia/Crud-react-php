<?php

include 'bd/bd.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id_cliente'])){
        $query="select * from clientes where id_cliente=".$_GET['id_cliente'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from clientes";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $Tipo_Documento = $_POST['Tipo_Documento'];
    $N_Documento = $_POST['N_Documento'];
    $Nombre = $_POST['Nombre'];
    $Apellido = $_POST['Apellido'];
    $Direccion = $_POST['Direccion'];
    $Fecha_Nacimiento = $_POST['Fecha_Nacimiento'];
    $Pais = $_POST['Pais'];
    
    $query="insert into clientes (Tipo_Documento, N_Documento, Nombre, Apellido, Direccion, Fecha_Nacimiento, Pais ) values ('$Tipo_Documento', '$N_Documento', '$Nombre', '$Apellido', '$Direccion', '$Fecha_Nacimiento', '$Pais')";
    $queryAutoIncrement="select MAX(id) as id_cliente from clientes";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id_cliente=$_GET['id_cliente'];
    $Tipo_Documento = $_POST['Tipo_Documento'];
    $N_Documento = $_POST['N_Documento'];
    $Nombre = $_POST['Nombre'];
    $Apellido = $_POST['Apellido'];
    $Direccion = $_POST['Direccion'];
    $Fecha_Nacimiento = $_POST['Fecha_Nacimiento'];
    $Pais = $_POST['Pais'];

    $query="UPDATE clientes SET Tipo_Documento='$Tipo_Documento', N_Documento='$N_Documento', Nombre='$Nombre', Apellido='$Apellido', Direccion='$Direccion', Fecha_Nacimiento='$Fecha_Nacimiento', Pais='$Pais' WHERE id_cliente='$id_cliente'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id_cliente=$_GET['id_cliente'];
    $query="DELETE FROM clientes WHERE id_cliente='$id_cliente'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>