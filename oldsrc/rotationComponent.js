function rotationComponent(x, y, z) {
    'use strict';

    var name = 'RotationComponent';

    return Object.freeze({
        getName: function() {
            return name;
        },
        getX: function() {
            return x;
        },
        getY: function() {
            return y;
        },
        getZ: function() {
            return z;
        }

    });

}
