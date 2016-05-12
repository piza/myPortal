define(['backbone','template','layer','layerExt','dataCenter'], function(Backbone,temp,layer,layerExt,dc){

    var Picture=dc.BaseModel.extend({
        url:"http://api.01cun.com/dailyPicture",
        getImgSrc:function(){
        var imgUrl=this.get("originUrl");
        if(this.get("savedUrl")){
            imgUrl= "//qiniu.01cun.com/"+this.get("savedUrl");
        }
        return imgUrl;
    },
    getImgThumbnailSrc:function(width){
        var imgUrl=this.get("originUrl");
        if(this.get("savedUrl")){
            imgUrl= "//qiniu.01cun.com/"+this.get("savedUrl")+"?imageView2/1/w/"+width+"/h/"+width;
        }
        return imgUrl;
    }
    });

    var QiniuModel=dc.BaseModel.extend({
        url:'http://api.01cun.com/qiniu/dailyPicture',
        idAttribute:"translate"
    });

    var PictureList=dc.PaginatedCollection.extend({
        model:Picture
    });

    var pList=new PictureList({baseUrl:"http://api.01cun.com/dailyPicture/list"});
    var thumbnailData=new Backbone.Collection();
    var ThumbnailView=Backbone.View.extend({
        className:"col-md-4",
        events:{
            "click .savePic":"savePic",
            "click img":"showImg"
        },
        initialize:function(){

        },
        render:function(){
            this.$el.html(temp.dailyPicture.pictureItem({item:this.model.toJSON(),width:this.$el.width()}));
        },
        savePic:function(e){
            var id=$(e.target).attr('data-id');
            var that=this;
            var qiniuModel=new QiniuModel();
            qiniuModel.save({"id":id}).then(function (res) {
                that.$(".savePic").removeClass("savePic").removeClass("btn-primary").html("已收藏");
                layer.msg("收藏成功,后台正在处理!");
            });
        },
        showImg:function(){
            var start=thumbnailData.findWhere({id:this.model.get("id")});
            layer.photos({
                photos:{
                    "title":this.model.get("title"),
                    "id":1,
                    "start":thumbnailData.indexOf(start),
                    "data":thumbnailData.toJSON()
                },
                closeBtn:true,
                shift:1
            });
        }
    });
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
            dc.debug("sub view daily picture open");
            this.render();
        },
        renderList:function(){
            this.$("#pictureList").empty();
            var that=this;
            pList.each(function(picture){
                var thumbnail=new ThumbnailView({model:picture});
                that.$("#pictureList").append(thumbnail.el);
                thumbnail.render();
                //把图片都放到列表里,方便图册查看
                thumbnailData.add(new Backbone.Model({
                    "id":picture.get("id"),
                    "alt":picture.get("alt"),
                    "pid":picture.get("id"),
                    "src":picture.getImgSrc(),
                    "thumb":picture.getImgThumbnailSrc(thumbnail.$el.width())
                }));
            });

        }
    });

    return DailyPicture;
});