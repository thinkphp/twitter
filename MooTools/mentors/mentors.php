<?php require_once('config.php'); ?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
   <title></title>
   <style type="text/css">
    h1,h2, body { font-family:'gill sans','dejavu sans',verdana,sans-serif; }

    h1 {
      margin-top: -20px;
      font-weight:bold;
      font-size:70px;
      letter-spacing:2px;
      color:#999;
      margin-bottom:0;
      position:relative;
    }
     
	#tweets	{ margin: 20px 0 0 0; }
	.tweet	{ padding:5px 10px; height:auto; clear:both; margin:5px 0; background:#eee; }
	.tweet img	{ margin-right:10px; }
	.tweet strong	{ color:navy; }
	.tweet span	{ font-size:11px; color:#666; }
	.clear	{ clear:both; }
   </style>
   <script src="http://www.google.com/jsapi?key=ABQIAAAA1XbMiDxx_BTCY2_FkPh06RRaGTYH6UMl8mADNa0YKuWNNa8VNxQEerTAUcfkyrr6OwBovxn7TDAH5Q"></script>
   <script type="text/javascript">google.load("mootools", "1.4");</script>
   <script type="text/javascript" src="Request.JSONP.js"></script>
   <script type="text/javascript" src="Request.YQL.js"></script>
<?php
echo <<<FORM
   <script type="text/javascript">
         var mentors = $out;
   </script>

FORM;
?>

   <script type="text/javascript">


     window.addEvent('domready',function(){

         var url = "select * from twitter.user.status where screen_name=#{username} and count=@count",
             linkify = function(str) {
             return str.replace(/(https?:\/\/[\w\-:;?&=+.%#\/]+)/gi, '<a href="$1">$1</a>')
                       .replace(/(^|\W)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>')
                       .replace(/(^|\W)#(\w+)/g, '$1#<a href="http://search.twitter.com/search?q=%23$2">$2</a>')                              
         }


         Object.each(mentors,function(realname,username){

             new Request.YQL(url, {

                 onSuccess: function(data){

                     var tweets = data.query.results.status;

                     new Element('h2',{text: realname}).inject(username)  

                     tweets.each(function(object){
                         
                        new Element('div',{
                            html: '<img src="' + object.user.profile_image_url + '" align="left" alt="photo_profile" /> <strong>'+ object.user.name +'</strong><br/>'+
                            linkify(object.text) + '<br/><span>' + object.created_at + ' via ' + object.source.replace('\\','') + '</span>',
                            'class': 'tweet clear'
                        }).inject(username);

                     })
             }},

             {username: username, count: '7'}

             ).send()

         })

     })

   </script>
</head>
<body>
<h1>My Mentors</h1>
<div id="codepo8"></div>
<div id="ded"></div>
<div id="davidwalshblog"></div>
<div id="cpojer"></div>
<div id="mootools"></div>
<div id="salexsorin"></div>
<div id="ft"><p>written by @<a href="http://twitter.com/thinkphp">thinkphp</a></p></div>
</body>
</html>