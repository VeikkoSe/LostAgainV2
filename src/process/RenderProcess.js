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
    //this._renderable.rotate = [];

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



    if (le.components.ModelComponent && le.components.RenderableComponent) {

        var mvMatrix = this._camera.mvMatrix;
        this._camera.mvPushMatrix();
        var renderable = [];
        //console.log(le.components.ModelComponent.mesh);


        //texture
        renderable[0] = le.components.ModelComponent.texture;
        //program name
        renderable[1] = 'per-fragment-lighting';

        //mesh
        renderable[2] = le.components.ModelComponent.mesh;
        var mesh = this._am.getAssets().models[le.components.ModelComponent.mesh];

        var rc = le.components.RenderableComponent;
        //scale
        renderable[3] = rc.scale;



        renderable[4] =rc.xPos;
        renderable[5] =rc.yPos;
        renderable[6] =rc.zPos;




        renderable[7] =rc.angleX;
        renderable[8] =rc.angleY;
        renderable[9] =rc.angleZ;

        mat4.translate(mvMatrix, [renderable[4],renderable[5],renderable[6]]);

        this._normalMatrix = this.resetMat3(this._normalMatrix);

        mat4.toInverseMat3(mvMatrix, this._normalMatrix);
        mat3.transpose(this._normalMatrix);

        var uniforms = [];//this._uniforms.length = 0;
        uniforms[0] = {'uniformType':'Matrix4fv','uniformName':'uPMatrix','uniformValue': this._camera.pMatrix};
        uniforms[1] = {'uniformType':'Matrix4fv','uniformName':'uMVMatrix','uniformValue':mvMatrix};
        uniforms[2] = {'uniformType':'Matrix3fv','uniformName':'uNMatrix','uniformValue': this._normalMatrix};
        //uniforms
        renderable[10] = uniforms;

        var pointers = [];//this._pointers.length =0;
        //console.log(mesh);
        pointers[0] = {'pointerType':'aVertexPosition','pointerValue':mesh.vertexPositionBuffer,'pointerLength':3};
        pointers[1] = {'pointerType':'aVertexNormal','pointerValue':mesh.normalPositionBuffer,'pointerLength':3};
        pointers[2] = {'pointerType':'aTextureCoord','pointerValue':mesh.texturePositionBuffer,'pointerLength':2};
        pointers[3] = {'pointerType':'index','pointerValue':mesh.indexPositionBuffer};

        //pointers/attributes
        renderable[11] = pointers;
        this._camera.mvPopMatrix();
        return renderable;
    }

    return false;
};


