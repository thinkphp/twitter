<style type="text/css" media="screen">
#doc{background: #1A1B1F url('http://assets3.twitter.com/images/themes/theme9/bg.gif') fixed no-repeat top left;font-family: calibri;color: #ccc;border: 20px solid #1A1B1F}
input[type='submit']{border:1px solid #000;padding:0 .5em;margin:0 .5em;}
h1{font-size:200%;color:#C3FFAE;font-weight:bold;margin:5px 0;}
form{border:1px solid #000;border-color:#336E00 #336E00 #336E00 #336E00;font-size:130%;background:#336E00;color:#fff;font-weight:bold;padding:.5em;margin:.5em 0;}
#results ul,#results li{list-style:none;padding:0;margin:0;}
#results p.intro {font-weight:bold;  font-size:127%;  margin:10px 0;color: #fff}
#results li{font-size:107%;position:relative;padding-right:5em;padding-left:60px;min-height:60px;padding-bottom:.5em;}
#results li img{width:48px; left:0; top:0; position:absolute;border: 0}
#results li span{  display:block;  background: #fff;  margin:.5em 0; color: #000}
.failed {border: 10px solid #dd3;-moz-border-radius: 8px;-webkit-border-radius: 8px;  border-radius: 8px;  background: #dd3;  width: 717px;  text-align: center;  font-size: 130%;  color: #000;  padding: 5px;  margin: 10px auto;}
#results .trans{color: #fff;position: absolute;top:0;right:0;text-decoration:none;background: #265200;display:block;color:#fff;padding:.2em;font-weight:bold;}
#results .avatar{color: #fff;}
#results .permalink{color: #fff;font-weight: bold;font-size: 14px}
#ft{margin: 1em 0;font-family:Calibri,Sans-serif;text-align:left;font-size: 14px;color: #EBFFDF}
#ft a {color: #EBFFDF;}
</style>

<div id="doc" class="yui-t7">
   <div id="hd"><h1>TransTweet</h1></div>
   <div id="bd">
	<div class="yui-g">

               <yml:form params="transtweet.php" method="get" insert="results">
                     <label for="search">Search Twitter:</label><input type="text" id="search" name="search" value="<?php echo $search;?>">
                     <input type="submit" value="Run"> <label for="tl">Translate to:</label>
                     <select name="to" id="to">
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
               </yml:form>

               <!-- start results -->
               <div id="results">

               </div>
               <!-- end results -->

	</div>

	</div>
   <div id="ft"><p>Written By <a href="http://thinkphp.ro">Adrian Statescu</a> | <a href="http://thinkphp.ro/apps/Twitter/TransTweet/dom/">DOM solution</a></p></div>
</div>