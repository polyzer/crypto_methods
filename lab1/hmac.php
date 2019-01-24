<?php

function hmac ( $key, $data ) {
    $b = 128; // block size according RFC 2104
    if ( strlen( $key ) > $b ) {
        $key = pack( "H*", hash('sha384', $key ) );
    }
    $key = str_pad( $key, $b, chr(0x00) );
    echo "key is: " . $key. 'len: '. strlen($key).'<br/>';
    $ipad = str_pad( '', $b, chr(0x36) );
    echo "ipad is: " . $ipad.'<br/>';
    $opad = str_pad( '', $b, chr(0x5c) );
    echo "opad is: " . $opad.'<br/>';
    $k_ipad = $key ^ $ipad ;
    echo "k_ipad is: " . $k_ipad.'<br/>';
    $k_opad = $key ^ $opad;
    echo "k_opad is: " . $k_opad .'<br/>';
    return hash('sha384', $k_opad . pack("H*", hash('sha384', $k_ipad . $data ) ) );
 }
echo "HMAC: ". hmac("1", "97348123247");
?>