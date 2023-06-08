<?php
    if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['who'])){
        include 'linkDB.php';

        $name = mysqli_real_escape_string($conn, $_POST["name"]);
        $phone = mysqli_real_escape_string($conn, $_POST["phone"]);
        $who = mysqli_real_escape_string($conn, $_POST["who"]);

        $sql = "INSERT INTO persons (name, phone, who) VALUES ('$name', $phone, '$who')";

        $resultPerson = array(
            'name' => $_POST['name'],
            'phone' => $_POST['phone'],
            'who' => $_POST['who']
        );

        if(mysqli_query($conn, $sql)){
            echo json_encode($resultPerson);
        } else {
            echo json_encode($resultPerson);
        }
    }
?>