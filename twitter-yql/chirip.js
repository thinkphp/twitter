/*
 *
 * Author:      Adrian Statescu
 * Name:        Twitter Widget
 * Description: Display tweets with LIKE %moo% into a customisable widget
 * Name:        chirip.js 
 *
 */

//show me love to the Module Pattern
var chirip = function() {

/* configurations */

      var config = {

                    badgeID: 'twitter',

                    toHeader: 'twtr-hd',

                    toFooter: 'twtr-ft',

                    toInsert: 'twtr-timeline', 

                    userprofile: 'twtr-widget-profile',

                    displayHeader: 'true',

                    headermatch: /header-(\w+)/,

                    displayFooter: 'true',

                    footermatch: /footer-(\w+)/,

                    amount: 5,

                    amountmatch: /amount-(\d+)/,

                    skin: 'black',

                    skinmatch: /skin-(\w+)/,

                    username: 'thinkphp',

                    usernamematch: /user-(\w+)/,

                    styles: {

                          'black': 'chirip-black.css',

                          'blue': 'chirip-blue.css'
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
   
      var username;
 
      var displayHeader;

      var displayFooter;

/* private methods */

      //method init
      function init() {

          badge = document.getElementById(config.badgeID);

          var c = badge.className;

          var amount = config.amountmatch.exec(c);

              amount = amount ? amount[1] : config.amount;

          var skin = config.skinmatch.exec(c);

              skin = skin ? skin[1] : config.skin;

              username = config.usernamematch.exec(c);

              username = username ? username[1] : config.username;

              displayHeader = config.headermatch.exec(c);

              displayHeader = displayHeader ? displayHeader[1] : config.displayHeader;

              displayFooter = config.footermatch.exec(c);

              displayFooter = displayFooter ? displayFooter[1] : config.displayFooter;


                      if(badge) {

                         //select status.user.name,status.user.screen_name,status.user.profile_image_url,status.text,status.created_at,status.id from xml where url = 'http://twitter.com/statuses/user_timeline/codepo8.xml?count=200' and status.text like '%moo%'
                         var src = "http://query.yahooapis.com/v1/public/yql?q=select%20status.user.name%2Cstatus.user.screen_name%2Cstatus.user.profile_image_url%2Cstatus.text%2Cstatus.created_at%2Cstatus.id%20from%20xml%20where%20url%20%3D%20'http%3A%2F%2Ftwitter.com%2Fstatuses%2Fuser_timeline%2Fthinkphp.xml%3Fcount%3D200'%20and%20status.text%20like%20'%25moo%25'%20limit%207&format=json&diagnostics=true&callback=chirip.show";

                             loadScript(src,function(){
 
                                   if(window.console) {

                                       console.log("Loaded JSON into SCRIPT NODE for tweets YQL: select status.user.name,status.user.screen_name,status.user.profile_image_url,status.text,status.created_at,status.id from xml where url = 'http://twitter.com/statuses/user_timeline/codepo8.xml?count=200' and status.text like '%ง%'");

                                   };//endif
                             });

                      }//end-if


          //load CSS INTO SCRIPT NODE LiNK
          if(config.styles) {

                loadLink(config.styles[skin]);  
          }



      };//end function



     //callback for user
     function show(json) {

         if(typeof json.query.results.statuses !== 'undefined') {

              var results = json.query.results.statuses;
         };

         if(badge.className.indexOf(config.userprofile) != -1 && displayHeader == 'true') {

             showHeader(results[0]);

         };//endif


         var ul = document.createElement("ul");

         var all = json.query.results.statuses.length;

         var end = all > 5 ? 5 : all;

           if(typeof json.query.results.statuses != 'undefined') { 

                     for(var i=0;i < end;i++){

                        var text = json.query.results.statuses[i].status.text.replace('ยง','');

                        var span = document.createElement('span');

                            span.innerHTML = tc.clean(text); 
                            
                        var li = document.createElement('li');

                            li.appendChild(span);

                        var a = document.createElement('a');

                            a.href = "http://twitter.com/"+ username +"/status/"+json.query.results.statuses[i].status.id;

                            a.className = 'time';

                        var span = document.createElement('span');
                            
                        var time = json.query.results.statuses[i].status.created_at;

                            time = pretty_date(time); 

                            span.appendChild(document.createTextNode(time));

                            a.appendChild(span);  

                        var p = document.createElement('p');

                            p.appendChild(a);

                            li.appendChild(p);

                            ul.appendChild(li);

                        }//end-for

                       document.getElementById(config.toInsert).appendChild(ul);

                    } else {

                       document.getElementById(config.toInsert).innerHTML = 'No Founds data.';
           
                    }



                 
         if(displayFooter == 'true') {

            showFooter();

         };//endif



     };//end function



     //method that display header for user
     function showHeader(set) { 

              var set = set.status;

              var data = ['screen_name','name','profile_image_url'];

              var header = document.getElementById(config.toHeader);

              var output = "<a href='http://twitter.com/"+ username +"'>" + 

                           "<img class='twtr-profile-img' src='"+ set.user[data[2]] +"' /></a>"+

                           "<h3 class='user'>" + set.user[data[1]] + "</h3>" +

                           "<h4 class='user'><a href='http://twitter.com/" + username +"'>" + set.user[data[0]] + "</a></h4>";                           

                 header.innerHTML = output;
                
     };//end function



    //method that display zone footer in widget
    function showFooter() {

       var footer = document.getElementById(config.toFooter);

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
          
  return {init: init,show: show} 

}();//do EXEC

var tc = function() {

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

