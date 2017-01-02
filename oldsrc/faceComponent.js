function faceComponent() {
    'use strict';

    var name = 'FaceComponent';
    var target;

    return Object.freeze({
        getName: function() {
            return name;
        },
        getTarget: function() {
            return target;
        },
        setTarget: function(v) {
            target = v;
        }
    });

}
