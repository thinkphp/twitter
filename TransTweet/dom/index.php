<?php

     $search = filter_input(INPUT_GET, 'search', FILTER_SANITIZE_ENCODED);
     $tl = filter_input(INPUT_GET, 'tl', FILTER_SANITIZE_ENCODED)

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
   <title>TransTweet - Search and tranlate tweets from users Twitter around the globe.</title>
   <link rel="stylesheet" href="http://yui.yahooapis.com/2.7.0/build/reset-fonts-grids/reset-fonts-grids.css" type="text/css">
   <link rel="stylesheet" href="http://yui.yahooapis.com/2.7.0/build/base/base.css" type="text/css">
   <link rel="stylesheet" href="style.css" type="text/css">
</head>
<body>
<div id="doc" class="yui-t7">
   <div id="hd" role="banner"><h1>TransTweet</h1></div>
   <div id="bd" role="main">
	<div class="yui-g">

               <form action="index.php" method="get" accept-charset="utf-8">
                     <label for="search">Search Twitter:</label><input type="text" id="search" name="search" value="<?php echo $search;?>">
                     <input type="submit" value="Go"> <label for="tl">Translate to:</label>
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
               </form>

               <!-- start results -->
               <div id="results">
               <?php
 
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

                             foreach($json->query->results->entry as $e) {

                                     $tweet = $e->title;

                                     $tweet = preg_replace('/(http\:\/\/\S+[^\.\s+])/',"<a href='$1'>$1</a>",$tweet);

                                     echo'<li><a href="'.$e->author->uri.'"><img src="'.$e->link[1]->href.'" alt="'.$e->author->name.'" />'.$e->author->name.'</a> '.$tweet.' <a href="'.$e->link[0]->href.'" class="permalink">#</a> <a href="translate.php?tl='.$tl.'&text='.urlencode($e->title).'" class="trans">translate</a></li>';  

                             }//end foreach 

                             echo'</ul>';

                       };//end if

                   } else {echo"<p class='failed'>I could't find any tweets for this search</p>";}

                 }//end search
   
               ?> 
               </div>
               <!-- end results -->

	</div>

	</div>   <div id="ft" role="contentinfo"><p>Written By <a href="http://twitter.com/thinkphp/">@thinkphp</a> using YUI, MooTools and pure JavaScript| <a href="http://yahoo.com/add?yapid=DpTx2J7i">YAP</a></p></div>
</div>

<script type="text/javascript" src="moo.js"></script>
<script type="text/javascript" src="dom.js"></script>
<script type="text/javascript">

  (function() {
 
       //grab container DIV in variable 'x'
       var x = DOMhelp.$('results');
 
           if(!x) {return;}  

           //attach a handler for x at event 'click'
           DOMhelp.addEvent(x,'click',function(e){

             //get target
             var target = DOMhelp.getTarget(e);
       
                  //if target is element A and this element has the className 'trans' then execute
                 if(target.nodeName.toLowerCase() == 'a' && target.className == 'trans') {

                         //get attribute 'href' and grab the value from element SELECT
                         var url = target.getAttribute('href'),objSelect = DOMhelp.$('tl');

                         //hold in variable lang the language target
                         var to = objSelect.selectedIndex, lang = objSelect.options[to].value;

                         //building URL
                         url = url + '&to='+ lang; 

                         //make request to the server with method GET
                         asyncRequest.REQUEST('get',url,function(resp){ 

                               //create an element SPAN
                               var span = document.createElement('span');

                                   //assign a className
                                   span.className = 'translation'; 

                                   //set a text
                                   span.innerHTML = resp;

                                   //inject into target nextsibling
                                   target.parentNode.insertBefore(span,target.nextSibling);

                                   //create an object Fx.Slide and hide the span
                                   var effect = new Fx.Slide(span).hide();
 
                                       //start effect
                                       effect.slideIn();

                                       //attach a handler span for event 'click'
                                       span.addEvent('click',function(e){

                                        //when the span is clicked then create the effect 'opacity' is 0 and dispose from tree
                                        var fx = new Fx.Tween(this,{ duration: 500,onComplete:function(){

                                                                     this.parentNode.dispose();

                                                                     this.dispose();

                                                                    }.bind(this)
                                                               });
                                            //animate
                                            fx.start('opacity',0);    
                                   });
                         }); 

                    //prevent click going  
                    DOMhelp.cancelClick(e);

                 };//end if

           },true);//end handler for event click 
                      
  })();//do exe

</script>

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
         if(empty($data)) {return "Sytem error!";} 
                    else
                          {return $data;}
    };//end function
?>