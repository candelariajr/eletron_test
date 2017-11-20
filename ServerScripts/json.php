<?php
/**
 * Created by PhpStorm.
 * User: Jonathan
 * Date: 11/19/2017
 * Time: 10:13 PM
 */

/*
 * This is for JSON callback testing only
 * */

$returnString = json_encode(
    array(
        "foo" => 2,
        "bar" => 4,
        "baz" => array("a" , 4, "3")
    )
);
//echo $returnString;
$data = json_decode(file_get_contents('php://input'), true);


if(!empty(file_get_contents('php://input'))){
    echo(file_get_contents('php://input'));
    //echo json_encode($_POST);
    //echo json_encode(array("a" => "B"));
}else if(!empty($_GET)){
    echo json_encode($_GET);
}else{
    echo json_encode(array("message" => "no data"));
}

