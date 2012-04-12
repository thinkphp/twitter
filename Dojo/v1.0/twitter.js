           dojo.require('dijit.form.Button');
           dojo.require('dijit.Dialog');
           dojo.require('dijit.form.ValidationTextBox');
           dojo.require('dojo.io.script');

           dojo.addOnLoad(function(){
                 
                var loadBtn = dijit.byId("loadBtn"),
                    userDialog = dijit.byId("userDialog"),
                    okBtn = dijit.byId("okBtn"),
                    userText = dijit.byId("userTxt");

                    dojo.connect(loadBtn,"onClick", function(){
                         userDialog.show();
                    }); 

                    dojo.connect(okBtn,"onClick", function(){
                             userDialog.hide();  
                             var out = dojo.byId("output");
                                 out.innerHTML = "Loading...";

                             dojo.io.script.get({
                                  url: 'http://twitter.com/statuses/user_timeline.json',
                                  content: {
                                     screen_name: userText.getValue()
                                  },
                                  callbackParamName: 'callback',
                                  timeout: 8000,
                                  load: function(resp) {
                                        out.innerHTML = '';

                                        dojo.forEach(resp, function(tweet){

                                              //regexp text formatting based on @derek's example
                                              tweet.text = tweet.text.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1" target="_blank">$1<\/a>').replace(/@([a-zA-Z0-9_]+)/gi,'<a href="http://twitter.com/$1" target="_blank">@$1<\/a>').replace(/#([a-zA-Z0-9_]+)/gi,'<a href="http://search.twitter.com/search?q=%23$1" target="_blank">#$1<\/a>');

                                              var content = '<div><a href="http://twitter.com/'+ tweet.user.name +'">'+ tweet.user.name +'</a></div>' + tweet.text + '<div class="created_at">'+ tweet.created_at +'</div>';
                                              var n = dojo.create('div',{innerHTML: content, class: 'tweetBox'});
                                              
                                              //add user's image if they have one
                                              if(tweet.user && tweet.user.profile_image_url) {

                                                 var img = dojo.create('img',{align: 'left', src: tweet.user.profile_image_url});
                                                 dojo.place(img,n,'first');  
                                              }
 

                                              dojo.place(n,out,'last'); 
                                        });
                                  },
                                  error: function(e) {
                                         output.innerHTML = 'Error retrieving tweets: ' + e;
                                  },
                                  preventCache: true,
                                  handleAs: 'json'
                             });

                    });
  
                    //show the main form now that parsing and 
                    //event handling is setup
                    dojo.byId("main").style.display = '';
           }); 
