/*global SETV */
SETV.MeshRenderer = function(glv, camera, material, am) {
    'use strict';

    this._glv = glv;
    this._material = material;
    this._am = am;
    //this._camera = camera;
    //this._normalMatrix = mat3.create();


    //this._scaleArray = [1,1,1];
    //this._positionArray = [0,0,0];

};



SETV.MeshRenderer.prototype.render = function(renderables) {
    'use strict';

    if(!renderables) {
        return;
    }
    var gl = this._glv.getGL();
    for(var i = 0;i<renderables.length;i++) {
        var renderable = renderables[i];
        //opaque
        if (renderable[5] === 1) {

            gl.disable(gl.BLEND);
            gl.enable(gl.DEPTH_TEST);
            this._rend(renderable);
        }
        //transparent
        if (renderable[5] === 0) {

            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            gl.enable(gl.BLEND);
            gl.disable(gl.DEPTH_TEST);
            this._rend(renderable);

        }
    }
};


SETV.MeshRenderer.prototype._rend = function(renderable) {
    "use strict";
    var gl = this._glv.getGL();
    this._material.setProgram(renderable[1]);

    var mesh = this._am.getAssets().models[renderable[2]];

    this._material.useTexture(renderable[0]);

    for(var g = 0;g<renderable[3].length;g++) {
        var uniform = renderable[3][g];
        this._material.setUniform(uniform.uniformType, uniform.uniformName, uniform.uniformValue);
    }

    for(var j = 0;j<renderable[4].length;j++) {
        var pointer = renderable[4][j];

        this._material.setPointer(pointer.pointerType, pointer.pointerValue, pointer.pointerLength);
    }

    gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0);


}




