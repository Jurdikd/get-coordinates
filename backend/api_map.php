<?php
include_once "../libs/CurlT.inc.php";


define('ACCESS_KEY', 'c59bc1d034f4e46966a6e79f32797f02'); #Datos de api key
//pk.81821689d784e076c4baa4f036de6a12

$url_map = 'https://us1.locationiq.com/v1/reverse?key=<pk.81821689d784e076c4baa4f036de6a12>&lat=51.503822&lon=-0.12575616&format=json';
//$url_map = "http://api.positionstack.com/v1/forward?access_key=" . ACCESS_KEY . "&query=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC";
echo var_dump(CurlTerror::get_simple($url_map));
