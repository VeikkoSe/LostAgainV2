function planeComponent(plane) {
    'use strict';

    var name = 'PlaneComponent';

    return Object.freeze({
        getName: function() {
            return name;
        }, getPlane: function() {
            return plane;
        }
    });

}
