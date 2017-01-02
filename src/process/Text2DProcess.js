/*global SETV */
SETV.Text2DProcess = function(glv, material, text, camera, am) {
    'use strict';

    this._glv = glv;
    this.material = material;
    this._camera = camera;

    this.characterArray = null;
    //var currentString = '';
    //var sprite;
    var gl = this._glv.getGL();
    this._vertexPositionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexPositionBuffer);
    //this._squareBuffer.size = textBuffer.length / 5;

    this._str = '';
    this.characterArray = text.textToC(this._str);
};

SETV.Text2DProcess.prototype.update = function() {
    "use strict";

};

SETV.Text2DProcess.prototype.draw = function(le) {
    'use strict';
    if (le.components.TextComponent) {

        var tc = le.components.TextComponent;
        var gl = this._glv.getGL();

        var program = this._material.setProgram('per-fragment-lighting');

        //material.setProgram(program);

        //gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexPositionBuffer);
        //gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 20, 0);

        //gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 20, 12);

        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tc.textBuffer), gl.STATIC_DRAW);
        // material.useTexture('image');
        /*
         gl.activeTexture(gl.TEXTURE0);
         gl.bindTexture(gl.TEXTURE_2D, sprite.getTexture());
         gl.uniform1i(program.samplerUniform, 0);
         */

        //gl.drawArrays(gl.TRIANGLES, 0, tc.getTextBuffer().length / 5);

        //this._camera.addDrawCall();

    }

    //}

};

