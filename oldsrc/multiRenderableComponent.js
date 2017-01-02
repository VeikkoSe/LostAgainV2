function multiRenderableComponent(renderables) {
    'use strict';

    var name = 'MultiRenderable';

    return Object.freeze({
        getName: function() {
            return name;
        }, renderables
    });

}
