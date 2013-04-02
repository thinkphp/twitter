Request.Twitter = new Class({

                Extends: Request.JSONP,

                options: {
                    url: 'http://api.twitter.com/1/statuses/user_timeline/{username}.json',
                    data: {
                       count: 5
                    },
                    linkify: true
                },

                initialize: function(username, options) {
                   this.parent(options);  
                   this.options.url = this.options.url.substitute({username: username}); 
                },

                success: function(data, index) {
                         data = Array.flatten(data);
                         if(this.options.linkify) { 
                              data.each(function(tweets){
                                   tweets.text = this.linkify(tweets.text);
                              },this);
                         }
                         if(data[0]) this.options.data.since_id = data[0].id;
                         this.parent([data], index);
                },

                linkify: function(str){
                    return str.replace(/(https?:\/\/[\w\-:;?&=+.%#\/]+)/gi, '<a href="$1">$1</a>')
                              .replace(/(^|\W)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>')
                              .replace(/(^|\W)#(\w+)/g, '$1#<a href="http://search.twitter.com/search?q=%23$2">$2</a>')
                              
                }
});
