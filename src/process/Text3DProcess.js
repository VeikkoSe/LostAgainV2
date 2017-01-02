/*global SETV,mat4 */
SETV.Text3DProcess = function(glv, camera, material, am, text) {
    'use strict';
    this._glv = glv;

    this._camera = camera;

    this._material = material;
    //var program = material.useShader('font');

    this._am = am;

    var gl = this._glv.getGL();

    this._squareBuffer = gl.createBuffer();
    //var sprite;
    //var size;
    this._text = text;

    //var str = 'The quick brown fox jumps over the lazy dog\nThe quick brown fox jumps over the lazy dog\nThe quick brown fox jumps over the lazy dog';

    //var characterArray = this._text.textToC(str);

    //var textBuffer = this._text.buildData(characterArray, true);

    //var texture = t.loadedTexture;
    //var sprite = am.getAssets.textures.font;

    //gl.bindBuffer(gl.ARRAY_BUFFER, this._squareBuffer);
    //this._size = textBuffer.length / 5;

    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);

};

SETV.Text3DProcess.prototype.update = function(deltatime) {
    'use strict';
};

SETV.Text3DProcess.prototype.draw = function(le) {
    'use strict';
    //for (var e = 0; e < em.entities.length; e++) {
    //  var le = em.entities[e];

    if (le.components.TextComponent) {

        var program = this._material.setProgram('font');
        var gl = this._glv.getGL();

        this._camera.mvPushMatrix();

        this._material.setProgram(program);

        mat4.scale(this._camera.mvMatrix, [0.2, 0.2, 0.2]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._squareBuffer);
        gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 20, 0);
        gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 20, 12);
        //material.useTexture('image');
        /*
         gl.activeTexture(gl.TEXTURE0);
         gl.bindTexture(gl.TEXTURE_2D, sprite.getTexture());
         gl.uniform1i(program.samplerUniform, 0);
         */

        gl.uniformMatrix4fv(program.uPMatrix, false, this._camera.pMatrix);
        gl.uniformMatrix4fv(program.uMVMatrix, false, this._camera.mvMatrix);

        gl.drawArrays(gl.TRIANGLES, 0, this._);
        //camera.addDrawCall();
        this._camera.mvPopMatrix();
    }

    // }

};
