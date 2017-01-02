function enemyComponent() {
    'use strict';

    var name = 'EnemyComponent';
    var speed = 30;

    return Object.freeze({
        getName: function() {
            return name;
        },
        getSpeed: function() {
            return speed;
        }
    });

}
