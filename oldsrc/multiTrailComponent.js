function multiTrailComponent() {
    'use strict';

    var name = 'MultiTrailComponent';
    var trailComponents = [];

    var addTrail = function(trailComponent) {
        trailComponents.push(trailComponent);
    };

    return Object.freeze({
        getName: function() {
            return name;
        },
        getTrailComponents: function() {
            return trailComponents;
        },
        addTrail
    });

}
