<?php

     $search = filter_input(INPUT_GET, 'search', FILTER_SANITIZE_ENCODED);

     $language = filter_input(INPUT_GET, 'tl', FILTER_SANITIZE_ENCODED);

     $amount = filter_input(INPUT_GET, 'amount', FILTER_SANITIZE_ENCODED);

     $lang = array("en"=>"English","ro"=>"Romanian","de"=>"German","fr"=>"Franch","it"=>"Italian","es"=>"Spanish","cr"=>"Croatian","cz"=>"Czech","no"=>"Norwegian","pl"=>"Polish","pr"=>"Portuguese","ru"=>"Russian","se"=>"Swedish","tr"=>"Turkish","uk"=>"Ukrainian");

     if(isset($search) && isset($language) && isset($amount) && $amount != '' && $search != '' && $language != '') {

     //the YQL statement
     $yql = 'use \'http://thinkphp.ro/apps/Twitter/twitter.translate/twitter.translate.xml\' as twitter.trans;'.
 
       ' select * from twitter.trans where search="'.$search.'" and language="'.$language.'" and amount="'.$amount.'"';

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

      //if we have results then go
      if($r->query->results) {

             //start markup UL
             $out .= '<ul>';  

                  //if we have many results then execute
                  if(is_array($r->query->results->results)) {

                     //loop through array and save them in var $out;
                     foreach($r->query->results->results as $res) {

                          $out .= '<li>';

                          $out .= '<div><img src="'.$res->profile_image_url.'" alt="avatar" />'.$res->from_user.'</div>'; 

                          $out .= '<p>'.preg_replace('/(http\:\/\/\S+[^\.\s+])/',"<a href='$1'>$1</a>",$res->text).'</p>';

                          $out .= '<p><strong>'.$lang[$language].': </strong>'.$res->translatedText.'</p>';

                          $out .= '</li>';
                 
                     }//endforeach

                   //otherwise we have one result then execute
                   } else {

                          $res = $r->query->results->results;

                          $out .= '<li>';

                          $out .= '<div><img src="'.$res->profile_image_url.'" alt="avatar" />'.$res->from_user.'</div>'; 

                          $out .= '<p>'.preg_replace('/(http\:\/\/\S+[^\.\s+])/',"<a href='$1'>$1</a>",$res->text).'</p>';

                          $out .= '<p><strong>'.$lang[$language].': </strong>'.$res->translatedText.'</p>';

                          $out .= '</li>';
                   }

             //close markup ul
             $out .= '</ul>';

      //display the errors
      } else {$out = "<p class='failed'>No results for <strong>".urldecode($search)."</strong> in ".$lang[$language]."</p>";}

     } else {$out = "<p class='failed'>I could't find any tweets for this search</p>";}


?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
   <title>TransTweet - Translate Twitter Updates</title>
   <link rel="stylesheet" href="http://yui.yahooapis.com/2.7.0/build/reset-fonts-grids/reset-fonts-grids.css" type="text/css">
   <link rel="stylesheet" href="http://yui.yahooapis.com/2.7.0/build/base/base.css" type="text/css">
   <style type="text/css">
   html,body{ background: #1A1B1F url('http://assets3.twitter.com/images/themes/theme9/bg.gif') fixed no-repeat top left;font-family: calibri;color: #ccc}
   input[type='submit']{border:1px solid #000;padding:0 .5em;margin:0 .5em;}
   h1{font-size:200%;color:#C3FFAE;font-weight:bold;margin:5px 0;}
   form{border:1px solid #000;border-color:#336E00 #336E00 #336E00 #336E00;font-size:130%;background:#336E00;color:#fff;font-weight:bold;padding:.5em;margin:.5em 0;-moz-border-radius:5px;-webkit-border-radius:5px;}
   #results ul{margin:0;padding:0;}
   #results ul li div{float: left}
   #results ul li{list-style: none;padding: 1em 0;}
   #results ul li{clear: both;padding-bottom: 10px}
   #results ul li div img {display: block;margin: 5px auto;width: 48px;height: 48px}
   #results ul li div{width: 100px;border: 1px solid #999;background: #fff;text-align: center;margin-right: 1em;color: #000}
   #results ul li p a{color: #393}
   #results ul li strong {color: #69c}
   .failed {border: 10px solid #dd3;-moz-border-radius: 8px;-webkit-border-radius: 8px;  border-radius: 8px;  background: #dd3;  width: 717px;  text-align: center;  font-size: 130%;  color: #000;  padding: 5px;  margin: 10px auto;}
  #ft{ margin:2em 0;font-size:90%;text-align:right;color:#ccc;}
  #ft a{color: #ccc}
   </style> 
</head>
<body>
<div id="doc" class="yui-t7">
   <div id="hd" role="banner"><h1>twitter.translate</h1></div>
   <div id="bd" role="main">
	<div class="yui-g">

               <form action="<?php echo$_SERVER['PHP_SELF'];?>" method="get" accept-charset="utf-8">
                     <label for="search">Search Twitter:</label><input type="text" id="search" name="search" value="<?php echo $search;?>">
                     <input type="submit" value="Go"> <label for="tl">language</label>
                     <select name="tl" id="tl">
                             <option value="en">English</option>
                             <option value="ro">Romanian</option>
                             <option value="de">German</option>
                             <option value="fr">French</option>
                             <option value="it">Italian</option>
                             <option value="es">Spanish</option>
                             <option value="cr">Croatian</option>
                             <option value="cz">Czech</option>
                             <option value="no">Norwegian</option>
                             <option value="pl">Polish</option>
                             <option value="pr">Portuguese</option>
                             <option value="ru">Russian</option>
                             <option value="se">Swedish</option>
                             <option value="tr">Turkish</option>
                             <option value="uk">Ukrainian</option>
                     </select>                    
                     <label for="amount">Amount:</label>
                     <input type="text" id="amount" name="amount" value="<?php echo$amount;?>" size="2">
               </form>

               <!-- start results -->
               <div id="results">

               <?php                 echo$out;               ?>

               </div>
               <!-- end results -->

	</div>

	</div>

       <div id="ft" role="contentinfo"><p>written by <a href="http://thinkphp.ro">Adrian Statescu</a> using YQL , YUI and Execute JavaScript in Open Data <a href="http://thinkphp.ro/apps/Twitter/twitter.translate/twitter.translate.xml">Table</a> | <a href="twitter.translate.form.phps">source</a></p></div>
</div>

</body>
</html>


<?php

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