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
    $password = isset($_POST['password']) ? $_POST['password'] : '';  //
   


    $res = $conn -> query("insert into user(username, password) values('$name', '$password')");
    print_r($res);
  
?>