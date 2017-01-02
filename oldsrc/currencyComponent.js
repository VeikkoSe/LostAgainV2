function currencyComponent(sprite) {
    'use strict';

    var name = 'CurrencyComponent';

    return Object.freeze({
        getName: function() {
            return name;
        },
        getSprite: function() {
            return sprite;
        }
    });

}
