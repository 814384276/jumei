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

    $conn -> set_charset('utf-8');
    //echo "success";
    $today = isset($_POST['m']) ? $_POST['m'] : '';  //1

    //echo $today;
    if($today == "today") {
        $res = $conn -> query('SELECT *FROM goodlist');

        $conn -> set_charset('utf-8');

        $row = $res -> fetch_all(MYSQLI_ASSOC);
        echo json_encode($row, JSON_UNESCAPED_UNICODE); 
        $res -> close();
    }
    //渲染列表
    if($today == "list") {
        $res2 = $conn -> query('SELECT *FROM todaylist');

        

        $row2 = $res2 -> fetch_all(MYSQLI_ASSOC);
        echo json_encode($row2, JSON_UNESCAPED_UNICODE); 
        $res2 -> close();
    }

    //按价格升排序
    if($today == "price") {
        $res3 = $conn -> query('SELECT *FROM todaylist ORDER BY nowpric ASC');

        

        $row3 = $res3 -> fetch_all(MYSQLI_ASSOC);
        echo json_encode($row3, JSON_UNESCAPED_UNICODE); 
        $res3 -> close();
    }
    //按价格降排序
    if($today == "descending") {
        $res4 = $conn -> query('SELECT *FROM todaylist ORDER BY nowpric desc');

        

        $row4 = $res4 -> fetch_all(MYSQLI_ASSOC);
        echo json_encode($row4, JSON_UNESCAPED_UNICODE); 
        $res4 -> close();
    }


    //按价格降排序
    if($today == "sales") {
        $res5 = $conn -> query('SELECT *FROM todaylist ORDER BY liker asc');

        

        $row5 = $res5 -> fetch_all(MYSQLI_ASSOC);
        echo json_encode($row5, JSON_UNESCAPED_UNICODE); 
        $res5 -> close();
    }


    //按价格降排序
    if($today == "cart") {
        $res6 = $conn -> query('SELECT *FROM shopping');
        $row6 = $res6 -> fetch_all(MYSQLI_ASSOC);
        $len6 = $res6 -> num_rows;
        $datalist6 = array(
        'total' => $len6,
        'list' => $row6
        
        );
        echo json_encode($datalist6, JSON_UNESCAPED_UNICODE); 
        $res6 -> close();
    }

    
    //print_r($row);
    //var_dump($res);
    //var_dump(json_encode($row));

    // $total = $res -> num_rows;

    // $datalist = array(
    //     'total' => $total,
    //     'list' => $row
        
    // );
    
    
    

    


    $conn -> close();

?>