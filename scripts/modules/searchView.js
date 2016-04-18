define(['backbone','template'], function(Backbone,temp){

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
            //this.baiduSearch();
            //this.googleSearch();
        },
        googleSearch:function(){
            var word=this.$("#keywordInpt").val();
            if(word.length<1){
                return;
            }
//                var searchUrl="https://www.google.com/search?q="+word;
            var searchUrl="http://www.google.com/custom?q="+word+"&btnG=Search";

                window.open(searchUrl,"_blank");

        },
        baiduSearch:function(){
            var word=this.$("#keywordInpt").val();
            if(word.length<1){
                return;
            }
            var searchUrl="http://www.baidu.com/s?word="+word;
            window.open(searchUrl,"_blank");
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