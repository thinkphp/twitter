Request.JSONP = new Class({

        Implements: [Chain, Events, Options],

        options: {
            /*
             onRequest: function(src, scriptElement){}, 
             onComplete: function(data){}, 
             onSuccess: function(data){}, 
             onCancel: function(){}, 
             onTimeout: function(){}, 
             onError: function(data){}, 
             */
             onRequest: function(src) {
                 if(this.options.log && window.console && console.log) {
                         console.log('JSONP retrieving script with url: ' + src);
                 }
             },
             onError: function(src) {
                 if(this.options.log && window.console && console.warn) {
                         console.log('JSONP ' + src + ' will fail in Internet Explorer, which enforces a 2083 bytes length limit on URIs');
                 }                      
             }, 
             url: '',
             callbackKey: 'callback',
             injectScript: document.head,
             data: '',
             link: 'ignore',
             timeout: 0,
             log: false    
        },

        initialize: function(options) {
             this.setOptions(options);
        },

        send: function(options) {
             if(!Request.prototype.check.call(this, options)) {return this;}
             this.running = true;

             var type = typeof(options); 
             if(type == 'string' || type == 'element') options = {data: options};
             options = Object.merge(this.options, options || {}); 

             var data = options.data;

             switch(typeof(data)) {
               case 'element': data = document.id(data).toQueryString();break;
               case 'object': case 'hash': data = Object.toQueryString(data); 
             }

             var index = this.index = Request.JSONP.counter++;

             var src = options.url + 
                       (options.url.test('\\?') ? '&' : '?') + 
                       (options.callbackKey) + 
                       '=Request.JSONP.request_map.request_' + index + 
                       (data ? '&' + data : '');  

             if(src.length > 2083) {this.fireEvent('error', src);}

             var script = this.getScript(src).inject(options.injectScript);

             this.fireEvent('request', [script.get('src'), script]);

             Request.JSONP.request_map['request_'+index] = function(){
                     this.success(arguments, index);   
             }.bind(this);

             if(options.timeout) {
                (function(){
                   if(this.running) this.fireEvent('timeout', [script.get('src'), script]).fireEvent('failure').cancel();
                }).delay(options.timeout, this);
             }

           return this; 

        },

        getScript: function(src) {
             return this.script = new Element('script',{
                    type: 'text/javascript',
                    src: src  
             });
        },

        success: function(args, index) {
            if(!this.running) {return false;}
            this.clear() 
                      .fireEvent('complete', args).fireEvent('success', args)
                      .callChain();
        },

        cancel: function() {
            return this.running ? this.clear().fireEvent('cancel') : this;
        },

        isRunning: function() {
             return !!this.running;
        },

        clear: function() {
            if(this.script) {this.script.destroy();} 
            this.running = false;
          return this; 
        }
});

Request.JSONP.counter = 0;
Request.JSONP.request_map = {};

Class.refactor = function(original, refactors){

	Object.each(refactors, function(item, name){
		var origin = original.prototype[name];
		if (origin && origin.$origin) origin = origin.$origin;
		if (origin && typeof item == 'function'){
			original.implement(name, function(){
				var old = this.previous;
				this.previous = origin;
				var value = item.apply(this, arguments);
				this.previous = old;
				return value;
			});
		} else {
			original.implement(name, item);
		}
	});

	return original;

};



var JsonP = Class.refactor(Request.JSONP, {
            initialize: function() {
                  var params = Array.link(arguments, {url: String.type, options: Object.type});
                  options = (params.options || {});
                  options.url = options.url || params.url;
                  if(options.callbackKey) {options.callbackKey = options.callbackKey;}  
                  this.previous(options);  
            },
            request: function(options){
                  this.send(options || this.options); 
            } 
});

