function radarComponent(sprite) {
    'use strict';

    var name = 'RadarComponent';

    return Object.freeze({
        getName: function() {
            return name;
        },
        sprite
    });

}
