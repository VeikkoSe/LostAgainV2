function shieldComponent(amount, sprite, mesh, scale) {
    'use strict';

    var name = 'ShieldComponent';
    var max = amount;
    var lastHit = 0;
    var lastShieldAdded = 0;

    return Object.freeze({
        getName: function() {
            return name;
        },
        getAmount: function() {
            return amount;
        },
        setAmount: function(v) {
            amount = v;
        },
        getSprite: function() {
            return sprite;
        },
        getMesh: function() {
            return mesh;
        },
        setLastShieldAdded: function(v) {
            lastShieldAdded = v;
        },
        getLastShieldAdded: function() {
            return lastShieldAdded;
        },
        setLastHit: function(v) {
            lastHit = v;
        },
        getLastHit: function() {
            return lastHit;
        },

        getMax: function() {
            return max;
        },
        getScale: function() {
            if (typeof scale === 'undefined') {
                return 1;
            }
            return scale;
        },
        setScale: function(v) {
            scale = v;
        }
    });

}
