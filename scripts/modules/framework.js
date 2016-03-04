define('FrameworkModule',['backbone','template/template'], function(Backbone,template){
    var Framework={};
    Framework.BaseModel=Backbone.Model.extend({
        parse:function(res){
            if(res.success){
                //Backbone.Events.trigger("Hint-Message",{"type":"提示","message":"操作成功"});
                return res.success;
            }else if(res.failed && res.failed.errorType){
                Backbone.Events.trigger("Request-Failed",res.failed);
                //Backbone.Events.trigger("Hint-Message",{"type":"警告","message":"操作失败"});
                this.trigger("exception",res.failed,this);
            }else{
                return res;
            }
        }
    });

    Framework.BaseCollection=Backbone.Collection.extend({
        parse:function(res){
            if(res.success){
                //Backbone.Events.trigger("Hint-Message",{"type":"提示","message":"操作成功"});
                return res.success;
            }else if(res.failed && res.failed.errorType){
                Backbone.Events.trigger("Request-Failed",res.failed);
                this.trigger('failed',res.failed);
                // Backbone.Events.trigger("Hint-Message",{"type":"警告","message":"操作失败"});
            }else{
                this.trigger("exception","Unexpected data!",this);
            }
        }
    });

    Framework.PaginatedCollection = Backbone.Collection.extend({
        initialize: function(param) {
            this.baseUrl=param.baseUrl;
            this.perPage=param.perPage;
            // _.bindAll(this, 'parse', 'url', 'pageInfo', 'nextPage', 'previousPage');
            typeof(options) != 'undefined' || (options = {});
            this.page = 1;
            typeof(this.perPage) != 'undefined' || (this.perPage = 10);

            this.bind("exception",function(errMes){
                Backbone.Events.trigger("Hint-Message",{"type":"警告","message":"服务器返回数据库格式错误!"});
            }) ;
        },
        fetch: function(options) {
            typeof(options) != 'undefined' || (options = {});
            //Backbone.Events.trigger("Hint-Message",{"type":"提示","message":"加载中......"});
            var self = this;
            var success = options.success;
            options.success = function(resp) {
                //Backbone.Events.trigger("Hint-Message",{"type":"提示","message":"加载成功!"});
                if(success) { success(self, resp); }
            };
            return Backbone.Collection.prototype.fetch.call(this, options);
        },
        parse: function(res) {
            if(res.success){
                this.page = res.success.pagingInfo.page;
                this.perPage = res.success.pagingInfo.limit;
                this.total = res.success.pagingInfo.count;
                return res.success.models;
            }else if(res.failed && res.failed.errorType){
                Backbone.Events.trigger("Hint-Message",{"type":"警告","message":"操作失败","failed":res.failed});
                this.trigger("exception",res.failed,this);
            }else{
                this.trigger("exception","Unexpected data!",this);
            }
        },
        url:function(queryData) {
            if(queryData === undefined){

            }else{
                this.queryData=queryData;
            }
            if(this.queryData === undefined || this.queryData == null || this.queryData == {}){
                return this.baseUrl + '?' + $.param({"paging.need":1,"paging.page": this.page, "paging.limit": this.perPage});
            }else{
                return this.baseUrl + '?' + $.param({"paging.need":1,"paging.page": this.page, "paging.limit": this.perPage})+'&'+$.param(this.queryData);
            }

        },
        pageInfo: function() {
            var info = {
                total: this.total,
                page: this.page,
                perPage: this.perPage,
                pages: Math.ceil(this.total / this.perPage),
                prev: false,
                next: false
            };

            var max = Math.min(this.total, this.page * this.perPage);

            if (this.total == this.pages * this.perPage) {
                max = this.total;
            }

            info.range = [(this.page - 1) * this.perPage + 1, max];
            var startNum=Math.floor(info.page/2)-2;
            if(startNum<0){
                startNum=0;
            }
            var endNum=info.page+3;
            if(endNum>info.pages){
                endNum=info.pages;
            }
            info.pageNums=new Array(info.page);
            for(var i=0;i<(endNum-startNum);i++){
                info.pageNums[i]=startNum+i+1;
            }
            if (this.page > 1) {
                info.prev = this.page - 1;
            }

            if (this.page < info.pages) {
                info.next = this.page + 1;
            }

            return info;
        },
        nextPage: function() {
            if (!this.pageInfo().next) {
                return false;
            }
            this.page = this.page + 1;
            return this.fetch({reset:true});
        },
        previousPage: function() {
            if (!this.pageInfo().prev) {
                return false;
            }
            this.page = this.page - 1;
            return this.fetch({reset:true});
        },
        toPage:function(pageNum){
            if(pageNum<0 || pageNum>this.pageInfo().pages){
                return false;
            }
            this.page=pageNum;
            return this.fetch({reset:true});
        }

    });

    Framework.PaginatedView= Backbone.View.extend({
        template:_.template($("#framework-view").html()),
        //className:"pagination", need invoke setElement to bind event
        initialize: function() {
            _.bindAll(this, 'previous', 'next','gotoPage', 'render');
            this.collection.bind('refresh', this.render);
            this.collection.bind('reset', this.render);
        },
        events: {
            'click a.prev': 'previous',
            'click a.toPage': 'gotoPage',
            'click a.next': 'next'
        },
        render: function() {
            if(this.collection.length >0){
                $(this.el).html(this.template({"tempId":"Paging","data":this.collection.pageInfo()}));
            }else{
                $(this.el).html(this.template({"tempId":"PagingNoResult","data":null}));

            }
            return this;
        },
        previous: function(e) {
            e.preventDefault();
            this.collection.previousPage();
            return false;
        },
        next: function(e) {
            e.preventDefault();
            this.collection.nextPage();
            return false;
        },
        gotoPage:function(e){
            e.preventDefault();
            var pageNum=$(e.target || e.srcElement).attr("href");
            this.collection.toPage(pageNum);
            return false;
        }
    });

    return Framework;
});