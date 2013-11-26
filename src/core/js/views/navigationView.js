/*
* NavigationView
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Daryl Hedley
*/

define(["backbone", "handlebars", "coreJS/adapt"], function(Backbone, Handlebars, Adapt) {
    
    var NavigationView = Backbone.View.extend({
        
        className: "navigation",
        
        initialize: function() {
            this.template = "navigation";
            Adapt.trigger('navigationView:preRender', this);
            this.render();
            Adapt.trigger('navigationView:postRender', this);
        },
        
        events: {
            'click a':'triggerEvent'
        },
        
        render: function() {
            var template = Handlebars.templates[this.template]
            $(this.el).html(template).appendTo('#wrapper');
            return this;
        },
        
        triggerEvent: function(event) {
            event.preventDefault();
            var currentEvent = $(event.currentTarget).attr('data-event');
            Adapt.trigger('navigation:' + currentEvent);
        }
        
    });
    
    return new NavigationView;
    
});