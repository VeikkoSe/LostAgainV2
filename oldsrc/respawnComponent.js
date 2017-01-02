function respawnComponent() {
    'use strict';

    var name = 'RespawnComponent';
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
