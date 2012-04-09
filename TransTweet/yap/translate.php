<?php

    if(isset($_GET['to']) && isset($_GET['text'])) {

          $to = $_GET['to'];

          $text = urldecode($_GET['text']);

          $root = 'http://query.yahooapis.com/v1/public/yql?q=';

          $yql = 'select * from google.translate where q="'.$text.'" and target="'.$to.'"';

          $url = $root . urlencode($yql) . '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

          $content = get($url);

          $results = json_decode($content);       

          echo stripslashes($results->query->results->translatedText);

    }//endif

    //use cURL
    function get($url) {

         $ch = curl_init();

         curl_setopt($ch,CURLOPT_URL,$url);    

         curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

         curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,2);

         $data = curl_exec($ch);

         curl_close($ch); 

         return $data;   
    }


?>