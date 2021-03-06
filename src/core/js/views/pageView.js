/*
* PageView
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Daryl Hedley
*/

define(function(require) {
    
    var AdaptView = require('coreViews/adaptView');
    var ArticleView = require('coreViews/articleView');
    var Adapt = require('coreJS/adapt');

    var PageView = AdaptView.extend({
        
        className: function() {
            return "page " 
            + this.model.get('_id') 
            + " " + this.model.get('_classes')
            + " " + this.setVisibility();                  
        },
        
        preRender: function() {
            this.$el.css('opacity', 0);
            this.listenTo(this.model, 'change:_isReady', this.isReady);
        },
        
        isReady: function() {
            _.defer(_.bind(function() {
                $('.loading').hide();
                Adapt.trigger('pageView:ready', this);
                this.$el.animate({'opacity': 1}, 'fast');
                $(window).scroll();
            }, this));
        }
        
    }, {
        childContainer: '.article-container',
        childView: ArticleView,
        template: 'page'
    });
    
    return PageView;
    
});