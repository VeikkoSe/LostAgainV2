/*global SETV,mat4,mat3,console */
SETV.RenderProcess = function(glv, camera, material, am) {
    'use strict';

    this._glv = glv;
    this._material = material;
    this._am = am;
    this._camera = camera;
    this._normalMatrix = mat3.create();

    this._renderable = [];
    this._uniforms = [];
    this._pointers = [];
    this._position = [];
    this._scale = [];
    //this._renderable.rotate = [];

    this._xArray = [1, 0, 0];
    this._yArray = [0, 1, 0];
    this._zArray = [0, 0, 1];



};

SETV.RenderProcess.prototype.update = function() {
    'use strict';
    //console.log('update');
};

SETV.RenderProcess.prototype.resetMat3 = function(normalMatrix) {
    'use strict';

    normalMatrix[0] = 1;
    normalMatrix[1] = 0;
    normalMatrix[2] = 0;
    normalMatrix[3] = 0;
    normalMatrix[4] = 1;
    normalMatrix[5] = 0;
    normalMatrix[6] = 0;
    normalMatrix[7] = 0;
    normalMatrix[8] = 1;

    return normalMatrix;

};

SETV.RenderProcess.prototype.draw = function(le) {
    'use strict';

    if (le.components.ModelComponent) {


        var mc =le.components.ModelComponent;

        var mvMatrix = this._camera.mvMatrix;
        this._camera.mvPushMatrix();

        var mesh = this._am.getAssets().models[mc.mesh];

        if(le.components.PositionComponent) {
            var pc = le.components.PositionComponent;

            this._position[0] = pc.xPos;
            this._position[1] = pc.yPos;
            this._position[2] = pc.zPos;

            mat4.translate(mvMatrix, this._position);
        }

        if(le.components.RotationComponent) {
            var rc = le.components.RotationComponent;

            mat4.rotate(mvMatrix, rc.angleY, this._yArray);
            mat4.rotate(mvMatrix, rc.angleZ, this._zArray);
            mat4.rotate(mvMatrix, rc.angleX, this._xArray);

        }

        if(le.components.ScaleComponent) {

            var sc =le.components.ScaleComponent;
            this._scale[0] = sc.scale;
            this._scale[1] = sc.scale;
            this._scale[2] = sc.scale;

            mat4.scale(mvMatrix, this._scale);
        }

        this._normalMatrix = this.resetMat3(this._normalMatrix);

        mat4.toInverseMat3(mvMatrix, this._normalMatrix);
        mat3.transpose(this._normalMatrix);


        var uniforms = [];

        uniforms[0] = {'uniformType': 'Matrix4fv', 'uniformName': 'uPMatrix', 'uniformValue': this._camera.pMatrix};
        uniforms[1] = {'uniformType': 'Matrix4fv', 'uniformName': 'uMVMatrix', 'uniformValue': mvMatrix};
        uniforms[2] = {'uniformType': 'Matrix3fv', 'uniformName': 'uNMatrix', 'uniformValue': this._normalMatrix};
        //uniforms

        //console.log(mc);
        if(mc.opaque===1) {
            uniforms[3] = {'uniformType': 'float', 'uniformName': 'uAlpha', 'uniformValue': 1.0};
        }
        else {

            uniforms[3] = {'uniformType': 'float', 'uniformName': 'uAlpha', 'uniformValue': 0.2};
        }


        //console.log(uniforms);


        var pointers = [];
        console.log(uniforms);
        pointers[0] = {'pointerType': 'aVertexPosition', 'pointerValue': mesh.vertexPositionBuffer, 'pointerLength': 3};
        pointers[1] = {'pointerType': 'aVertexNormal', 'pointerValue': mesh.normalPositionBuffer, 'pointerLength': 3};
        pointers[2] = {'pointerType': 'aTextureCoord', 'pointerValue': mesh.texturePositionBuffer, 'pointerLength': 2};
        pointers[3] = {'pointerType': 'index', 'pointerValue': mesh.indexPositionBuffer};

        var renderable = [];

        //texture
        renderable[0] = mc.texture;
        //program name
        renderable[1] = 'per-fragment-lighting';
        //mesh
        renderable[2] = mc.mesh;
        //pointers/attributes
        renderable[3] = uniforms;
        renderable[4] = pointers;
        renderable[5] = 0;

        if(mc.opaque===1) {

            renderable[5] = 1;
        }




        this._camera.mvPopMatrix();
        return renderable;
    }

    return false;
};


