// Backbone.CrossDomainModel 0.1.0
//
// (c) 2013 Victor Quinn
// Licensed under the MIT license.

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["underscore","backbone"], function(_, Backbone) {
            // Use global variables if the locals are undefined.
            return factory(_ || root._, Backbone || root.Backbone);
        });
    } else if (typeof module === "object" && typeof exports === "object") {
        module.exports = factory(require("underscore"), require("backbone"));
    } else {
        // RequireJS isn't being used. Assume underscore and backbone are loaded in <script> tags
        factory(_, Backbone);
    }
}(this, function(_, Backbone) {

    Backbone.vanillaSync = Backbone.sync;

    // Override 'Backbone.sync' to default to CrossDomainModel sync.
    // the original 'Backbone.sync' is still available in 'Backbone.vanillaSync'
    Backbone.sync = function(method, model, options) {
        options || (options = {});
        if (!options.crossDomain) {
            options.crossDomain = true;
        }
        if (!options.xhrFields) {
            options.xhrFields = {withCredentials:true};
        }else{
            options.xhrFields.withCredentials=true;
        }
        return Backbone.vanillaSync(method, model, options);

    };

    return Backbone;
}));