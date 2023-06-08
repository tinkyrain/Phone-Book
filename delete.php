<?php
    include 'linkDB.php';

    $userID = $_POST['Id'];
    $sql = "DELETE from persons WHERE id=$userID";
    $res = mysqli_query($conn, $sql);

    if($res == TRUE){
        echo 1;
    } else {
        echo 0;
    }
?>