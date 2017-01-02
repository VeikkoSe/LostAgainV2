function healthComponent(amount, sprite) {
    'use strict';

    var name = 'HealthComponent';

    return Object.freeze({
        getName: function() {
            return name;
        },
        getSprite: function() {
            return sprite;
        },
        getAmount: function() {
            return amount;
        },
        setAmount: function(v) {
            amount = v;
        }
    });

}
