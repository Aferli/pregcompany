<?php
echo "11111";
die();
header("Content-type:text/html;charset=utf-8");
$servername = "localhost";
$username = "root";
$pwd = "";
try{
    $db = new PDO("mysql:host=$servername;dbname=test",$username,$pwd);
    $db->exec("set names utf8");

    die();
}catch (PDOException $e){
    print $e->getMessage();
    die();
}

$pageinfo = $_POST['pageinfo'];
$len = count( $pageinfo['entrInfo']);
$info = [];
for ($i=0;$i<$len;$i++){
    $info = [
        $pageinfo['entrInfo'][$i]['title'],
        $pageinfo['entrInfo'][$i]['href'],
        $pageinfo['entrInfo'][$i]['legal'],
        $pageinfo['entrInfo'][$i]['starttime'],
        $pageinfo['entrInfo'][$i]['capital'],
        $pageinfo['entrInfo'][$i]['addr'],
    ];
   // $info = json_decode(iconv("utf-8","gb2312//IGNORE,ASCII",json_encode($info)));
    intosql($db,$info);
}

return ['code' => 200,'msg' => '存储成功'];
 function intosql($db,$info){
     $sql = "insert into qxbcomp (title,href,legal,starttime,capital,addr) VALUES 
('{$info[0]}','{$info[1]}','{$info[2]}','{$info[3]}','{$info[4]}','{$info[5]}')";
     $db->exec($sql);
     $db = null;
 }