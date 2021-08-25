
<?php

    require 'certificate.php';
    
	$start=microtime( true );
    $url=sprintf( 'https://restcountries.eu/rest/v2/alpha/' . $_REQUEST['iso']);
    $res=curl( $url );
    
    if( $res->info->http_code==200 ){
        $json=json_decode( $res->response );
        $output=array(
            'name'  => $json->name,
            'capital'    =>  $json->capital,
			'population'	=> $json->population,
			'region'	=> $json->region,
			'demonym'	=> $json->demonym,
			'languages'	=> $json->languages,
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