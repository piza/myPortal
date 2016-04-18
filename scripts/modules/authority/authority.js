define(['backbone','template','layer','dataCenter','backboneCrossdomain','modules/utils/validate'], function(Backbone,temp,layer,dc,bcd,validator){

    var Authority=dc.BaseModel.extend({
        url:"http://api.01cun.com/authority"
    });

    //var AuthorityList=dc.PaginatedCollection.extend({
    //    model:Authority
    //
    //});

    var authList=new dc.PaginatedCollection({"baseUrl":"http://api.01cun.com/authority/list"});
    var AuthorityModule=dc.BaseView.extend({

        events:{
            'click #addAuthorityBtn':"addAuthority"
        },
        initialize:function(){
            authList.bind("update",this.updateList,this);
            authList.fetch();
        },
        render:function(){
            this.$el.html(temp.authority.authority());
        },
        open:function(baseEl,option){
            this.setElement(baseEl);
            dc.debug("sub view authority open");
            this.render();
        },
        updateList:function(){
            var listWrapper=this.$("#authorityList");
            listWrapper.empty();
            authList.each(function(model){
                listWrapper.append(temp.authority.item(model.toJSON()));
            });
        },
        addAuthority:function(){
            var modalOption={"id":"add-authority-modal","header":"新建模块"};
            Backbone.Events.trigger("add-modal",modalOption);
            var form=new AuthorityForm({"el":"#add-authority-modal"});
            form.render();
        }
    });

    var AuthorityForm=Backbone.View.extend({
        events:{
            'click #saveBtn':"saveAuthority"
        },
        initialize:function(){

        },
        render:function(){
            this.$(".modal-body").html(temp.authority.form());
            this.$(".modal-footer").hide();
        },
        saveAuthority:function(){
            var name=this.$("#name").val();
            var displayName=this.$("#displayName").val();
            var description=this.$("#description").val();
            if(validator.isEmpty(name)){
               return layer.msg("模块ID不能为空");
            }
            if(validator.isEmpty(displayName)){
                return layer.msg("名字不能为空");
            }
            var that=this;
            var model=new Authority();
            model.save({
                "name":name,
                "displayName":displayName,
                "description":description
            }).then(function(){
                authList.add(model);
                layer.msg("保存成功");
                that.remove();
            });

        }
    });

    return AuthorityModule;
});