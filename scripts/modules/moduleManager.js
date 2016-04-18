define(['backbone','dataCenter'], function(Backbone,dc){

    var ModuleModel=dc.BaseModel.extend({
    });

    var ModuleManager=dc.BaseCollection.extend({
        model:ModuleModel,
        defaults:{
            name:'',
            jsFile:'',
            status:'unload'
        },
        initialize:function(){
            Backbone.Events.on("open-module",this.openModule,this);
        },
        openModule:function(moduleName){
            var model=this.findWhere({"name":moduleName});
            if(model){
                dc.debug("open module:"+moduleName);
                if(!model.get("status") || model.get("status")  == "unload"){
                    require([model.get("jsFile")],function(ModuleClass){
                        model.moduleInst=new ModuleClass();
                        model.moduleInst.open(baseEl);
                    });
                }else{
                    model.moduleInst.open(baseEl);
                }
            }else{
                dc.debug("not found module:"+moduleName);
            }
        },
        registerModule:function(attrs){
            this.add(new ModuleModel(attrs));
        }
    });

    //var allModules=new ModuleManager();
    //allModules.add(new ModuleModel({'name':'welcome','jsFile':'modules/welcome/welcome'}));
    //allModules.add(new ModuleModel({'name':'moduleManage','jsFile':'modules/moduleManage/moduleManage'}));

    return ModuleManager;
});