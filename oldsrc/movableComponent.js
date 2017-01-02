function movableComponent(speed) {
    'use strict';

    var name = 'MovableComponent';

    var newXpos = false;
    var newYpos = false;
    var newZpos = false;
    var path = {};

    var angle = 0;
    var lt = 0;
    var acceleration = 5;

    return Object.freeze({
        getName: function() {
            return name;
        }, newXpos, newYpos, newZpos, path, angle, lt, speed, acceleration
    });

}
