var twitterfill = function() {

   var config,button;

       function init(o) {

             config = o;

             var m = document.getElementById(config.userField);

                 if(m) {

                     button = document.createElement('input');

                     button.type = 'button';

                     button.value = config.label;

                     button.onclick = function(e) {
 
                            if(!/^([a-zA-Z0-9])+$/.test(m.value)) {

                                  m.value = config.userplease;

                                  m.focus();

                             } else {

                                    var url = 'http://twitter.com/users/show/show.json?'+

                                              'screen_name='+m.value+'&callback=twitterfill.seed'

                                    var script = document.createElement('script');

                                        script.setAttribute('type','text/javascript');
   
                                        script.setAttribute('src',url);

                                        button.value = config.loading; 

                                        document.getElementsByTagName('head')[0].appendChild(script);
                             }

                     }


                     m.parentNode.insertBefore(button,m.nextSibling) 

                 };//end if             
       }

       function seed(o) {

              button.value = config.label;

              if(!o.error) {

                    fill(config.id,o.id);

                    fill(config.name,o.name);

                    fill(config.location,o.location);

                    fill(config.url,o.url);

                    fill_status(config.status,twitter.clean(o.status.text));

                    fill_image(config.avatar,o.profile_image_url);

                    fill_status(config.created,o.created_at);

              }  
   
       } //end function

       function fill(field,value) {
 
                var x = document.getElementById(field);

                    if(x) {x.value = value;}
       }//end function

       function fill_image(id,src) {

                var div = document.getElementById(id);
 
                var img = document.createElement('img');

                    img.setAttribute('src',src);                              

                    img.setAttribute('alt','avatar');

                /*
                   //method#1
 
                    while(div.childNodes.length > 0) {

                            div.removeChild(div.firstChild);  
                    } 

                    div.appendChild(img);

                */

                  //method#2
                  if(div.childNodes.length > 0) {
 
                       div.replaceChild(img,div.firstChild); 
                           
                   } else {

                       div.appendChild(img);
                   }

       } //end function


       function fill_status(status,text) {

               var x = document.getElementById(status);

               if(x) {

                     x.innerHTML = text;
               } 
       }

   return {init: init,seed: seed}

}();

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

