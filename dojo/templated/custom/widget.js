define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./widget/templates/template.html","dojo/dom-style", "dojo/_base/fx", "dojo/_base/lang"],

    function(declare,WidgetBase,TemplatedMixin, template, domStyle, fx, lang){

            return declare([WidgetBase,TemplatedMixin],{

                //some default values for our author
        
                   //these, tipically, map to whatever you're handling into the constructor
                   name: "No Name",

                   //using dojo.moduleUrl, we can get a path to our widget's space and 
                   //we want to have a default avatar, just in case
                   avatar: require.toUrl("custom.widget", "images/defaultAvatar.png"),
                    
                   bio: "",

                   //Our template - important!
                   templateString: template,

                   //A class to be applied to the root node in your template
                   baseClass: "widget",

                   //A reference to our background animation
                   mouseAnim: null,

                   //colors for our background animation
                   baseBackgroundColor: "#fff",  
                   mouseBackgroundColor: "#ccc",


                   //postCreate method is called once our widget's DOM is ready, but before it's been inserted into the page!
                   //this is far and away the best point to put in any special work
                   postCreate: function() {

                       //get a DOM node reference for the root of our widget
                       var domNode = this.domNode

                       //run any parent postCreate processes - can be done at any point
                       this.inherited(arguments)  

                       //set up our DOM node's background color to white
                       //smoothes out the mouseenter/mouseleave event animation
                       domStyle.set(domNode,"backgroundColor",this.baseBackgroundColor);
 
                       //set up our mouseenter/mouseleave events using dijit._Widget's connect
                       //means that our callback will execute with 'this' set to our widget
                       this.connect(domNode,"onmouseenter", function(e) { 
                            this._changeBackground(this.mouseBackgroundColor);
                       });

                       this.connect(domNode,"onmouseleave", function(e) { 
                            this._changeBackground(this.baseBackgroundColor);
                       });
                   },

                    //this method is automatically invoked anytime anyone
                    //calls mywidget.set('avatar',someValue)
                   _setAvatarAtrr: function(av) {

                       //we only want to set it if it's a non-empty string
                       if(av!="") {
 
                           //save it on our widget instance - note that we're using _set, 
                           //to support anyone using our
                           //widget's watch functionality, to wath values change
                           this._set("avatar",av);

                           //using our avatarNode attack point, set its src value
                           this.avatarNode.src = av; 
                       }
                   },

                   _changeBackground: function(toCol) {

                        //if we have an animation, then stop it
                        if(this.mouseAnim) {this.mouseAnim.stop();}

                        //set up the new animation
                        this.mouseAnim = new fx.animateProperty({
                           node: this.domNode,
                           properties: {
                                 backgroundColor: toCol
                           },
                           onEnd: lang.hitch(this,function(){
                                  //clean up our mouseAnim property
                                  this.mouseAnim = null   
                           })
                        }).play();
                   }
            }); 
});