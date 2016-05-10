define(['backbone','template','layer','dataCenter'], function(Backbone,temp,layer,dc){

    var WelcomeView=dc.BaseView.extend({
        initialize:function(){
        },
        render:function(){
            this.$el.html(temp.welcome.welcome());
        },
        open:function(baseEl,option){
            this.setElement(baseEl);
            dc.debug("sub view welcome open");
            this.render();
        }
    });

    return WelcomeView;
});