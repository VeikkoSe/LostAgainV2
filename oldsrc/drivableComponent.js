function drivableComponent() {
    'use strict';

    var name = 'DrivableComponent';
    var accelerationOn = 0;
    var acceleration = 20;

    var velocityX = 0;
    var velocityZ = 0;
    var rotateRight = false;
    var rotateLeft = false;

    return Object.freeze({
        getName: function() {
            return name;
        }
    });

}
