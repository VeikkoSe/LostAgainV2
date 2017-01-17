/*global SETV */
SETV.JoinProcess = function(glv, em, camera) {
    'use strict';

    this._em = em;
    this._camera = camera;
    this._gl = glv.getGL();
};
SETV.JoinProcess.prototype.update = function(input, elapsed, entity) {
    'use strict';
    if (entity.components.JoinComponent) {


    }

};

SETV.JoinProcess.prototype.draw = function(le) {
    "use strict";
    return false;
};







