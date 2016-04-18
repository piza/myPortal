define(['backbone','template','layer','dataCenter','modules/utils/cookieUtil'], function(Backbone,temp,layer,dc,cookieUtil){

    var LoginModel=dc.BaseModel.extend({
        url:"http://api.01cun.com/login",
        checkLogin:function(){
            console.log(this.url);
            var token=cookieUtil.read("token");
            if(token){
                var data={"currentToken":token};
                this.save(data,{success:function(result){
                    if(result.get("account")){
                        window.loginUser=result;
                        Backbone.Events.trigger("check-login-ok");
                    }else{
                        Backbone.Events.trigger("need-login");
                    }
                }});
            }else{
                Backbone.Events.trigger("need-login");
            }
        }
    });

    var loginModel=new LoginModel();

    var LoginView = Backbone.View.extend({
        className:'container',
        events:{
            'click #loginBtn':"login"
        },
        initialize:function(){
            Backbone.Events.on("need-login",this.render,this);
            Backbone.Events.on("Request-Failed",this.needLogin,this);
            Backbone.Events.on("check-login-ok",this.loginSuccess,this);
            loginModel.checkLogin();
        },
        render:function(){
            $('body').append(this.$el);
            this.$el.html(temp.login.login());

        },
        login:function(){
            var userName=this.$('[name=email]').val();
            var password=this.$('[name=password]').val();

            if(userName.length<1){
                return layer.alert("用户名不能为空!");
            }
            if(password.length<1){
                return layer.alert("密码不能为空!");
            }
            var data={
                account:userName,
                password:password
            };
            var that=this;
            loginModel=new LoginModel();
            loginModel.save(data).then(function(userInfo){
                if(userInfo.success){
                    cookieUtil.create("token",userInfo.success.currentToken,7);
                    window.loginUser=loginModel;
                    that.remove();
                    that.loginSuccess();
                }else{
                    layer.msg(userInfo.failed.errorMesg);
                }

            });

        },
        loginSuccess:function() {
            if (!window.router) {
                layer.load("登录成功......", {icon: 16});
                var userToken=window.loginUser.get("currentToken");
                //Backbone.$.ajaxSetup(
                //    {
                //        headers:
                //            {
                //                token:userToken
                //            }
                //    });
                Backbone.$.ajaxSetup({
                    beforeSend: function (xhr)
                    {
                        xhr.setRequestHeader("token",userToken);
                    }
                });
                require(['modules/baseRouter'], function (Router) {
                    layer.closeAll();
                    window.router = new Router();
                    Backbone.history.start();
                });
            }else{
               layer.msg("登录成功");
            }
        },
        logout:function(){
            var logoutModel=new dc.BaseModel();
            logoutModel.fetch({url:"authentication/logout"}).then(function(){
                cookieUtil.erase("token");
                location.href="/";
            });
        },
        needLogin:function(failedInfo){
            if(failedInfo.errorType == 3){
                //cookieUtil.erase("token");
                //location.href="/";
                alert("need login");
            }
        }
    });

    return LoginView;
});