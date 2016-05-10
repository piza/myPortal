define(['backbone','template','layer','dataCenter'], function(Backbone,temp,layer,dc){

    var Picture=dc.BaseModel.extend({
        url:"http://api.01cun.com/dailyPicture"
    });

    var PictureList=dc.PaginatedCollection.extend({
        model:Picture
    });

    var pList=new PictureList({baseUrl:"http://api.01cun.com/dailyPicture/list"});
    var DailyPicture=dc.BaseView.extend({

        initialize:function(){
           this.pagingView=new  dc.PaginatedView({collection:pList});
            pList.bind("reset",this.renderList,this);
        },
        render:function(){
            this.$el.html(temp.dailyPicture.dailyPicture());
            this.pagingView.setElement(this.$("#picturePaging"));
            this.pagingView.render();
            pList.fetch({"reset":true});
        },
        open:function(baseEl,option){
            this.setElement(baseEl);
            dc.debug("sub view welcome open");
            this.render();
        },
        renderList:function(){
            this.$("#pictureList").empty();
            var that=this;
            pList.each(function(picture){
                that.$("#pictureList").append(temp.dailyPicture.pictureItem({item:picture.toJSON()}))
            });
        }
    });

    return DailyPicture;
});