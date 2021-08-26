<?php

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $start=microtime( true );
    $file=file_get_contents('C:\xampp\htdocs\project1\vendors\json\countryBorders.geo.json');


    $json = json_decode($file,true);

    $output = [];
    foreach ($json["features"] as $object) {
        if ($object["properties"]["iso_a3"] == $_REQUEST['iso']) {
            $output['status']['code'] = "200";
            $output['status']['name'] = "ok";
            $output['status']['description'] = "success";
            $output['status']['returnedIn'] = intval((microtime(true) - $start) * 1000) . " ms";
            $output['data'] = $object["geometry"];
        };
    };

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output); 
    
?>