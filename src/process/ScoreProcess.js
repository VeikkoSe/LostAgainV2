/* global GAME */
GAME.ScoreProcess = function(text,em) {
    'use strict';

    this._text = text;

    this._em = em;
};

GAME.ScoreProcess.prototype.update = function(input) {
    var entities = this._em.getEntities();
    for (var e = 0; e < entities.length; e++) {
        var le = entities[e];
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


GAME.ScoreProcess.prototype.draw = function() {
    "use strict";

};