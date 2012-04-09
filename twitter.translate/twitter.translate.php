<?php

//the YQL statement
$yql = 'use \'http://thinkphp.ro/apps/Twitter/twitter.translate/twitter.translate.xml\' as twitter.trans;'.
 
       ' select * from twitter.trans where search="mootools" and language="en" and amount="10"';

//call the YQL endpoint via cURL
$endpoint = 'http://query.yahooapis.com/v1/public/yql?q=';

$url = $endpoint . urlencode($yql) . '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

$r = json_decode(get($url));

//for debugging
echo'<!--';

print_r($r);

echo'-->';

//loop over results and if they are available show them as an unordered list

$out = '';

      if($r->query->results) {

             $out .= '<ul>';  

                  foreach($r->query->results->results as $res) {

                          $out .= '<li>';

                          $out .= '<div><img src="'.$res->profile_image_url.'" alt="avatar">'.$res->from_user.'</div>'; 

                          $out .= '<p>'.$res->text.'</p>';

                          $out .= '<p><strong>English: </strong>'.$res->translatedText.'</p>';

                          $out .= '</li>';
                 
                  }  

             $out .= '</ul>';

      } 


function get($url){
  $ch = curl_init();
  curl_setopt($ch,CURLOPT_URL,$url);
  curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
  curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,2);
  $output = curl_exec($ch);
  curl_close($ch);
 return $output;
}


?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/combo?2.8.0/build/reset-fonts-grids/reset-fonts-grids.css&2.8.0/build/base/base-min.css">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
  <title>twitter.translate using Open Data Table</title>
  <style type="text/css">
  html,body{font-family: helvetica,arial,verdana,sans-serif;}
  ul{margin:0;padding:0;}
  ul li div{float: left}
  ul li{list-style: none;padding: 1em 0;}
  li{clear: both;padding-bottom: 10px}
  li div img {display: block;margin: 5px auto;width: 48px;height: 48px}
  li div{width: 100px;border: 1px solid #999;background: #e7fbf1;text-align: center;margin-right: 1em}
  pre{padding:.2em;border:1px solid #999;background:#e7fbf1;margin:1em 0;}
  h1{font-size:300%;margin:0;text-align:left;color:#3c3}
  #ft{ margin:2em 0;font-size:90%;text-align:right;color:#333;}
  #ft a{color: #444}
  </style>
</head>
<body>
<div id="doc" class="yui-t7">
   <div id="hd" role="banner"><h1>twitter.translate</h1></div>
<div><pre><code>
<?php echo str_replace('; select',';<br>select',$yql); ?>
</code></pre></div>
   <div id="bd" role="main">
	<div class="yui-g">

<?php

echo$out;

?>
	</div>
	</div>
   <div id="ft" role="contentinfo"><p>written by <a href="http://thinkphp.ro">Adrian Statescu</a> using YQL , YUI and Execute JavaScript in Open Data <a href="http://thinkphp.ro/apps/Twitter/twitter.translate/twitter.translate.xml">Table</a> | <a href="twitter.translate.phps">source</a></p></div>
</div>
</body>
</html>