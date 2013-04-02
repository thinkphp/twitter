<?php

     $to = filter_input(INPUT_GET, 'to', FILTER_SANITIZE_ENCODED);

     $search = filter_input(INPUT_GET, 'search', FILTER_SANITIZE_ENCODED);
 
     if(isset($search)) {

                   $root = 'http://query.yahooapis.com/v1/public/yql?q=';

                   $yql = 'select * from atom where url= "http://search.twitter.com/search.atom?q='.$search.'"';

                   $url = $root . urlencode($yql) . '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

                   $content = get($url);                   

                   $json = json_decode($content);

                   if($json->query->results) {

                       if($json->query->results->entry) {

                             echo'<p class="intro">Below are the Twitter search results. Simply hit the translate button to translate tweets that are not in your language</p>';

                             echo'<ul>';

                             $count = 0;

                             foreach($json->query->results->entry as $e) {

                                     $count++;

                                     $tweet = $e->title;

                                     $tweet = preg_replace('/(http\:\/\/\S+[^\.\s+])/',"<a href='$1' style='color: #087300'>$1</a>",$tweet);

                                     echo'<li><a href="'.$e->author->uri.'" class="avatar"><img src="'.$e->link[1]->href.'" alt="photo" />'.$e->author->name.'</a> '.$tweet.' <a href="'.$e->link[0]->href.'" class="permalink">#</a> <yml:a view="YahooFullView" params="translate.php?to='.$to.'&text='.urlencode($tweet).'" insert="output'.$count.'" class="trans">Translate</yml:a><span id="output'.$count.'"></span></li>';

                             }//end foreach 

                             echo'</ul>';

                       };//end if

                   } else {echo"<p class='failed'>I could't find any tweets for this search</p>";}

     }//end search


    //use cURL
    function get($url) {

         $ch = curl_init();

         curl_setopt($ch,CURLOPT_URL,$url);    

         curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

         curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,2);

         $data = curl_exec($ch);

         curl_close($ch); 

         return $data;   

    };//end function
?> 