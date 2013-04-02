/*
 *
 * Easy Retweet Button
 *
 */

 (function(){

      window.RetweetJS = {

              //Your Bit.ly Username
              bitly_user: 'thinkphp',

              //Your Bit.ly API Key
              //Found here: http://bit.ly/account
              bitly_key: "R_0cf8415f0c3f9fcfd867ce7613e43fc7",

              // The text to replace the links with
              link_text: (/windows/i.test( navigator.userAgent) ? "&#9658;" : "&#9851;") +"&nbsp;Retweet",

              // What # to show (Use "clicks" for # of clicks or "none" for nothing)
              count_type: "clicks",

              // Tweet Prefix text
              // "RT @thinkphp " would result in: "RT @thinkphp Link Title http://bit.ly/asdf"
              prefix: "",

             //style information
             styling: "a.retweet { font: 12px Helvetica,Arial; color: #000; text-decoration: none; border: 0px; }"+

                      "a.retweet span { color: #FFF; background: #94CC3D; margin-left: 2px; border: 1px solid #43A52A; -moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; padding: 3px; } "+

                      "a.vert { display: block; text-align: center; font-size: 16px; float: left; margin: 4px; } "+
 
                      "a.retweet strong.vert{ display: block; margin-bottom: 4px; background: #F5F5F5; border: 1px solid #EEE; -moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; padding: 3px;} " +

                      "a.retweet span.vert { display: block; font-size: 12px; margin-left: 0px; } "+

                      "a.retweet:hover span{background: #fff;color: #292}"    
            };

//////////////// No Need to Configure Below Here ////////////////

var loadCount = 1;

    //Asynchronously load the Bit.ly JavaScript API
    //if it hasn't been loaded already
    if(typeof BitlyClient === 'undefined') {

              var head = document.getElementsByTagName('head')[0] || document.documentElement;

              var script = document.createElement('script') 

                  script.src = "http://bit.ly/javascript-api.js?version=latest&login=" +

                               RetweetJS.bitly_user + "&apiKey=" + RetweetJS.bitly_key;

                  script.charSet = "utf-8";

                  head.appendChild( script );

	var check = setInterval(function(){

		if ( typeof BitlyCB !== "undefined" ) {

			clearInterval( check );

			head.removeChild( script );

			loaded();
		}
	}, 10);

	loadCount = 0;
    }


      
    if(document.addEventListener) {

           document.addEventListener("DOMContentLoaded", loaded, false);
 
    } else if(window.attachEvent()) {

           window.attachEvent('onload',loaded);                
    }


    function loaded() {

	// Need to wait for doc ready and js ready
	if ( ++loadCount < 2 ) {

		return;

	}

              BitlyCB.shortenResponse = function(data) {

                           for(var url in data.results) { 

                               var hash = data.results[url].userHash;
                        
                               hashURL[hash] = url; 

                               var elems = urlElem[ url ];  
                          
                               for(var i=0;i<elems.length;i++) {

                                    elems[i].href += hash; 
                               }
 
                               if( RetweetJS.count_type === "clicks" ) {

                                    BitlyClient.stats(hash, 'BitlyCB.statsResponse');
                               }


                            }//endfor
  
              };//end function


             BitlyCB.statsResponse = function(data) {
 
                     var clicks = data.results.clicks, hash = data.results.userHash;

                     var url = hashURL[ hash ], elems = urlElem[ url ];

                         if(clicks > 0) {

                                   for(var i=0; i<elems.length; i++) {

                                           var strong = document.createElement("strong");

                                               strong.appendChild(document.createTextNode(clicks + " " ));

                                               elems[i].insertBefore(strong,elems[i].firstChild);

                                               if(/(^|\s)vert(\s|$)/.test(elems[i].className)) {

                                                     elems[i].firstChild.className = elems[i].lastChild.className = "vert";
 
                                               }//endif
                                   }//endfor 
                         }//endif 

                 hashURL[ hash ] = urlElem[ url ] = null;
             };



           var elems = [], urlElem = {}, hashURL = {};

               var tmp = document.getElementsByTagName("a");

                   for(var i=0;i<tmp.length;i++) {

                           if(/(^|\s)retweet(\s|$)/.test(tmp[i].className)) {

                                 elems.push(tmp[i]);

                           }//endif

                   }//endfor


                   if(elems.length && RetweetJS.styling) {

                            var style = document.createElement('style');

                                style.type = 'text/css';

                                try {

                                      style.appendChild(document.createTextNode(RetweetJS.styling));  

                                    } catch(e) {

                                       if(style.styleSheet) {

                                                style.styleSheet.cssText = RetweetJS.styling;
                                       } 

                                    }                               

                                document.body.appendChild(style);
                   } 


                   for(var i=0;i<elems.length;i++) {

                           var elem = elems[i];

                           if(/(^|\s)self(\s|$)/.test(elem.className)) {

                                  elem.href = window.location;

                                  elem.title = document.title; 
                           }

                           var origText = elem.title || elem.textContent || elem.innerText;

                           var href = elem.href;

                               elem.innerHTML = "<span>" + RetweetJS.link_text +"</span>"; 

                               elem.title = "";

                               elem.href = "http://twitter.com/home?status=" + 

                                            encodeURIComponent(RetweetJS.prefix + origText + " http://bit.ly/");

                               if(urlElem[href]) {

                                    urlElem[href].push(elem);

                               } else {

                                    urlElem[href] = [ elem ];  

                                    BitlyClient.shorten(href, 'BitlyCB.shortenResponse');
                               }

                   }//endfor

    }//end function loaded
 
 

})();//do EXEC