var twitterbadge = function() {

     /* configurations */

     var config = {

        countDefault: 4,

        badgeID: 'twitterbadge',

        userID: 'twitterbadgeuser',

        tweetsID: 'twitterbadgetweets',

        userinfo: 'userinfo',

        stylesmatch: /skin-(\w+)/,  

        amountmatch: /amount-(\d+)/,

        styles: {

           'grey': 'twitterbadgegrey.css',                    

           'blue': 'twitterbadgeblue.css',

           'orange': 'twitterbadgeorange.css',

           'black': 'twitterbadgeblack.css'
        }

     };

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



                      /* private methods */

     var badge;

     function init() {

        badge = document.getElementById(config.badgeID);

        head = document.getElementsByTagName('head')[0];

          if(badge) {

              link = badge.getElementsByTagName('a')[0];

                   if(link) {

                       classdata = badge.className;

                   var amount = config.amountmatch.exec(classdata);

                       amount = amount ? amount[1] : config.countDefault;

                     var skin = config.stylesmatch.exec(classdata);

                     var name = link.href.split('/');

                     //i.e. http://api.twitter.com/1/statuses/user_timeline.json?screen_name=ppk || http://api.twitter.com/1/statuses/user_timeline.xml?screen_name=ppk
                     var url = 'http://api.twitter.com/1/statuses/user_timeline/' + name[name.length-1] + '.json?callback=twitterbadge.show&count=' + amount;    

                        if(skin && skin[1]) {

                            addSkin(skin[1]);

                        }//end if

                        loadScript(url,function(){

                             if(window.console) {

                                console.log('Loaded JSON into SCRIPT NODE for twitterbadge JSON: '+url);

                             };//endif    
                        }); 

                   }//end if

          }//end if       

     };//end function

   
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



    function show(result) {

       if(badge.className.indexOf(config.userinfo) != -1 ) {

             addUser(result[0]);
       }

       var tweets = document.createElement('ul');

           tweets.id = config.tweetsID;


          for(var i=0;i<result.length;i++) {

                var username = result[i].user.screen_name;

                var li = document.createElement('li');

                var span = document.createElement('span');
 
                    span.innerHTML = tweet.clean(result[i].text) + ' ';

                   li.appendChild(span);

                var link = document.createElement('a');

                    link.setAttribute('href','http://twitter.com/' + username + '/statuses/'+result[i].id);

                    link.appendChild(document.createTextNode(pretty_date(result[i].created_at)));

                    li.appendChild(link);

                    tweets.appendChild(li);     

          }//end for

         badge.appendChild(tweets);
   };

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
            }

      return hour;
   }    

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


   function addUser(set) {

        var user = document.createElement('p');
            
            user.id = config.userID;

        var img = document.createElement('img');

            img.src = set.user.profile_image_url;

            img.alt = set.user.name;

            user.appendChild(img);
 
        var ul = document.createElement('ul');

        var data = ['screen_name','name','location'];

            for(var i = 0; data[i];i++) {

                 if(set.user[data[i]]) {

                      var li = document.createElement('li');
                          
                          li.appendChild(document.createTextNode(set.user[data[i]]));
        
                          ul.appendChild(li); 
                 };
            };

         user.appendChild(ul);
 
         badge.appendChild(user); 

   };


   function addSkin(skin) {

       var style = document.createElement('link');

           style.setAttribute('rel','stylesheet');

           style.setAttribute('type','text/css');

           style.setAttribute('href',config.styles[skin]);

           document.getElementsByTagName('head')[0].insertBefore(style,head.firstChild);

   };  


                        /* public methods */           

     return {

         show: show,

         init: init 
     };

}();



          var tweet = function() {

                    function Link(text) {

                            return text.replace(/(^|\s+)(https*\:\/\/\S+[^\.\s+])/g,function(x,y,z){

                                   return ((y != '') ? ' ': '') + '<a style="color:#00B7FF;" href="'+ z +'">'+ ( (z.length > 24) ? z.substr(0,15) + '...' : z ) + '</a>';   
                            }); 
                    } 

                    function At(text) {

                             return text.replace(/(^|\s+)\@([a-zA-Z0-9_-]{1,15})/g,function(x,y,z){

                                    return ((y != '') ? ' ': '') + '@<a style="color:#00B7FF;" href="http://twitter.com/'+ z +'">'+ z +'</a>';
                             });
                    }

                    function Hash(text) {

                             return text.replace(/(^|\s+)\#([a-zA-Z0-9_-]+)/g,function(x,y,z){

                                    return ((y != '') ? ' ': '') + '#<a style="color:#00B7FF;" href="http://search.twitter.com/search?q=%23'+z+'">'+ z +'</a>';
                             });
                    }  

                    function clean(text) {

                            return this.Hash(this.At(this.Link(text))); 
                    }

             return {Link: Link,At: At, Hash: Hash,clean: clean}

          }(); 



twitterbadge.init();