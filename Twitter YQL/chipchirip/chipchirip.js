/*
 *
 * Name:         Twitterbadge
 * file:         chipchirip.js
 * Description:  display tweets on the fly using Twitter API
 *
 */
var tweets = function() {

           //private members
           var x = document.getElementById('mytweet'); 

           var twitterUserId = x.className.replace('user-','');

           function init() {

                      if(x) {

                         var endpoint = "http://query.yahooapis.com/v1/public/yql?q=";   
 
                         var yql = "select status.user.name,status.user.screen_name,status.user.profile_image_url,status.text,status.created_at,status.id "+
                                   "from xml where url = 'http://twitter.com/statuses/user_timeline/"+twitterUserId+".xml?count=200' "+
                                   "and status.text like '%js%' limit 7";

                         var src = endpoint + encodeURIComponent(yql)+"&format=json&diagnostics=true&callback=tweets.tweet";

                             loadScript(src,function(){
 
                                   if(window.console) {

                                       console.log(yql);

                                   };//endif
                             });

                      }//end-if

           };//end function
                    

          function tweet(json){
                 if(window.console) {console.log(json);}
                 if(typeof json.query.results.statuses !== "undefined"){

                     var ul = document.createElement("ul");

                     var all = json.query.results.statuses.length;

                     var end = all > 5 ? 5 : all;

                     for(var i=0;i < end;i++){

                          //now = now.replace(/(http:[^\s]+)/g,'<a href="$1">$1</a>');

                        var now = json.query.results.statuses[i].status.text.replace('|','');

                        var span = document.createElement('span');

                            span.innerHTML = tc.clean(now); 
                            
                        var li = document.createElement('li');

                            li.appendChild(span);

                        var a = document.createElement('a');

                            a.href = "http://twitter.com/"+ twitterUserId +"/status/"+json.query.results.statuses[i].status.id;

                        var div = document.createElement('div');

                            div.className = 'time'; 

                        var time = json.query.results.statuses[i].status.created_at;

                            time = time.split(" ");

                        var week = time[0];

                        var mounth = time[1];

                        var day = time[2];      
 
                            div.appendChild(document.createTextNode(week + ' ' + mounth + ' ' + day));  

                            a.appendChild(div);  

                            li.appendChild(a);

                            ul.appendChild(li);

                        }//end-for

                    x.appendChild(ul);

                    } else {

                           x.style.display = 'none';
                    }

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

  return {init:init,tweet: tweet}

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


//initialize...
tweets.init();

//line 179