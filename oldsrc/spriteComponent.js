function spriteComponent(sprite) {
    'use strict';

    var name = 'SpriteComponent';

    return Object.freeze({
        getName: function() {
            return name;
        },
        sprite
    });

}
