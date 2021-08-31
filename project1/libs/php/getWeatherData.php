<?php

    require 'certificate.php';
    
	$start=microtime( true );
    $url=sprintf( 'http://api.openweathermap.org/data/2.5/weather?q='. $_REQUEST['q'] . '&appid=dcb88380291aa038398ccaeceb1300a9');
    $res=curl( $url );
    
    if( $res->info->http_code==200 ){
        $json=json_decode( $res->response );
        $output=array(
            'weather'    =>  $json->weather,
            'status'    =>  array(
                'code'          =>  200,
                'name'          =>  'ok',
                'description'   =>  'success',
                'returnedIn'    =>  intval( ( microtime( true ) - $start ) * 1000 ) . 'ms'
            )
        );
    }else{
        $output=$res;
    }
    
    
    header('Content-Type: application/json; charset=UTF-8');
    exit( json_encode( $output ) );
?>