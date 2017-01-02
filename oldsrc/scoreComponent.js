function scoreComponent(sprite) {
    'use strict';

    var name = 'ScoreComponent';
    var score = 0;

    return Object.freeze({
        getName: function() {
            return name;
        },
        getAmount: function() {
            return 1;
        },
        getValue: function() {
            return score;
        },
        setValue: function(v) {
            score = v;
        },
        getSprite: function(v) {
            return sprite;
        }
    });

}
