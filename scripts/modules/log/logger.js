define(['backbone','template','bootstrap','dataCenter'], function(Backbone,temp,bt,dc){

    var LogRouter=dc.BaseRouter.extend({
        initialize:function(){
        },
        routes:{
            "notify/log-open":"openLogPanel"
        },
        openLogPanel:function(){
            Backbone.Events.trigger("log-open-panel");
        }
    });

    //var router=new LogRouter();
    var Logger = Backbone.View.extend({

        events:{
            'click #closeLogPanel':"closeLogPanel",
            'click #cleaLog':"cleaLog"
        },
        initialize:function(){
            Backbone.Events.on("log-add",this.addLog,this);
            Backbone.Events.on("log-open-panel",this.showLogPanel,this);
            this.router= new LogRouter();
        },
        render:function(){
           this.$el.html(temp.log.logger());
            //默认关闭日志页面
            this.closeLogPanel();
        },
        addLog:function(logStr,type){
            var time=new Date();
            type=type || "Info";
            this.$("#logList").prepend(temp.log.logRecord({"type":type,"logStr":logStr,"time":time.toTimeString()}));
        },
        cleaLog:function(){
            this.$("#logList").empty();
        },
        closeLogPanel:function(){
            this.$("#logConsole").hide();
        },
        showLogPanel:function(){
            this.$("#logConsole").show();
        }
    });

    return Logger;
});