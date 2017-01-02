/*global GAME */
GAME.LayoutProcess = function(glv, material, camera) {
    'use strict';

    this._glv = glv;
    this._material = material;
    this._camera = camera;
};
/*
 var gl = sb.getGL();

 var material = sb.getMaterial();
 var program = material.useShader('gui');

 var camera = sb.getCamera();
 var points = [];
 var vertexPositionBuffer;
 var texCoordBuffer;
 var vertBuffer;
 // var camera = sb.getCamera();

 var init = function() {

 vertexPositionBuffer = gl.createBuffer();
 texCoordBuffer = gl.createBuffer();
 vertBuffer = gl.createBuffer();

 points.push(-50, 0, 0);
 points.push(20, 0, 0);

 gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

 gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
 1.0, 1.0,
 0.0, 1.0,
 0.0, 0.0,
 1.0, 1.0,
 0.0, 0.0,
 1.0, 0.0]), gl.STATIC_DRAW);

 gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);

 var pd = setRectangle(0, 0, 1, 1);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pd), gl.STATIC_DRAW);

 };
 */

GAME.LayoutProcess.prototype.simpleWorldToViewX = function(x) {
    'use strict';
    return x / this._glv.getResolutionWidth();
};

GAME.LayoutProcess.prototype.simpleWorldToViewY = function(y) {
    'use strict';
    return y / this._glv.getResolutionHeight();
};

GAME.LayoutProcess.prototype.calculatePd = function(x, y, xminus, yminus, layout) {
    'use strict';

    var rh = this._glv.getResolutionHeight() / (this._glv.getResolutionHeight() / 2);

    var y2 = y + (this.simpleWorldToViewY(1) * layout.getSize() * rh);
    var x2 = x + (this.simpleWorldToViewX(1) * layout.getSize() * rh);

    var tmp;
    if (yminus) {

        y2 = y - (this.simpleWorldToViewY(1) * layout.getSize() * rh);
        tmp = y;
        y = y2;
        y2 = tmp;
    }
    if (xminus) {
        x2 = x - (this.simpleWorldToViewX(1) * layout.getSize() * rh);
        tmp = x;
        x = x2;
        x2 = tmp;
    }

    return this.setRectangle(x, y, x2, y2);
};

GAME.LayoutProcess.prototype.recursiveLayout = function(layoutComponent, parent) {
    'use strict';

    var rh = this._glv.getResolutionHeight() / (this._glv.getResolutionHeight() / 2);

    var childAmount = layoutComponent.getChildren().length;
    var children = layoutComponent.getChildren();

    //right side of the screen, we minus so we get correct coordinates regardless of window size
    var x = (layoutComponent.getXPos());
    var y = (layoutComponent.getYPos());

    if (layoutComponent.getXPos() > 1) {
        x = parent.getXPos() + ((this.simpleWorldToViewX(1) * layoutComponent.getXPos()) * rh);
        y = parent.getYPos() + ((this.simpleWorldToViewY(1) * layoutComponent.getYPos()) * rh);
    }

    var xminus = false;
    var yminus = false;

    var pd = this.calculatePd(x, y, xminus, yminus, layoutComponent);

    this.render(layoutComponent.getIcon(), pd);

    var numberComponent = layoutComponent.getComponent();

    if (numberComponent) {

        var amount = numberComponent.getAmount();
        if (numberComponent.getSprite() && amount > 0) {
            for (var g = 0; g < amount; g++) {

                var add = (this.simpleWorldToViewY(1) * (parent.getSize() * rh)) + g * (this.simpleWorldToViewY(1) * (layoutComponent.getSize() * rh));

                var psub = this.calculatePd(x + add, y, xminus, yminus, layoutComponent);
                this.render(numberComponent.getSprite(), psub);

            }
        }
    }

    for (var i = 0; i < childAmount; i++) {

        this.recursiveLayout(children[i], layoutComponent);
    }

};

GAME.LayoutProcess.prototype.setRectangle = function(x, y, x2, y2) {
    'use strict';
    var x1 = x;

    var y1 = y;

    var ret = [
        x2, y1,
        x1, y1,
        x1, y2,

        x2, y1,
        x1, y2,
        x2, y2
    ];
    return ret;

};

GAME.LayoutProcess.prototype.render = function(layoutIcon, pd) {
    'use strict';

    //if (typeof layoutIcon === 'undefined' || layoutIcon === false) {
    //    return false;
    //}

    var program = this._material.setProgram('gui');

    var gl = this._glv.getGL();
    var vertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pd), gl.STATIC_DRAW);

    gl.vertexAttribPointer(program.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    //material.useTexture('image');
    /*
     var texture = layoutIcon.getTexture();


     gl.activeTexture(gl.TEXTURE0);
     gl.bindTexture(gl.TEXTURE_2D, texture);
     gl.uniform1i(program.samplerUniform, 0);
     */

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    this._camera.addDrawCall();

};

GAME.LayoutProcess.prototype.draw = function(le) {
    'use strict';

    if (le.components.LayoutComponent) {
        //var program = this._material.setProgram('gui');
        this.recursiveLayout(le.components.LayoutComponent, false);

    }

};

GAME.LayoutProcess.prototype.update = function(le) {
    'use strict';

};