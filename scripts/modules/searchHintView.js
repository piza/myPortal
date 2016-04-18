define(['backbone','template'], function(Backbone,temp){

    var HintCollection=Backbone.Collection.extend({
        initialize:function(){
            Backbone.Events.on("add-search-result",this.addResult,this);
            Backbone.Events.on("keyword-changed",this.keywordChanged,this);

        },
        addResult:function(data){
            var isExist=false;
            this.each(function(model,index){
                if(model.get("type") == data.type){
                    isExist=true;
                    model.set(data);
                }
            });
            if(!isExist){
                var newModel=new Backbone.Model(data);
                this.add(newModel);
            }
        },
        keywordChanged:function(keyword){
            if(keyword.length==0){
                this.reset();
            }
        }
    });

    var resultList=new HintCollection();

    var HintView = Backbone.View.extend({
        //template: _.template($("#search-hint-view").html()),
        events:{
            'click .openHintTarget':"openHintTarget"
        },
        initialize:function(){
            resultList.on("change",this.updateList,this);
            resultList.on("add",this.updateList,this);
            resultList.on("reset",this.updateList,this);
        },
        render:function() {
            var offset=$("#keywordInpt").offset();
            this.$el.css("top",offset.top+31);
            this.$el.css("left",offset.left);
            this.$("ul.dropdown-menu").css("width",$("#keywordInpt").width()+26);

        },
        updateList:function(){
            if(resultList.length>0){
                this.$el.show();
            }else{
                this.$el.hide();
            }
            this.$("ul.dropdown-menu").html(temp.searchHintView({"dataList":resultList.toJSON()}));
        },
        openHintTarget:function(e){
            Backbone.Events.trigger($(e.target).attr("callBackEvent"),$(e.target).attr("callBackKey"))
        }
    });

    return HintView;
});