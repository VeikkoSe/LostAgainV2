function scoreProcess(sb) {
    'use strict';

    var text = sb.getText();

    var em = sb.getEntityManager();

    var update = function(deltatime, timeSinceStart) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.ScoreComponent && le.components.TextComponent) {

                var tc = le.components.TextComponent;
                var sc = le.components.ScoreComponent;

                tc.setCurrentString(sc.getValue());

                var str = tc.getCurrentString().toString();

                var characterArray = text.textToC(str);
                tc.setTextBuffer(text.buildData(characterArray, true, tc.getXPos(), tc.getYPos()));

            }
        }

    };

    return Object.freeze({
        draw: function() {
        }, update, init: function() {
        }
    });
}