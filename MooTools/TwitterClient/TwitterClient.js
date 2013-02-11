var TwitterClient = new Class({

    Implements: [Options, Events],

    options: {
       count: 3,
       link: true,/* 
       onRequest: $empty,
       onComplete: $empty 
       */ 
    },

    initialize: function(username, options) {
       this.setOptions(options);
       this.username = username;
    },

    retrieve: function() {

        new Request.JSONP({
                  url: 'http://api.twitter.com/1/statuses/user_timeline/' + this.username + '.json',
                  data: {
                      count: this.options.count
                  },

                  onRequest: this.fireEvent('request'),

                  onComplete: function(data) {
                      //if linkify is true then
                      if(this.options.link) {
                         data.each(function(tweet){
                              tweet.text = this.linkify(tweet.text); 
                         }, this);  
                      }
                      //we have the data, then fireEvent
                      this.fireEvent('complete',[data, data[0].user]);
                  }.bind(this)
        }).send();

      return this; 
    },

    linkify: function(str) {
         return str.replace(/(https?:\/\/[\w\-:;?&=+.%#\/]+)/gi, '<a href="$1">$1</a>')
                   .replace(/(^|\W)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>')
                   .replace(/(^|\W)#(\w+)/g, '$1#<a href="http://search.twitter.com/search?q=%23$2">$2</a>')                              
    }
});