define(['backbone','template','modules/nav/navigation'], function(Backbone,temp,Navigation){

    var BaseWrapper = Backbone.View.extend({

        initialize:function(){
            this.render();
            Backbone.Events.on("add-modal",this.addModal,this);
        },
        render:function(){
            this.$el.append(temp.baseWrapper());
            window.baseEl=this.$("#page-wrapper");
            var nav=new Navigation({el:this.$("#navBar")});
        },
        addModal:function(option){
            this.$el.append(temp.modalWrapper({"option":option}));
            this.$('#'+option.id).modal("show");
        }
    });

    return BaseWrapper;
});