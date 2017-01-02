/*global SETV*/
SETV.TextTimer = function() {
    'use strict';

    this._events = {};
    this._events['2000'] = 'Lights!';
    this._events['4000'] = 'Camera!';
    this._events['6000'] = 'Action!';

    this._events['8000'] = ' ';





};
SETV.TextTimer.prototype.getLevelText = function() {
    'use strict';
    return this._events;
};
