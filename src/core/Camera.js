/*global SETV,mat4,Math*/
SETV.Camera = function(glv, resolutionWidth, resolutionHeight) {
    'use strict';

    this._glv = glv;
    this._resolutionWidth = resolutionWidth;
    this._resolutionHeight = resolutionHeight;

    this.mvMatrix = mat4.create();
    this.pMatrix = mat4.create();

    this._fov = 70;
    this.x = 0;
    this.z = -300;
    this.y = 0;

    //Initialize Perspective matrix
    mat4.identity(this.pMatrix);
    mat4.identity(this.mvMatrix);
    this._drawCalls = 0;

    this.mvMatrixStack = [];

};

SETV.Camera.prototype.setPerspective = function() {
    "use strict";
    mat4.perspective(this._fov, this._resolutionWidth / this._resolutionHeight, 0.1, 2000.0, this.pMatrix);
};

SETV.Camera.prototype.setYellowClear = function() {
    "use strict";
    var gl = this._glv.getGL();
    gl.clearColor(1.0, 1.0, 0.0, 0.5);

}

SETV.Camera.prototype.lookAt = function(epos, direction) {
    'use strict';

    mat4.lookAt([this.x, this.y, this.z], epos, direction, this.mvMatrix);
};

SETV.Camera.prototype.mvPushMatrix = function() {
    'use strict';
    var copy = mat4.create();
    mat4.set(this.mvMatrix, copy);
    this.mvMatrixStack.push(copy);
};

SETV.Camera.prototype.mvPopMatrix = function() {
    'use strict';
    if (this.mvMatrixStack.length === 0) {
        throw 'Invalid popMatrix!';
    }
    this.mvMatrix = this.mvMatrixStack.pop();
};

SETV.Camera.prototype.addDrawCall = function() {
    'use strict';
    this._drawCalls++;
};
SETV.Camera.prototype.resetDrawCalls = function() {
    'use strict';
    this._drawCalls = 0;
};
SETV.Camera.prototype.getDrawCalls = function() {
    'use strict';
    return this._drawCalls;

};
