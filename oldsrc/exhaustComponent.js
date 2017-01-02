function exhaustComponent(msh, offSetFromCenter, offSetSideFromCenter) {
    'use strict';

    var name = 'ExhaustComponent';
    var mesh = msh;

    return Object.freeze({
        getName: function() {
            return name;
        },
        getMesh: function() {
            return mesh;
        },
        getOffSetSideFromCenter: function() {
            return offSetSideFromCenter;
        },
        getOffSetFromCenter: function() {
            return offSetFromCenter;
        }

    });

}
