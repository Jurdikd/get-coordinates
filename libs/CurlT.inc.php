<?php

/** Libreria creada por Jurdikd
 * Alias Terror
 */
class CurlTerror
{
    public static function get_simple($url)
    {
        # Obtener valores simple
        $conexion = curl_init(); #Inicia la peticion - Inicia una nueva sesión cURL
        curl_setopt($conexion, CURLOPT_URL, $url); #curl_setopt – Define opciones para nuestra sesion cURL
        curl_setopt($conexion, CURLOPT_HTTPGET, TRUE);
        curl_setopt(
            $conexion,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json'
            )
        );
        curl_setopt($conexion, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_2);
        curl_setopt($conexion, CURLOPT_RETURNTRANSFER, 1);
        //curl_setopt($conexion, CURLOPT_USERPWD, "usuario:pass");
        $respuesta = curl_exec($conexion); #curl_exec – Ejecuta la petición HTTP

        if (empty($respuesta)) {
            // si viene vacia matamos la conecion
            die(curl_error($conexion));
            curl_close($conexion); // close cURL handler
            return 404; #retornamos error 404
        } else {
            $info = curl_getinfo($conexion);
            $httpcode = curl_getinfo($conexion, CURLINFO_HTTP_CODE);
            curl_close($conexion); // close cURL handler

            if (empty($info['http_code'])) {
                return $httpcode; #No HTTP code was returned
            } else  if ($httpcode >= 200 && $httpcode < 300) {
                # retornamos los datos en json...
                return json_decode($respuesta, true);
            } else {
                return $httpcode; #retornamos el error
            }
        }
    }
}
