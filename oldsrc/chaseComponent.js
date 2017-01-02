function chaseComponent(spd) {
    'use strict';

    var name = 'ChaseComponent';
    var speed = spd;

    //}

    return Object.freeze({
        getName: function() {
            return name;
        },
        getSpeed: function() {
            return speed;
        }
    });

}
