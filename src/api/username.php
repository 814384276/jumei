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
    $name = isset($_POST['username']) ? $_POST['username'] : '';  //
    //echo $name;


    $res = $conn -> query("SELECT *FROM user where username='$name'");
    //print_r($res);
    //echo $res;
    $len = $res->num_rows;  //总长度
    $row = $res -> fetch_all(MYSQLI_ASSOC);

    
    //echo $len;

    if($len > 0) {
        echo 0;
    }else {
        echo 1;
    }
    

   
    
    // echo json_encode($row, JSON_UNESCAPED_UNICODE); 
    

    $res -> close();


    $conn -> close();

?>