define(['backbone','framework','layer'], function(Backbone,Framework,layer){

    var Background=Framework.BaseModel.extend({
        urlRoot:"http://localhost:8080/background"
    });
    var bg=new Background();

    var TriggerModule = Backbone.View.extend({
        events:{
            'keydown #englishInpt':"englishToChinese"
        },
        initialize:function(){
            bg.on("change",this.changeBackground,this);
            bg.fetch();
            Backbone.Events.on("keyword-changed",this.keywordChanged,this);
            Backbone.Events.on("background-open",this.showBackground,this);

        },
        render:function(){
        },
        changeBackground:function(){
//                console.log(bg.toJSON());
            //background-image: url(http://localhost:8080/images/background.jpg);
            this.img="<img class='background-img' src='"+bg.get("imgUrl")+"'/>";
            this.$el.append(this.img);
        },
        keywordChanged:function(keyword){
            if(keyword == " "){
                var hintData={
                    "type":"background",
                    "title":"背景图信息",
                    "callBackEvent":"background-open",
                    "callBackKey":""
                };
                Backbone.Events.trigger("add-search-result",hintData);

            }
        },
        showBackground:function(){
            $("").css("z-index",10001);
            var that=this;
            layer.open({
                type: 1,
                shade: false,
                skin: 'layui-layer-rim',
                area: ['620px', '240px'],
                title: bg.get("alt"), //不显示标题
                content: bg.get("title")+"<br>"+bg.get("desc"), //捕获的元素
                cancel: function(index){
                    layer.close(index);
                    $(that.img).css("z-index",-10);
                }
            });
        }
    });

    return TriggerModule;
});