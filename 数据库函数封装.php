

<?php header('Content-Type:text/html;charset=utf-8'); 
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-07 15:45:48 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-07 16:08:20
 */

function opt($sql){
    //连接数据库
    $conn = mysqli_connect("localhost","root","root","test");

    //2设置字符集
    mysqli_set_charset($conn,"utf-8");


    //3.判断是否连接成功
    if(!$conn){
        die("连接失败.....");
    }

    //4.根据sql 语句来执行增删改的操作
    $res = mysqli_query($conn,$sql);

    //5.判断增删改的操作是否成功
    if($res){
        $stu="操作成功.....";
    }else{
        $stu="操作失败....";
    }

    //6关闭数据库
    mysqli_close($conn);
    return $stu;
}


/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-07 15:47:10 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2018-06-07 15:47:10 
 */
function select($sql){
    // 1.引入数据库
    $conn = mysqli_connect("localhost","root","root","test");
    
    //2.判断数据库连接是否成功
    if(!$conn){
        die("连接数据库失败......");
    }

    //3.设置数据代码格式
    mysqli_set_charset($conn,"utf-8");


    //4.根据sql语句进行数据库查询
    $res = mysqli_query($conn,$sql);

    //5,判断sql语句执行是否成功
    if(!$res){
        $selectArr = "操作失败....";
    }else if(mysqli_num_rows($res)==0){
        $selectArr = "数据库里面没有数据...";
    }else{
        while($arr = mysqli_fetch_array($res,MYSQLI_ASSOC)){
            $selectArr[] = $arr;
        }
    }
    //6.执行完毕关闭数据库
    mysqli_close($conn);
    //7,把结果返回给调用的对象;
    return $selectArr;
}

?>