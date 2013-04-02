/*
 *
 * Author:      Adrian Statescu
 * Name:        Twitter Widget
 * Description: Display tweets into a customisable widget
 * Name:        twitterwidget.js 
 *
 */

//show me love to the Module Pattern
var twitterwidget = function() {

/* configurations */

      var config = {

                    badgeID: 'twitter',

                    outputTextClass: 'inner-timeline',

                    userprofile: 'twtr-widget-profile',

                    displayHeader: 'true',

                    headermatch: /header-(\w+)/,

                    displayFooter: 'true',

                    footermatch: /footer-(\w+)/,

                    title: 'What\'s going on in', 

                    caption: 'Adrian\'s word',

                    amount: 5,

                    amountmatch: /amount-(\d+)/,

                    skin: 'black',

                    skinmatch: /skin-(\w+)/,

                    username: 'thinkphp',

                    usernamematch: /user-(\w+)/,

                    type: 'user',

                    typematch: /type-(\w+)/,

                    search: 'php',

                    styles: {

                          'black': 'skin-black.css',

                          'blue': 'skin-blue.css'
                    } 

                   };


/* private data */

      var months = {'Jan': 01,

                   'Feb': 02,

                   'Mar': 03,

                   'Apr': 04,

                   'May': 05,

                   'Jun': 06,

                   'Jul': 07,

                   'Aug': 08,

                   'Sep': 09,

                   'Oct' : 10,

                   'Nov': 11,

                   'Dec': 12 
                 };


      var time_formats = [
               [60, 'seconds just now', 1], // 60
               [120, 'about 1 minute ago', '1 minute from now'], // 60*2
               [3600, 'minutes', 60], // 60*60, 60
               [7200, 'about 1 hour ago', '1 hour from now'], // 60*60*2
               [86400, 'hours', 3600], // 60*60*24, 60*60
               [172800, 'yesterday', 'tomorrow'], // 60*60*24*2
               [604800, 'days', 86400], // 60*60*24*7, 60*60*24
               [1209600, 'last week', 'next week'], // 60*60*24*7*4*2
               [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
               [4838400, 'last month', 'next month'], // 60*60*24*7*4*2
               [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
               [58060800, 'last year', 'next year'], // 60*60*24*7*4*12*2
               [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
               [5806080000, 'last century', 'next century'], // 60*60*24*7*4*12*100*2
               [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
      ];

 
      var badge;
   
      var mouseoverbool = 0;

      var pointer = 0;

      var title = [];

      var date = [];

      var opacitysetting = 0.2;

      var mozopacityisdefined;

      var fadetimer;   

      var username;
 
      var type;

      var displayHeader;

      var displayFooter;

      var titleH;

      var captionH; 

      var search; 
  
/* private methods */

      //method init
      function init(o) {

          badge = document.getElementById(config.badgeID);

          var c = badge.className;

          var amount = config.amountmatch.exec(c);

              amount = amount ? amount[1] : config.amount;

          var skin = config.skinmatch.exec(c);

              skin = skin ? skin[1] : config.skin;

              type = config.typematch.exec(c);

              type = type ? type[1] : config.type;

              username = config.usernamematch.exec(c);

              username = username ? username[1] : config.username;

              displayHeader = config.headermatch.exec(c);

              displayHeader = displayHeader ? displayHeader[1] : config.displayHeader;

              displayFooter = config.footermatch.exec(c);

              displayFooter = displayFooter ? displayFooter[1] : config.displayFooter;

              titleH = typeof o.title != 'undefined' ? o.title : config.title; 

              captionH = typeof o.caption != 'undefined' ? o.caption : config.caption;

              search = typeof o.search != 'undefined' ? o.search : config.search;

          //API REST
          if(type === 'friends') {

              var url = 'http://twitter.com/statuses/friends_timeline/'+ username +'.json?callback=twitterwidget.show2&count=' + amount;

          } else if(type === 'user'){

              var url = 'http://api.twitter.com/1/statuses/user_timeline/'+ username +'.json?callback=twitterwidget.show&count=' + amount;

          }  else if(type === 'search'){ 

              var url = 'http://search.twitter.com/search.json?q='+ search +'&callback=twitterwidget.show3&count=' + amount;
          } 


          //load CSS INTO SCRIPT NODE LiNK
          if(config.styles) {

                loadLink(config.styles[skin]);  
          }


          //Load JSON into SCRIPT NODE with callback
          loadScript(url,function(){});


      };//end function

     //callback for search
     function showSearch(json) {

         var results = json.results;  

         if(badge.className.indexOf(config.userprofile) != -1 && displayHeader === 'true') {

            showHeaderWord();

         };

         if(window.getComputedStyle) {

              mozopacityisdefined = (window.getComputedStyle(document.getElementById(config.badgeID),"").getPropertyValue("-moz-opacity") == 1) ? 0 : 1;
         } 


         //loop through earch data
         for(var i=0;i<results.length;i++) {

             title[i] = '<img src="'+ results[i].profile_image_url +'" alt="avatar"/><a href="http://twitter.com/'+ results[i].from_user +'" class="screen_name">' + results[i].from_user + '</a> ' + tweet.clean(results[i].text);

             var d = results[i].created_at;

                 d = d.split(" ");

                 var a = d[0].replace(/,/,''), b = d[2], c = d[1], e = d[4], f = d[5], dd = a + ' '+ b + ' ' + c + ' ' + e + ' '+ f + '0000' + ' ' + d[3];

                 d = pretty_date(dd);

             var url = 'http://twitter.com/' + results[i].from_user +'/statuses/'+results[i].id;

             var replyhref = 'http://twitter.com/?status=@'+ results[i].from_user + ' &in_reply_to_status_id=' + results[i].id + '&in_reply_to=' + results[i].from_user;

             date[i] = '<a href="'+url+'">'+ d +'</a> <a class="reply" href="'+replyhref+'">reply</a>';

         }//end for


         if(displayFooter == 'true') {

             showFooter();

         };//end if

       rotateMessage()

     };//end function


     //callback for user
     function showUser(json) {

         if(badge.className.indexOf(config.userprofile) != -1 && displayHeader == 'true') {

             showHeader(json[0]);

         };//endif

         if(window.getComputedStyle) {

              mozopacityisdefined = (window.getComputedStyle(document.getElementById(config.badgeID),"").getPropertyValue("-moz-opacity") == 1) ? 0 : 1;
         } 


         //loop through earch data
         for(var i=0;i<json.length;i++) {

             title[i] = tweet.clean(json[i].text);

             var d = pretty_date(json[i].created_at);

             var url = 'http://twitter.com/' + username + '/statuses/'+json[i].id;

             var replyhref = 'http://twitter.com/?status=@'+ username + ' &in_reply_to_status_id=' + json[i].id + '&in_reply_to=' + username;

             date[i] = '<a href="'+url+'">'+ d +'</a> <a class="reply" href="'+replyhref+'">reply</a>';

         }//end for


         if(displayFooter == 'true') {

            showFooter();

         };//endif

       rotateMessage();

     };//end function


     //callback for friends
     function showFriends(json) {

         if(badge.className.indexOf(config.userprofile) != -1 && displayHeader === 'true') {

            showHeaderWord();

         };

         if(window.getComputedStyle) {

              mozopacityisdefined = (window.getComputedStyle(document.getElementById(config.badgeID),"").getPropertyValue("-moz-opacity") == 1) ? 0 : 1;
         } 


         //loop through earch data
         for(var i=0;i<json.length;i++) {

             title[i] = '<img src="'+ json[i].user.profile_image_url +'" alt="avatar"/><a href="http://twitter.com/'+ json[i].user.screen_name +'" class="screen_name">' + json[i].user.screen_name + '</a> ' + tweet.clean(json[i].text);

             var d = pretty_date(json[i].created_at);

             var url = 'http://twitter.com/' + json[i].user.screen_name + '/statuses/'+json[i].id;

             var replyhref = 'http://twitter.com/?status=@' + json[i].user.screen_name + ' &in_reply_to_status_id=' + json[i].id + '&in_reply_to=' + json[i].user.screen_name;

             date[i] = '<a href="' + url + '">' + d + '</a> <a class="reply" href="' + replyhref + '">reply</a>';

         }//end for

         if(displayFooter == 'true') {

             showFooter();

         };//end if

         rotateMessage()

     };//end function


     function rotateMessage() {

                          var tickerDiv = document.getElementById("twtr-timeline");

                          var tickertext = '<div class="' + config.outputTextClass + '">' + title[pointer] + '</div><div><p class="timezone">' + date[pointer] + '</p></div>';

                          fadeTransition("reset");

                          tickerDiv.innerHTML = tickertext;

                          fadetimer = setInterval(function(){ fadeTransition('up',fadetimer) },100);

                          pointer = (pointer < title.length - 1) ? pointer + 1 : 0;

                          setTimeout(function(){rotateMessage();},5000);    
 

     };//end function



     function fadeTransition(fadetype,timerID) {
 
          var tickerDiv = document.getElementById("twtr-timeline");

          if(fadetype == 'reset') opacitysetting = 0.2; 

          if(tickerDiv.filters && tickerDiv.filters[0]) {

                 if(typeof tickerDiv.filters[0].opacity == "number") tickerDiv.filters[0].opacity = opacitysetting*100;                                                                                                    

                                                           else
                                                                     tickerDiv.style.filter = "alpha(opacity="+opacitysetting*100+")";  


          } else if(typeof tickerDiv.style.MozOpacity != "undefined" && mozopacityisdefined) {
     
                  tickerDiv.style.MozOpacity = opacitysetting;             
            }

          if(fadetype == 'up') opacitysetting += 0.2;

          if(fadetype == 'up' && opacitysetting >=1) clearInterval(timerID);  

     };//end function


     //method that display header for user
     function showHeader(set) {

              var data = ['screen_name','name','profile_image_url'];

              var header = document.getElementById('twtr-hd');

              var output = "<a href='http://twitter.com/"+ username +"'>" + 

                           "<img class='twtr-profile-img' src='"+ set.user[data[2]] +"' /></a>"+

                           "<h3 class='user'>" + set.user[data[1]] + "</h3>" +

                           "<h4 class='user'><a href='http://twitter.com/" + username +"'>" + set.user[data[0]] + "</a></h4>";

                 header.innerHTML = output;
                
     };//end function


     //method that display header for word-friends
     function showHeaderWord() {

              var header = document.getElementById('twtr-hd');

              var output = "<h3>" + titleH + "</h3>" +

                           "<h4>" + captionH + "</a></h4>";

                 header.innerHTML = output;                

     };//end function


    //method that display zone footer in widget
    function showFooter() {

       var footer = document.getElementById('twtr-ft');

       var output = '<div><a href="http://twitter.com">' +

                    '<img src="http://widgets.twimg.com/j/1/twitter_logo_s.png" /></a>'+

                    '<span><a class="twtr-join-conv" href="http://thinkphp.ro">'+

                    'Written by Adrian</a></span></div>';

           footer.innerHTML = output;
 
    };//end function


     //method that load a LINK
     function loadLink(href) {

       var style = document.createElement('link');

           style.setAttribute('rel','stylesheet');

           style.setAttribute('type','text/css');

           style.setAttribute('href',href);

           document.getElementsByTagName('head')[0].insertBefore(style,document.getElementsByTagName('head')[0].firstChild);

      };//end function

      //method that load a SCRIPT
      function loadScript(src,callback) {

             var script = document.createElement('script');

                 script.setAttribute('type','text/javascript'); 

                 //if IE
                 if(script.readyState) {

                        script.onreadystatechange = function() {

                                  if(script.readyState == 'loaded' || script.readyState == 'complete') {

                                               script.onreadystatechange = null;

                                               callback();   
                                  }   
                        };

                 //others
                 } else {

                        script.onload = function() {

                               callback();
                        };
                 }


                 script.setAttribute('src',src);

                 document.getElementsByTagName('head')[0].appendChild(script);

     };//end function


    function solveHour(h) {

         var hour;
 
            switch(h) {

                case 22:

                     hour = 01;

                     break;

                case 23:

                     hour = 02;

                     break;

                case 24:

                     hour = 03;

                     break;

                default:

                    hour = eval(parseInt(h)+3); 

            };//end switch

      return hour;

   };//end function

   function pretty_date(date_str){

         var date_str = date_str.split(" ");

             var xxx = date_str[date_str.length-3];                

             var xx = xxx.split(":");

              var hour = solveHour(parseFloat(xx[0]));

              var minutes = xx[1];

              var secondes = xx[2];
           
              var date_str = date_str[date_str.length-1] + '-' + months[date_str[1]] + '-' + date_str[2] + ' ' + hour + ':' + minutes + ':' + secondes;

              var time = ('' + date_str).replace(/-/g,"/").replace(/[TZ]/g," ");

              var seconds = (new Date - new Date(time)) / 1000;

              var token = 'ago', list_choice = 1; 
  
                  if (seconds < 0) {

                        seconds = Math.abs(seconds); 

                        token = 'from now';

                        list_choice = 2;

                  }//end-if
 
              var i = 0, format;

                  while(format = time_formats[i++]) 

                        if(seconds < format[0]) { 

                               if (typeof format[2] == 'string')

                                          return format[list_choice];

                                    else

                                          return 'about' + ' ' + Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
                              }

              return time;

     };//end function pretty-date



/* public data */
          
  return {init: init,show: showUser,show2: showFriends,show3: showSearch} 

}();//do EXEC

var tweet = function() {

                    function Link(text) {

                            return text.replace(/(^|\s+)(https*\:\/\/\S+[^\.\s+])/g,function(x,y,z){

                                   return ((y != '') ? ' ': '') + '<a class="link" href="'+ z +'">'+ ( (z.length > 24) ? z.substr(0,15) + '...' : z ) + '</a>';   
                            }); 
                    } 

                    function At(text) {

                             return text.replace(/(^|\s+)\@([a-zA-Z0-9_-]{1,15})/g,function(x,y,z){

                                    return ((y != '') ? ' ': '') + '@<a class="link" href="http://twitter.com/'+ z +'">'+ z +'</a>';
                             });
                    }

                    function Hash(text) {

                             return text.replace(/(^|\s+)\#([a-zA-Z0-9_-]+)/g,function(x,y,z){

                                    return ((y != '') ? ' ': '') + '#<a class="link" href="http://search.twitter.com/search?q=%23'+z+'">'+ z +'</a>';
                             });
                    }  

                    function clean(text) {

                            return this.Hash(this.At(this.Link(text))); 
                    }

             return {Link: Link,At: At, Hash: Hash,clean: clean}

}();//do EXEC

//lines: 615