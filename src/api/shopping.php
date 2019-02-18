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
    $img = isset($_POST['img']) ? $_POST['img'] : '';  //
    $title = isset($_POST['title']) ? $_POST['title'] : '';  //
    $nowprice = isset($_POST['nowprice']) ? $_POST['nowprice'] : '';  //
    $passprice = isset($_POST['passprice']) ? $_POST['passprice'] : '';  //
    $id = isset($_POST['id']) ? $_POST['id'] : '';  //
    $qty = isset($_POST['qty']) ? $_POST['qty'] : '';  //1
    $m = isset($_POST['m']) ? $_POST['m'] : '';  //用来判断
    $itemid = isset($_POST['itemid']) ? $_POST['itemid'] : '';  //用来判断
    $cid = isset($_POST['cid']) ? $_POST['cid'] : '';  //用来判断
    $idArr = isset($_POST['idArr']) ? $_POST['idArr'] : '';  //用来判断
    //print_r($idArr);


    // echo $img;
    // echo $title;
    // echo $nowprice;
    //echo $passprice;
    //echo $id;

    $res1 = $conn -> query("SELECT *FROM shopping where goodid='$id'");
    $len = $res1->num_rows;  //总长度
    $row = $res1 -> fetch_all(MYSQLI_ASSOC);
    //echo $len;
    //print_r($row);
   

    
 
    
    //长度大于0 不让插入
    if($len > 0) {
        //存在数据直接更新数量
        $res2 = $conn -> query("update shopping set qty=qty+1 where goodid='$id'");
        //echo 0;
    }else {
        
        $res = $conn -> query("insert into shopping(img, title, nowprice, passprice, goodid, qty) values('$img', '$title', '$nowprice', '$passprice', '$id', '$qty')");
        //echo 1;
    }

    switch ($m)
    {
    case "initialize":
        $shoppingres = $conn -> query("SELECT *FROM shopping");
        $shoppingrow = $shoppingres -> fetch_all(MYSQLI_ASSOC);
        echo json_encode($shoppingrow, JSON_UNESCAPED_UNICODE);
        break;
    case "increase":
        $conn -> query("update shopping set qty=qty+1 where goodid='$itemid'");
        echo 1;
    break;
    case "decrease":
        $conn -> query("update shopping set qty=qty-1 where goodid='$itemid'");
        echo 1;
    break;
    case "delete":
        $conn -> query("delete from shopping where goodid='$itemid'");
        echo 1;
    break;
    case "canceldelete":
       $conn -> query("insert into shopping(img, title, nowprice, passprice, goodid, qty) values('$img', '$title', '$nowprice', '$passprice', '$cid', '$qty')");
        echo 1;
    break;
    case "deleteAll":
        $conn -> query("delete from shopping where goodid='$idArr'");
        echo 1;
    break;
    
    default:
        
    }



    
    
    
    
    

  


    $conn -> close();

?>