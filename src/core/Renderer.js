/*global SETV */
SETV.Renderer = function(glv, camera, material, am) {
    'use strict';

    this._glv = glv;
    this._material = material;
    this._am = am;
    this._opaques =[];
    this._transparents =[];


};



SETV.Renderer.prototype.render = function(renderables) {
    'use strict';

    if(!renderables) {
        return;
    }
    var gl = this._glv.getGL();

    this._opaques.length = 0;
    this._transparents.length = 0;
    for(var i = 0;i<renderables.length;i++) {
        var renderable = renderables[i];
        //opaque
        if (renderable[5] === 1) {
            this._opaques.push(renderable);
        }
        //transparent
        if (renderable[5] !== 1) {
            this._transparents.push(renderable);
        }
    }

    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    for(var d = 0;d<this._opaques.length;d++) {
        this._rend(this._opaques[d]);
    }
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.enable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
    for(var h = 0;h<this._transparents.length;h++) {
        this._rend(this._transparents[h]);
    }

};


SETV.Renderer.prototype._rend = function(renderable) {
    "use strict";
    var gl = this._glv.getGL();
    this._material.setProgram(renderable[1]);

    var mesh = this._am.getAssets().models[renderable[2]];

    this._material.useTexture(renderable[0]);

    for (var g = 0; g < renderable[3].length; g++) {
        var uniform = renderable[3][g];
        this._material.setUniform(uniform.uniformType, uniform.uniformName, uniform.uniformValue);
    }

    for (var j = 0; j < renderable[4].length; j++) {
        var pointer = renderable[4][j];

        this._material.setPointer(pointer.pointerType, pointer.pointerValue, pointer.pointerLength);
    }
    if (renderable[6] === 1) {
        gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0);
    }
    if (renderable[6] === 2) {
        gl.drawArrays(gl.LINES, 0, mesh.points);
        //gl.drawArrays(gl.LINES, 0, le.components.JumpAreaComponent.getPoints().length / 3);

    }

};


