<?php 
    $conn = mysqli_connect("localhost", "root", "", "LuckryTest");

    if(!$conn){
        die("Ошибка: " . mysqli_connect_error());
    }
?>