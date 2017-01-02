function satelliteComponent(sprite) {
    'use strict';

    var name = 'GuiComponent';

    return Object.freeze({
        getName: function() {
            return name;
        },
        getSprite: function() {
            return sprite;
        }
    });

}
