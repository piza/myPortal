define('modules/searchView',['backbone','template'], function(Backbone,temp){
    var IframeView = Backbone.View.extend({
        isShow:false,
        events:{
            'click .full_modal_close':"closeContainer"
        },
        windowHeight:500,
        initialize:function(){
            this.windowHeight=$(window).height();
        },
        render:function(){
            this.$el.append(temp.search.searchModal());
            this.isShow=true;
            var closeLeft=$("#googleIframe").offset().left - 18;
            $(".middle-float").css("left",closeLeft+"px");
            $("#googleIframe").css("height",this.windowHeight);
            $("#baiduIframe").css("height",this.windowHeight);
        },
        show:function(param){
            if(!this.isShow){
                this.render();
            }
            if(param.baiduUrl){
                $("#baiduIframe").attr("src",param.baiduUrl);
            }
            if(param.googleUrl){
                $("#googleIframe").attr("src",param.googleUrl);
            }
        },
        closeContainer:function(){
            this.$(".full_modal").remove();
            this.isShow=false;
        }
    });
    var searchResult=new IframeView({"el":$("body")});


    var SearchView = Backbone.View.extend({
        //template: _.template(template("#search-view")),
        events:{
            'click #searchBtn':"search",
            'click #baiduSearchBtn':"baiduSearch",
            'keydown #keywordInpt':"keywordKeyDown",
            'keyup #keywordInpt':"keywordChanged"
        },
        timeoutHandler:0,
        initialize:function(){

        },
        render:function(){
            this.$el.html(temp.search.searchView());
            this.$("#keywordInpt").focus();
        },
        search:function(){
            this.baiduSearch();
            this.googleSearch();
        },
        googleSearch:function(){
            var word=this.$("#keywordInpt").val();
            if(word.length<1){
                return;
            }
//                var searchUrl="https://www.google.com/search?q="+word;
            var searchUrl="http://www.google.com/custom?q="+word+"&btnG=Search";

//                window.open(searchUrl,"_blank");
            searchResult.show({googleUrl:searchUrl});

        },
        baiduSearch:function(){
            var word=this.$("#keywordInpt").val();
            if(word.length<1){
                return;
            }
            var searchUrl="http://www.baidu.com/s?word="+word;
//                window.open(searchUrl,"_blank");
            searchResult.show({baiduUrl:searchUrl});

        },
        keywordKeyDown:function(evt){
            if(evt.keyCode == 13){
                this.search();
            }
        },
        keywordChanged:function(){
            var word=this.$("#keywordInpt").val();
//                console.log(word+"  --- "+ (new Date()).getMilliseconds());
            if(word.length == 0){
                this.triggerKeywordChanged();
            }
            if(this.timeoutHandler!=0){
                clearTimeout(this.timeoutHandler);
            }
            this.timeoutHandler=setTimeout(this.triggerKeywordChanged,600);
        },
        triggerKeywordChanged:function(){
            var word=this.$("#keywordInpt").val();
            Backbone.Events.trigger("keyword-changed",word);
            this.timeoutHandler=0;
        }
    });

    return SearchView;
});