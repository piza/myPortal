define(['backbone','template'], function(Backbone,temp){
    var TranslateModule = Backbone.View.extend({

        //template: _.template($("#translate-view").html()),
        events:{
            'keydown #englishInpt':"englishToChinese"
        },
        initialize:function(){
            $("body").append(this.$el);
            Backbone.Events.on("keyword-changed",this.keywordChanged,this);
        },
        render:function(){
            this.$el.html(temp.translateView());
        },
        englishToChinese:function(evt){
            var srcText=this.$("#englishInpt").val();
            if(srcText.length<1){
                return;
            }
            var that=this;
            if(evt.keyCode == 13){
                $.ajax({
                    type: "get",
                    async: false,
                    url: "http://fanyi.youdao.com/openapi.do?keyfrom=pizahouse&key=1517817920&type=data&doctype=jsonp&callback=handleResult&version=1.1&q="+srcText,
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback:"handleResult",
                    success: function(json){
                        if(json.errorCode == 0){
                            that.$("#chineseShow").val(json.translation.toString());
                        }
                    },
                    error: function(){
                        alert('fail');
                    }
                });
            }
        },
        keywordChanged:function(keyword) {
            if (keyword.trim().length <= 0) {
                return;
            }
            if (keyword.length < 20) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "http://fanyi.youdao.com/openapi.do?keyfrom=pizahouse&key=1517817920&type=data&doctype=jsonp&callback=handleResult&version=1.1&q="+keyword,
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback:"handleResult",
                    success: function(json){
                        if(json.errorCode == 0){
//                                that.$("#chineseShow").val(json.translation.toString());
                            var hintData = {
                                "type": "translate",
                                "title": "翻译:"+json.translation.toString()
                            };
                            Backbone.Events.trigger("add-search-result", hintData);
                        }
                    },
                    error: function(){
                        alert('fail');
                    }
                });

            }
        }
    });

    return TranslateModule;
});