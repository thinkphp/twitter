  //define some util DOM
  DOMhelp = {

        getTarget: function(e) {

                 var target = window.event ? window.event.srcElement : e ? e.target : null;

                     while(target.nodeType != 1 && target.nodeName.toLowerCase() != 'body') {

                           target = target.parentNode;
                     }

                 if(!target) {return false;}

           return target;
        },

        cancelClick: function(e) {

                if(window.event) {

                     window.event.cancelBubble = true;

                     window.event.returnValue = false;
                }

                if(e && e.preventDefault && e.stopPropagation) {

                        e.preventDefault(); 

                        e.stopPropagation();
                }
        },

        addEvent: function(elem,evType,fn,useCapture) {

                  if(elem.addEventListener) {

                          return elem.addEventListener(evType,fn,useCapture);

                  } else if(elem.attachEvent) {

                          return elem.attachEvent('on'+evType,fn);

                  } else {

                         return elem['on'+evType] = fn;
                  }

        },

        $: function(id){return document.getElementById(id);}
  };   


          //using pattern Lazy Function Definition
          if(typeof asyncRequest == 'undefined') {

                     asyncRequest = {};
          }

          asyncRequest.REQUEST = function() {

                   function handleReadyState(o,callback) { 

                       o.onreadystatechange = function() {

                           if(o.readyState == 4) {

                                 if(o.status == 200) {

                                      callback(o.responseText);

                                 }
                           }
                       }
                   }
 
                   var XHR = function() {
   
                       var http;

                       try {
 
                             http = new XMLHttpRequest();

                             XHR = function(){return new XMLHttpRequest();}

                           }catch(e) {

                                try {

                                     http = new ActiveXObject("Microsoft.XMLHTTP");

                                     XHR = function(){return new ActiveXObject("Microsoft.XMLHTTP");}
  
                                    }catch(e){} 
                           }

                      return XHR();
                   }

                   return function(method,url,callback,postData) { 

                          var http = XHR();
 
                          http.open(method,url,true);

                          handleReadyState(http,callback);
            
                          http.send(postData || null);   

                      return http;                                        
                   }
         }();
