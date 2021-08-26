<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $start=microtime( true );
    $file=file_get_contents('vendors\json\countryBorders.geo.json');

    $json=json_decode($file, true);

    foreach ($json->features->properties as $object) {
        if ($object->iso_a3 == $_REQUEST['iso']) {
            $output['status']['code'] = "200";
            $output['status']['name'] = "ok";
            $output['status']['description'] = "success";
            $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
            $output['data'] = $decode['coordinates'];
        } else {
            $output=$json;
        }
    };

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output); 
    
?>