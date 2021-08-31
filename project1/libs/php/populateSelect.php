<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $result=file_get_contents('C:\xampp\htdocs\project1\vendors\json\countryBorders.geo.json');

    $decode = json_decode($result,true);    

    $output['data'] = [];
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    foreach($decode['features'] as $feature)
    {
        array_push($output['data'], $feature['properties']);
    };

    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output); 
?>