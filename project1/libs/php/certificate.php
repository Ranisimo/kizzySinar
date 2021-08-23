<?php
        
    function curl( $url=NULL, $options=NULL, $headers=false ){
        /*
            https://curl.haxx.se/docs/caextract.html
            
            # download own copy of cacert.pem from internet
            # save in suitable location, edit below path.           
        */
        $cacert='C:\xampp\htdocs\project1\libs\php\cacert-2021-07-05.pem';
        $vbh = fopen('php://temp', 'w+');

        
        $res=array(
            'response'  =>  NULL,
            'info'      =>  array( 'http_code' => 100 ),
            'headers'   =>  NULL,
            'errors'    =>  NULL
        );
        if( is_null( $url ) ) return (object)$res;

        session_write_close();

        /* Initialise curl request object */
        $curl=curl_init();
        if( parse_url( $url,PHP_URL_SCHEME )=='https' ){
            curl_setopt( $curl, CURLOPT_SSL_VERIFYPEER, true );
            curl_setopt( $curl, CURLOPT_SSL_VERIFYHOST, 2 );
            curl_setopt( $curl, CURLOPT_CAINFO, $cacert );
            curl_setopt( $curl, CURLOPT_CAPATH, $cacert );
        }

        /* Define standard options */
        curl_setopt( $curl, CURLOPT_URL,trim( $url ) );
        curl_setopt( $curl, CURLOPT_AUTOREFERER, true );
        curl_setopt( $curl, CURLOPT_FOLLOWLOCATION, true );
        curl_setopt( $curl, CURLOPT_FAILONERROR, true );
        curl_setopt( $curl, CURLOPT_HEADER, false );
        curl_setopt( $curl, CURLINFO_HEADER_OUT, false );
        curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true );
        curl_setopt( $curl, CURLOPT_CONNECTTIMEOUT, 20 );
        curl_setopt( $curl, CURLOPT_TIMEOUT, 60 );
        curl_setopt( $curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.38 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.38' );
        curl_setopt( $curl, CURLOPT_MAXREDIRS, 10 );
        curl_setopt( $curl, CURLOPT_ENCODING, '' );
        
        curl_setopt( $curl, CURLOPT_VERBOSE, true );
        curl_setopt( $curl, CURLOPT_NOPROGRESS, true );
        curl_setopt( $curl, CURLOPT_STDERR, $vbh );
        

        /* Assign runtime parameters as options */
        if( isset( $options ) && is_array( $options ) ){
            foreach( $options as $param => $value ) curl_setopt( $curl, $param, $value );
        }
        
        if( $headers && is_array( $headers ) ){
            curl_setopt( $curl, CURLOPT_HTTPHEADER, $headers );
        }

        /* Execute the request and store responses */
        $res=(object)array(
            'response'  =>  curl_exec( $curl ),
            'info'      =>  (object)curl_getinfo( $curl ),
            'errors'    =>  curl_error( $curl )
        );
        rewind( $vbh );
        $res->verbose=stream_get_contents( $vbh );
        fclose( $vbh );
        curl_close( $curl );
        return $res;
    }
?>