define(['backbone','template','dataCenter','modules/moduleManager'], function(Backbone,temp,dc,ModuleManager){

    var sideBarList=[
        {"navUrl":"#modules/welcome","iconClass":"fa-dashboard","navName":"控制台"},
        {"navUrl":"#modules/authority","iconClass":"fa-dashboard","navName":"模块管理"},
        {"navUrl":"#modules/charts","iconClass":"fa-bar-chart-o","navName":"图表",
         "subList":[
             {"navUrl":"#chart1","navName":"图表1"}
         ]
        }

    ];//navList in jst

    var topMenuList=[
        {"menuUrl":"#user-profile","iconClass":"fa-user","menuName":"个人信息"},
        {"menuUrl":"#user-setting","iconClass":"fa-gear","menuName":"设置","needDivider":true},
        {"menuUrl":"#user-logout","iconClass":"fa-sign-out","menuName":"退出","needDivider":true},
        {"menuUrl":"#notify/log-open","iconClass":"fa-info","menuName":"显示日志"}
    ];


    var Navigation = Backbone.View.extend({

        initialize:function(){
            this.render();
            this.setWindEvent();
            this.openWelcome();
        },
        render:function(){
            this.$el.html(temp.nav.topNav({navList:topMenuList}));
            this.$el.append(temp.nav.sideNav({navList:sideBarList}));
            dc.log("render navigation");
            require(['bootstrap','metisMenu'], function(bt,MetisMenu) {
                $('#side-menu').metisMenu();
            });
            this.initModuleManager();
        },
        setWindEvent:function(){
            var that=this;
            $(window).bind("load resize", function() {
                //dc.log("window resize");
                topOffset = 50;
                width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
                if (width < 768) {
                    that.$('div.navbar-collapse').addClass('collapse');
                    topOffset = 100; // 2-row-menu
                } else {
                    that.$('div.navbar-collapse').removeClass('collapse');
                }

                height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
                height = height - topOffset;
                if (height < 1) height = 1;
                if (height > topOffset) {
                    that.$("#page-wrapper").css("min-height", (height) + "px");
                }
            });

            //var url = window.location;
            //var element = $('ul.nav a').filter(function() {
            //    return this.href == url || url.href.indexOf(this.href) == 0;
            //}).addClass('active').parent().parent().addClass('in').parent();
            //if (element.is('li')) {
            //    element.addClass('active');
            //}
        },
        openWelcome:function(){
            dc.trigger("open-module","welcome");
        },
        initModuleManager:function(){
            var allModules=new ModuleManager();
            allModules.registerModule({'name':'welcome','jsFile':'modules/welcome/welcome'});
            allModules.registerModule({'name':'moduleManage','jsFile':'modules/moduleManage/moduleManage'});
            allModules.registerModule({'name':'authority','jsFile':'modules/authority/authority'});

        }
    });

    return Navigation;
});