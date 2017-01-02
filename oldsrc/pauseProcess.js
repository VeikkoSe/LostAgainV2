function pauseProcess(sb) {
    'use strict';

    var oldKeyboardState = [];

    var isToggled = function(ks, oks, key) {
        //key because onkeydown is different value than onkeypress
        //need to store both eventually and show the onkeypress code
        // and use the onkeydown
        //
        return ((oks[key] === false || typeof oks[key] === 'undefined') && ks[key] === true);

    };
    var update = function() {

        var keyboardState = JSON.parse(JSON.stringify(sb.getActionMapper().getCurrentlyPressedKeys()));

        if (isToggled(keyboardState, oldKeyboardState, 80)) {

            sb.publish('pause');
        }
        oldKeyboardState = keyboardState;

    };

    return Object.freeze({
        update, draw: function() {
        }, init: function() {
        }
    });

}
