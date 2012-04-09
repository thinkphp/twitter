<?php

/**
 * Twitter: @thinkphp
 * Version: 2.0
 * Copyright (c) 2012, Adrian Statescu @thinkphp
 */

header('Content-type:image/png');

$info = array();

$user = $_GET['user'];

$isjs = "/^[a-z|A-Z|_|-|\$|0-9|\.]+$/";

if(preg_match($isjs,$user)) {

  $url = "http://api.twitter.com/1/users/lookup.json?screen_name=thinkphp&include_entities=true";

  $resp = get($url); 

  $json = json_decode($resp, true);

  $profile = $json[0];

  $info['updater'] = convert($profile['statuses_count']);

  $info['follower'] = convert($profile['friends_count']);

  $info['followed'] = convert($profile['followers_count']);

   $disp = array();

   $max = max($info);

   $ratio = 100 / $max;

   foreach($info as $key=>$value) {
     if($max == $value) {
        $type = $key; 
     } 
     $disp[$key] = $value * $ratio;
   }

  $x = ($type == 'updater') ? (' is an ') : ($type == 'follower' ? ' is a ' : ($type == 'followed' ? ' is being ' : ''));

  $title = $user . $x. $type;

  $out = array();

  foreach($info as $k=>$v) {
     $out[] = $k .'%20('. $v .')';
  }

  $labels = join($out,"|");
  $values = join($disp,",");

  $image = get('http://chart.apis.google.com/chart?cht=p3&chco=F2E353,FFA305,54688E&'.'chtt='.urlencode($title).'&chd=t:'.$values.'&chs=250x100&chl='.$labels);

  echo$image;

} else {

  echo"<b>Usage: filename.php?user=thinkphp</b>"; 

}//endif-else

function get($url) {

    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 3);
    $ret = curl_exec($ch);
    curl_close($ch);

  return $ret;
}
       
function convert($n) {

      //replace comma with space
      $n = str_replace(',','',$n);
      //convert to integer
      $n = (int)$n;
  //and return the integer
  return($n);
}
?>
