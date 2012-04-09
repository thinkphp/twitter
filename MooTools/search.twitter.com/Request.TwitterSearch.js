Request.TwitterSearch = new Class({

                Extends: Request.JSONP,

                options: {
                    url: 'http://search.twitter.com/search.json?q={term}',
                    data: {
                       rpp: 5
                    },
                    linkify: true
                },

                initialize: function(term,options) {
                   this.parent(options);  
                   this.options.url = this.options.url.substitute({term: term});
                   this.search = term;  
                },

                success: function(data,script) {
                         data = data[0].results;
                         if(this.options.linkify) { 
                              data.each(function(tweets){
                                   tweets.text = this.linkify(tweets.text);
                              },this);
                         }
                         this.parent([data],script);
                },

                linkify: function(str){
                    return str.replace(/(https?:\/\/[\w\-:;?&=+.%#\/]+)/gi, '<a href="$1">$1</a>')
                              .replace(/(^|\W)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>')
                              .replace(/(^|\W)#(\w+)/g, '$1#<a href="http://search.twitter.com/search?q=%23$2">$2</a>')
                              
                }
});
