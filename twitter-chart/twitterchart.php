<?php
/*
  Twittertype by Adrian Statescu
  Version: 1.0
  Homepage: http://thinkphp.php/twitterchart
  Copyright (c) 2008, Adrian Statescu
  Code licensed under the BSD License:
  http://license.txt
*/

$user = $_GET['user'];
$isjs = "/^[a-z|A-Z|_|-|\$|0-9|\.]+$/";

if(preg_match($isjs,$user)) {

header('Content-type:image/png');

$info = array();

$cont = get('http://twitter.com/'.$user);

preg_match_all('/<span id="following_count" class="stats_count numeric">([^>]+)<\/span>/msi',$cont,$follow);
$info['follower'] = convert($follow[1][0]);

preg_match_all('/<span id="follower_count" class="stats_count numeric">([^>]+)<\/span>/msi',$cont,$follower);
$info['followed'] = convert($follower[1][0]);

preg_match_all('/<span id="update_count" class="stat_count">([^>]+)<\/span>/msi',$cont,$updates);
$info['updater'] = convert($updates[1][0]);


$max = max($info);

$convert = 100 / $max;

  foreach($info as $k=>$f) {

          if($f === $max) {

             $type = $k;
          }

     $disp[$k] = $f*$convert;
  }

  if($type == 'updater')  {

        $t = ' is an ';
  }

  if($type == 'follower')  {

        $t = ' is a ';
  }

  if($type == 'followed')  {

        $t = ' is being ';
  }



 $title = $user. $t . $type;

 $out = array();

  foreach($info as $k=>$i){

    $out[] = $k.'+('.$i.')';
  }


 $labels = join($out,'|');

 $values = join($disp,',');

  
  $img = get('http://chart.apis.google.com/chart?cht=p3&chco=F2E353,FFA305,54688E&'.'chtt='.urlencode($title).'&chd=t:'.$values.'&chs=700x380&chl='.$labels);


 echo$img; 

}


function get($url) {

$ch = curl_init();

curl_setopt($ch,CURLOPT_URL,$url);

curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

$feed = curl_exec($ch);

curl_close($ch);

return $feed;

}


function convert($n) {

   $n = str_replace(',','',$n);

   $n = (int)$n;

   return $n;

}
       
?>