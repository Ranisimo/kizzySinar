<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $start=microtime( true );
    $file=file_get_contents('vendors\json\countryBorders.geo.json');

    $json=json_decode($file, true);

    foreach ($json->features->properties as $object) {
        if ($object->iso_a3 == $_REQUEST['iso']) {
            $output=array(
                'border'    => $object->coordinates,
                'status'    =>  array(
                    'code'          =>  200,
                    'name'          =>  'ok',
                    'description'   =>  'success',
                    'returnedIn'    =>  intval( ( microtime( true ) - $start ) * 1000 ) . 'ms'   
                ),
            ); 
        } else {
            $output=$json;
        }
    }

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output); 
    
?>