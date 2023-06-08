<?php
    if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['who'])){
        include 'linkDB.php';

        $name = mysqli_real_escape_string($conn, $_POST["name"]);
        $phone = mysqli_real_escape_string($conn, $_POST["phone"]);
        $who = mysqli_real_escape_string($conn, $_POST["who"]);
        $userId = mysqli_real_escape_string($conn, $_POST["id"]);

        $sql = "UPDATE `persons` set `Name`='{$name}', `Phone`='{$phone}', `Who`='{$who}' WHERE `persons`. `Id` = '{$userId}' ";

        if(mysqli_query($conn, $sql)){
            echo 1;
        } else {
            echo 0;
        }
    }
?>