var tweets = function() {

    var x = document.getElementById('mytweet');

        if(!x) {return;}

        if(x) {

           var twitterUserId = x.className.replace('user-','');
 
           var script = document.createElement('script');

               script.setAttribute('type','text/javascript');

           var src = 'http://pipes.yahoo.com/pipes/pipe.run?' + '_id=c74a0ea3e841eca657c4949e6123bd7c&_render=json' +'&id=' + twitterUserId + '&_callback=tweets.tweet';

               loadScript(src,function(){
 
                       if(window.console) {

                                       console.log("Loaded JSON into SCRIPT NODE for tweets with Pipes");
                       };//endif
               });
        }

        function tweet(json) {

               if(json && json.value && json.value.items) {

                        if(typeof json.value.items.length !== 'undefined') {

                                var ul = document.createElement('ul')

                                var all = json.value.items.length; 

                                var end = all > 5 ? 5 : all;

                                for(var i=0;i<end;i++) {

                                       var now = json.value.items[i];

                                       var li = document.createElement('li');

                                       var a = document.createElement('a');

                                           a.href = now.link;

                                           a.appendChild(document.createTextNode(now.title));

                                           li.appendChild(a);

                                           ul.appendChild(li); 
                                } 

                            x.appendChild(ul);

                        }  

               } 

        };



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


       return {

                tweet: tweet 

              }

}();//do EXEC