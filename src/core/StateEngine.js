/*global SETV,requestAnimationFrame */
SETV.StateEngine = function(allStages, loader) {
    'use strict';
    this._possibleStates = [];
    this._states = [];
    this._currentState = null;
    this._possibleStates = allStages;
    this._loader = loader;

};

SETV.StateEngine.prototype.loadStage = function(stateStr) {
    'use strict';
    var state = this._possibleStates[stateStr];

    if (this._states.length > 0) {
        this._states.pop();
    }

    this._states.push(state);
    this._currentState = state;

    var that = this;

    this._loader.loadState(stateStr, function() {

        that._states[that._states.length - 1].init();

        that.tick();
    });
};

SETV.StateEngine.prototype.tick = function() {
    'use strict';

    var that = this;
    requestAnimationFrame(function() {
        that.tick();
    });

    that._currentState.update();
    that._currentState.draw();
};

