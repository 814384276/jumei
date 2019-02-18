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
    $qty = isset($_POST['qty']) ? $_POST['qty'] : '';  //3
    $num = isset($_POST['num']) ? $_POST['num'] : '';  //0  

    // echo $qty;
    // echo $num;

    $fir = $qty * $num;

    $res = $conn -> query("SELECT *FROM todaylist order by goodid limit $fir, $qty"); //查询3条
    $resAll = $conn -> query("SELECT *FROM todaylist"); //查询全部

    $len = $resAll->num_rows;  //全部数据长度

    $conn -> set_charset('utf-8');

    $row = $res -> fetch_all(MYSQLI_ASSOC);


    $datalist = array(
            'len' => $len,
            'list' => $row,
        );
    
    echo json_encode($datalist, JSON_UNESCAPED_UNICODE); 
    

    $res -> close();


    $conn -> close();

?>