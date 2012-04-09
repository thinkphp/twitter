<?php
    $oldtime = microtime(true);
    if(isset($_GET['q']) && $_GET['q'] != '') {
      $q = $_GET['q']; 
    } else {$q = 'mootools';}

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
   <title>Request.Twitter.Search</title>
   <link type="text/css" rel="stylesheet" href="style.css"/>
   <script src="http://www.google.com/jsapi?key=ABQIAAAA1XbMiDxx_BTCY2_FkPh06RRaGTYH6UMl8mADNa0YKuWNNa8VNxQEerTAUcfkyrr6OwBovxn7TDAH5Q"></script>
   <script type="text/javascript">google.load("mootools", "1.3");</script>
   <script type="text/javascript" src="Request.JSONP.js"></script>
   <script type="text/javascript" src="Request.TwitterSearch.js"></script>
   <script type="text/javascript">

window.addEvent('domready',function(){
 
   new Request.TwitterSearch('<?php echo$q;?>',{
           data: {
              rpp: 10
           },
           onSuccess: function(data){
              if(data.length>0) {
                 $('tweets').set('html','');
                 var template = '<li><div class="avatar"><a href="http://twitter.com/{username}"><img src="{src}"></a></div><div class="msg"><a href="http://twitter.com/{username}">{username}:</a> <span>{msg}</span></div><div class="info">{info}</div></li>';
                 var h2 = new Element('h2',{'html': 'Results for: <strong>'+this.search+'</strong>','class': 'top'});  
                 var ul = new Element('ul');
                 var tweet = '';
                 data.each(function(data){
                      tweet += template.substitute({src: data.profile_image_url,username: data.from_user,msg: data.text,info: data.created_at});
                 });
                 ul.set('html',tweet);
                 ul.inject($('tweets'));
                 h2.inject($('tweets'),'top');

              } else {
                       $('tweets').set('html','No Results for <strong>'+this.search+'</strong>');
                     }
           },
           onRequest: function(script) {
                 $('tweets').set('text','Loading...');
           } 
   }).send();

});
   </script>
</head>

<body>
<div id="headerContent">
		<div id="logo"><a href="http://search.twitter.com/"><img alt="Twitter-logo-small" src="http://search.twitter.com/images/search/twitter-logo-small.png?1274993039" /></a></div>
		<div id="search">
     	      <form action="<?php echo$_SERVER['PHP_SELF'];?>" id="searchForm" method="get">    
             <div id="searchEntry"><input type="text" name="q" value="<?php echo isset($_GET['q']) ? $_GET['q'] : 'mootools';?>"/></div>
	       <div id="searchButton"><input type="submit" value="Search" /></div>
            </form>     
</div>
</div>
<hr/>
<div id="main">
<div id="tweets"></div>
</div>
<hr/>
<div id="ft"><p>created by @<a href="http://twitter.com/thinkphp">thinkphp</a> | Time spent: <?php echo microtime(true) - $oldtime; ?> seconds</p></div>
</body>
</html>

