Request.YQL = new Class({

            Extends: Request.JSONP,

            _endpoint: 'http://query.yahooapis.com/v1/public/yql',
 
            _formats: ['json','xml'], 

            initialize: function(query, options, vars) {

                if(typeof vars == 'object') {

                    query = this._prepareParams(query,vars)
                }

                var data = options.data || {}

                    data.format = this._formats.contains(options.format) ? options.format : 'json'

                    data.q       = query

                    data.env     = 'store://datatables.org/alltableswithkeys'

                    options.data = data

                    options.url  = this._endpoint

                this.parent(options)
            },

            _prepareParams: function(query, params) { 

                  Object.each(params, function(value, key){

                         var name = "#{"+ key +"}",
 
                             value = value.trim()

                         if(!value.match(/^[0-9]+$/)) {

                             value = '"'+ value + '"'
                         }

                         if(query.contains(name)) {
                             query = query.replace(name,value) 
                         } 

                         var name = "@"+ key

                         if(query.contains(name)) {
                             query = query.replace(name,value) 
                         } 
                  });

              return query;
           }
});