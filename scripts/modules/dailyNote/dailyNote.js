define(['backbone','template','layer','dataCenter','backboneCrossdomain'], function(Backbone,temp,layer,dc,bcd){

    var Background=dc.BaseModel.extend({
        url:"http://api.01cun.com/background"
    });

    var bg=new Background();
    var WelcomeView=dc.BaseView.extend({

        initialize:function(){
            bg.bind("change",this.changeBackground,this);
            bg.fetch();
        },
        render:function(){
            this.$el.html(temp.welcome.welcome());
        },
        open:function(baseEl,option){
            this.setElement(baseEl);
            dc.debug("sub view welcome open");
            this.render();
        },
        changeBackground:function(){
            //this.$el.css("background-image",'url('+bg.get("imgUrl")+')');
        }
    });

    return WelcomeView;
});