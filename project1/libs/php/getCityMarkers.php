<?php

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $start=microtime( true );
    $file=file_get_contents('C:\xampp\htdocs\project1\vendors\json\populatedPlacesSimple.geojson');


    $json = json_decode($file,true);

    $output = array();
    foreach ($json["features"] as $object) {
        if ($object["properties"]["iso_a2"] == $_REQUEST['iso']) {
            array_push($output, $object);
        };
        continue;
    };

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output); 
    
?>