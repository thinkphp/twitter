var NinjaName = new Class({
          
         /* Implements */
         Implements: [Options, Events], 

         /* options zone */
         options: {
            /*
            onRequest: $empty,
            onComplete: $empty  
            */
         },   
         /* constructor of class 
          * @public   
          */
         initialize: function(name, options) {
                     if(!name) {return false;}
                     this.setOptions(options); 
                     this.name = name;
         },
         /* The method that converts your name to your ninja name.
          * @public
          */
         toNinja: function(name) {
                     var what = name || this.name,
                         url = "http://query.yahooapis.com/v1/public/yql?q=use%20'http%3A%2F%2Fthinkphp.ro%2Fapps%2FYQL%2Fninjaname%2Fninjanames.table.xml'%20as%20ninja%3B%20select%20*%20from%20ninja%20where%20name%3D%22"+ what +"%22";
                     new Request.JSONP({
                        url: url,
                        data: {
                          diagnostics :true,
                          format: 'json'
                        },
                        onRequest: this.fireEvent('request',url),
                        onComplete: function(o) {
                          this.fireEvent('complete',[o.query.results.translated.ninjaname, o.query.results.translated.name]);
                        }.bind(this)
                    }).send(); 
         }
});
Element.implement({
        toNinjaName: function(str) {
                  var target = this,
                      what = str || this.get('text').toString();
                      new NinjaName(what, {
                          onComplete: function(ninja, name) {
                               target.set('text',ninja);
                          },
                          onRequest: function(url) {
                               if(window.console) {console.log(url);}
                          }
                      }).toNinja();
           return this;
        }
});
