define(['modules/log/logger','modules/baseWrapper'], function(Logger,BaseWrapper) {

    var AppRouter=Backbone.Router.extend({
        appState:'unstart',
        initialize: function() {
        },
        routes: {
            "":"index",
            "logout":"logout",
            "modules/*path":"openModule"
        },
        index:function(){
            if(this.appState == 'unstart'){
                this.appState='starting';
                var logger=new Logger({el: $('body')});
                logger.render();
                new BaseWrapper({el: $('body')});
            }

        },
        openModule:function(moduleName){
            if(this.appState == "unstart"){
                this.index();
            }else{
                Backbone.Events.trigger("open-module",moduleName);
            }
        }
    });

    //Application.registerModule=function(resource){
    //    //Application.mainWrapper.registerModule(resource);
    //    Application.router.route("modules/:"+resource.get("url"),"openMoudle",function(name){
    //        //Application.mainWrapper.openModule(name);
    //        Backbone.Events.trigger("SidebarModule-ChangeModule",name);
    //    });
    //};


    return AppRouter;
});
