<?php
    header("content-type:text/html;charset=utf-8");

    $servername = 'localhost';

    $username = 'root';

    $psw = '';

    $dbname = 'jumei';


    $conn = new mysqli($servername, $username, $psw, $dbname);

    if($conn -> connect_error) {
        die('连接失败');
    }


    //echo "success";
    $id = isset($_POST['dataId']) ? $_POST['dataId'] : '';  //
   


    $res = $conn -> query("SELECT *FROM todaylist  where goodid=$id");
    

    $row = $res -> fetch_all(MYSQLI_ASSOC);
    

   
    
    echo json_encode($row, JSON_UNESCAPED_UNICODE); 
    

    $res -> close();


    $conn -> close();

?>