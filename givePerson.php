<?php 
    include 'linkDB.php';

    $json_data = [];
    $userID = $_POST['Id'];
    $sql = "SELECT * from persons WHERE Id=$userID";

    $result = mysqli_query($conn, $sql);

    while($row = $result->fetch_assoc()){
        $json_data[] = $row;
    }

    if($result){
        echo json_encode($json_data);
    } else {
        echo json_encode($json_data);
    }
?>