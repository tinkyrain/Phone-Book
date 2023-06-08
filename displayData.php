<?php 
    include 'linkDB.php';
    
    $json_data = [];
    $data = mysqli_query($conn, "SELECT * FROM `persons`"); 

    while($row = $data->fetch_assoc()){
        $json_data[] = $row;
    }

    if($result){
        echo json_encode($json_data);
    } else {
        echo json_encode($json_data);
    }
?>