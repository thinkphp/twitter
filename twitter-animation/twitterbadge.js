var twitterbadge = function() {

      /* configurations */

      var config = {
                    countDefault: 4,
                    badgeID: 'twitterbadge',
                    outputTextClass: 'twittertext',
                    amountmatch: /amount-(\d+)/,
                    stylesmatch: /skin-(\w+)/,
                    styles: {
                             white: 'skinwhite.css',
                             black: 'skinblack.css'
                            } 
                   };
 
      var badge;
   
      var mouseoverbool = 0;

      var pointer = 0;

      var title = [];

      var date = [];

      var opacitysetting = 0.2;

      var mozopacityisdefined;

      var fadetimer;   
  
      /* private methods */

      function init() {

          badge = document.getElementById(config.badgeID);
          
          head = document.getElementsByTagName('head')[0]; 

             if(badge) {

                link = badge.getElementsByTagName('a')[0];

                   if(link) {

                       var classdata = badge.className;

                       var amount = config.amountmatch.exec(classdata);

                           amount = amount ? amount[1] : config.countDefault;

                       var skin = config.stylesmatch.exec(classdata);

                       var name = link.href.split('/');

                       var url = 'http://twitter.com/statuses/user_timeline/' + name[name.length-1] + '.json?callback=twitterbadge.show&count=' + amount;

                            if(skin && skin[1]) {

                               addSkin(skin[1]); 
                            }

                       addData(url);  
 
                   } //endif
        
             }//endif

      };//endinit


      function addData(url) {

           var script = document.createElement('script');

               script.setAttribute('type','text/javascript');

               script.setAttribute('src',url);

               document.getElementsByTagName('head')[0].appendChild(script);


      }; 


      function show(json) {

         var d;

         if(window.getComputedStyle) {

              mozopacityisdefined = (window.getComputedStyle(document.getElementById(config.badgeID),"").getPropertyValue("-moz-opacity") == 1) ? 0 : 1;
         } 

         for(var i=0;i<json.length;i++) {

             title[i] = twitter.clean(json[i].text);

             d = json[i].created_at.split(" ");

             d = d[0] + " " + d[2] + " " + d[1];

             date[i] = d;
         }
          
         rotateMessage();
      };

     function rotateMessage() {

                          var tickerDiv = document.getElementById(config.badgeID);

                          var tickertext = '<div class="'+config.outputTextClass+'">'+title[pointer]+'</div><div><i class="timeZone">via twitter on: '+date[pointer]+'</i></div>';

                          fadeTransition("reset");

                          tickerDiv.innerHTML = tickertext;

                          fadetimer = setInterval(function(){fadeTransition('up',fadetimer)},100);

                          pointer = (pointer < title.length-1) ? pointer+1 : 0;

                          setTimeout(function(){rotateMessage();},5000);    
 

     };


     function fadeTransition(fadetype,timerID) {
 

          var tickerDiv = document.getElementById(config.badgeID);

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
     }; 


      function addSkin(css) {

         var link = document.createElement('link');

             link.setAttribute('rel','stylesheet');

             link.setAttribute('type','text/css');

             link.setAttribute('href',config.styles[css]);

             document.getElementsByTagName('head')[0].appendChild(link);
      };  


      /* public methods */

      return {
              init: init,
              show: show
             };

}();


twitterbadge.init();


var twitter = function() {

return{

       'link': function(t) {

             return t.replace(/(^|\s+)(https*\:\/\/\S+[^\.\s+])/g,function(x,y,z){

                    return ((y != '') ? ' ':'') + '<a href="'+ z +'">'+ ( (z.length > 24) ? z.substr(0,15) + '...' : z ) +'</a>';  
             });
       },

       'at': function(t) {


             return t.replace(/(^|\s+)\@([a-zA-Z0-9-_]{1,15})/g,function(x,y,z){

                    return ((y != '') ? ' ':'') + '@<a href="http://twitter.com/'+ z +'">'+ z +'</a>';  
             });

       },

       'hash': function(t) {

             return t.replace(/(^|\s+)\#([a-zA-Z0-9-_]+)/g,function(x,y,z){

                    return ((y != '') ? ' ':'') + '#<a href="http://search.twitter.com/search?q=%23'+ z +'">'+ z +'</a>';  
             });

       },

       'clean': function(t) {

            return this.hash(this.at(this.link(t)));
       }



    };
         
}();