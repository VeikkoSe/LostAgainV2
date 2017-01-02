function primitiveComponent(points, color) {
    'use strict';

    var name = 'PrimitiveComponent';

    return Object.freeze({
        getName: function() {
            return name;
        },
        points,
        color
    });

}


