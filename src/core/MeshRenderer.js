/*global SETV */
SETV.MeshRenderer = function(glv, camera, material, am) {
    'use strict';

    this._glv = glv;
    this._material = material;
    this._am = am;
    this._camera = camera;
    this._normalMatrix = mat3.create();

    this._xArray = [1,0,0];
    this._yArray = [0,1,0];
    this._zArray = [0,0,1];
    this._scaleArray = [1,1,1];
    this._positionArray = [0,0,0];

};



SETV.MeshRenderer.prototype.render = function(renderables) {
    'use strict';
    var gl = this._glv.getGL();

    console.log(renderables);
    this._glv.enableDepthTest();
    //renderables.length = 1;
    //console.log(renderables);
    for(var i = 0;i<renderables.length;i++) {



        var renderable = renderables[i];



        //var mvMatrix = this._camera.mvMatrix;







        this._material.setProgram(renderable[1]);




        //var mesh = this._am.getAssets().models[le.components.ModelComponent.mesh];
        var mesh = this._am.getAssets().models[renderable[2]];



        //var textureName = le.components.ModelComponent.texture;


        //var rc = le.components.RenderableComponent;
/*
        if (renderable.scale !== 1) {

            this._scaleArray[0] =renderable.scale;
            this._scaleArray[1] =renderable.scale;
            this._scaleArray[2] =renderable.scale;

            mat4.scale(mvMatrix, this._scaleArray);
        }
*/


       // this._positionArray[0] =renderable[4];
       // this._positionArray[1] =renderable[5];
       // this._positionArray[2] =renderable[6];

        //mat4.translate(mvMatrix, this._positionArray);

        //mat4.translate(mvMatrix, [renderable[4],renderable[5],renderable[6]]);

/*
        if(renderable.rotate.length>0) {
            mat4.rotate(mvMatrix, renderable.rotate[1], this._yArray);
            mat4.rotate(mvMatrix, renderable.rotate[2], this._zArray);
            mat4.rotate(mvMatrix, renderable.rotate[0], this._xArray);
        }

*/

        this._material.useTexture(renderable[0]);

        for(var g = 0;g<renderable[10].length;g++) {
            var uniform = renderable[10][g];
            this._material.setUniform(uniform.uniformType, uniform.uniformName, uniform.uniformValue);
        }

        for(var j = 0;j<renderable[11].length;j++) {
            var pointer = renderable[11][j];

            this._material.setPointer(pointer.pointerType, pointer.pointerValue, pointer.pointerLength);
        }



        gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0);


    }


};
