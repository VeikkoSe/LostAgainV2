function menuProcess(sb, pubsub) {
    'use strict';

    var update = function(deltatime, timeFromStart) {

        if (sb.getActionMapper().getCurrentlyPressedKeys()[38]) {
            //sb.getStateEngine().loadNewState('gamestate');
            pubsub.publish('loadstage', 'gamestate');
        }
        if (sb.getActionMapper().getCurrentlyPressedKeys()[39]) {
            pubsub.publish('loadstage', 'levelupstate');
            //sb.getStateEngine().loadNewState('levelupstate');
        }
    };
    return Object.freeze({
        update, draw: function() {
        }, init: function() {
        }
    });

}