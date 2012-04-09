<?php
/* 
MultiTweet by Adrian Statescu (index file)
Version: 1.0
Homepage: http://thinphp.ro/apps/twitter/multitweet/
Copyright (c) 2009, Adrian Statescu
Code licensed under the BSD License:
http://thinkphp.ro/license.txt
*/

require_once('controller.php');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <title>multiTweet</title>
   <link rel="stylesheet" href="http://yui.yahooapis.com/2.7.0/build/reset-fonts-grids/reset-fonts-grids.css" type="text/css">
   <link rel="stylesheet" href="http://yui.yahooapis.com/2.7.0/build/base/base.css" type="text/css">

   <style type="text/css">
    html,body{font-family:"arial rounded mt bold","lucida grande",arial,sans-serif;background:#3c3;}
    #doc{background:#f8f8f8;border:1em solid #f8f8f8;-moz-border-radius:10px;}
    h1{font-size:200%;margin:10px 0;}
    h1 span{color:#060;}
    h2 span{font-size:80%;display:block;color:#999;}
    .submit input{-moz-border-radius:5px;color:#fff;margin:0;background:#060;border:2px solid #060;font-size:150%;}
    .submit input:hover{background:#393;border:2px solid #393;cursor:pointer;}
    textarea{display:block;width:97%;height:5em;background:#fff;-moz-border-radius:5px;border:2px solid #060;padding:5px;margin:1em 0;font-size:150%;}

    li label,div.inline label{position:relative;left:0;display:inline;}
    div.submit{text-align:right;}
    form input{margin-right:1em;}
    form ul,form li{list-style:none;margin:0;}
    form ul{margin:1em 0;}
    #accounts {padding:.3em 0}
    #accounts span{padding:.2em;color:#fff;background:#999;}
    #accounts span.failure{background:#c00;}
    #accounts span.success{background:#0c0;}
    #accounts span.skipped{background:#1A35A1;}
    #accounts span.sent{margin-left: 0px}
    table tr td{padding: 3px;margin: 0;border: 0}
    #ft p {margin:3em 0 1em 0;color:#999;}
    #ft p a{color:#000;}
   </style>
</head>
<body>
<div id="doc" class="yui-t7">

   <div id="hd" role="banner"><h1><h1>Multi<span>Tweet</span></h1></h1></div>

   <div id="bd" role="main">

     <p id="intro">MultiTweet is a simple interface to send Twitter updates from several accounts at the same time. Simply check the accounts you want to send the message from, enter your update and hit "send twitter update".</p>

     <form action="index.php" method="post" accept-charset="utf-8">

     <div class="yui-gd">

          <div class="yui-u first">

                 <h2>Accounts <span>check the ones you want to use</span></h2>

                 <table id="accounts">

                                   <?php                                     
                                        $count = 0;

                                        foreach(array_keys($accounts) as $a) {

                                               echo'<tr><td><input type="checkbox" value="'.$a.'" name="account[]" id="acc'.$count.'"></td><td><label for="acc'.$count.'">'.$a.'</label></td>';

                                               if(isset($_POST['account'])) {

                                                        if(isset($results[$a])) {

                                                           echo'<td><span class="sent">sent</span></td>';
                                                           
                                                           if($results[$a] === true) {

                                                                   echo'<td><span class="success">success</span></td>'; 

                                                           } else {

                                                                   echo'<td><span class="failure">failure</span></td>'; 
                                                           }

                                                        }  else {

                                                                   echo'<td colspan="2"><span class="skipped">not requested</span></td>';
                                                        }

                                               }//endif

                                               echo'</tr>'; 

                                               $count++;

                                        }//endforeach  
                                   ?>
                 </table>

                 <div class="inline"><label for="retweet">Retweet: </label>
                 <select name="retweet" id="retweet">
                         <option value="none" selected="selected">none</option>
                         <option value="random">random</option>
                   <?php

                         foreach(array_keys($accounts) as $a){

                                 echo '<option value="'.$a.'">'.$a.'</option>';
                         }
                   ?>
                 </select>
                 </div>

          </div>

          <div class="yui-u">

                  <div><h2>Your twitter message</h2>

                           <?php if(isset($_POST['account'])) { ?>

                                 <p>Your update has been sent. Check the status messages next to the accounts.</p>

                           <?php } ?>

                            <textarea name="tweet" id="tweet"></textarea>

                            <div class="submit"><input type="submit" value="send twitter update"></div>

                  </div> 

          </div>

     </div>

    </form>

  </div>

 <div id="ft" role="contentinfo"><p>@<a href="http://twitter.com/thinkphp">thinkphp</a> using <a href="http://developer.yahoo.com/yui">YUI</a> and <a href="http://developer.yahoo.com/yql">YQL</a></p></div>
</div>
</body>
</html>


