define(['backbone','framework','template'], function(Backbone,Framework,temp){

    var FavoriteSiteList=Framework.BaseCollection.extend({
        url:"/favoriteSite/list"
    });
    var list=new FavoriteSiteList({"baseUrl":"http://www.01cun.com/favoriteSite/list","perPage":10});
    list.fetch().then(function(){
        console.log("favorite site is ready");
    });
    var FavoriteSiteModule = Backbone.View.extend({

        //template: _.template($("#favorite-site-view").html()),
        events:{

        },
        initialize:function(){
            $("body").append(this.$el);
            Backbone.Events.on("keyword-changed",this.keywordChanged,this);
            Backbone.Events.on("favorite-site-open",this.openFavorite,this);

        },
        render:function(){
            this.$el.html('');
        },
        keywordChanged:function(keyword){
            if(keyword.trim().length<=0){
                return;
            }
            var count=0;
            list.each(function(model,index){
                if(count>6){
                    return;
                }
                if(model.get("title").toLowerCase().indexOf(keyword) > -1){
                    var hintData={
                        "type":"favoriteSite-"+index,
                        "title":model.get("title"),
                        "callBackEvent":"favorite-site-open",
                        "callBackKey":model.id
                    };
                    Backbone.Events.trigger("add-search-result",hintData);
                    count++;
                }
            });


        }
        ,openFavorite:function(key){
            var model = list.get(key);
            window.open(model.get("siteUrl"),"_blank");
        }
    });

    return FavoriteSiteModule;
});