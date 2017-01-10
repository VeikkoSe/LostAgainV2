/*global GAME */
GAME.ShieldProcess = function(glv, em, camera) {
    'use strict';

    this._em = em;
    //this._emmaterial = sb.getMaterial();
    //var program = material.useShader('per-fragment-lighting');
    this._camera = camera;
    this._gl = glv.getGL();
};
GAME.ShieldProcess.prototype.update = function(input, elapsed, entity) {
    'use strict';
    //var entities = this._em.getEntities();
    var timeNow = new Date().getTime();
    //for (var e = 0; e < entities.length; e++) {
    //    var le = entities[e];
    if (entity.components.ShieldComponent) {

        var sc = entity.components.ShieldComponent;

        var lastHit = sc.lastShieldAdded;
        if (lastHit > 0 && timeNow - lastHit > 3000) {
            sc.lastShieldAdded = timeNow;
            if (sc.amount < sc.max) {
                sc.amount = sc.amount + 1;
            }
            else {
                sc.lastShieldAdded = 0;
            }

        }

    }
    //}

};

GAME.ShieldProcess.prototype.draw = function(le) {
    "use strict";

    if (le.components.ShieldComponent &&

        le.components.HealthComponent &&
        le.components.ModelComponent) {

        //le.components.RenderableComponent &&

        //var mvMatrix = this._camera.mvMatrix;
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

        this._position[0] = 0;
        this._position[1] = 0;
        this._position[2] = 0;

        if (rc.angleY || rc.angleZ || rc.angleX) {
            mat4.rotate(this._camera.mvMatrix, rc.angleY, this._yArray);
            mat4.rotate(this._camera.mvMatrix, rc.angleZ, this._zArray);
            mat4.rotate(this._camera.mvMatrix, rc.angleX, this._xArray);
        }

        if (rc.scale !== 1) {

            this._scaleArray[0] = rc.scale;
            this._scaleArray[1] = rc.scale;
            this._scaleArray[2] = rc.scale;

            mat4.scale(this._camera.mvMatrix, this._scaleArray);
        }

        mat4.translate(this._camera.mvMatrix, this._position);

        this._normalMatrix = this.resetMat3(this._normalMatrix);

        mat4.toInverseMat3(this._camera.mvMatrix, this._normalMatrix);
        mat3.transpose(this._normalMatrix);

        var uniforms = [];//this._uniforms.length = 0;
        uniforms[0] = {'uniformType': 'Matrix4fv', 'uniformName': 'uPMatrix', 'uniformValue': this._camera.pMatrix};
        uniforms[1] = {'uniformType': 'Matrix4fv', 'uniformName': 'uMVMatrix', 'uniformValue': this._camera.mvMatrix};
        uniforms[2] = {'uniformType': 'Matrix3fv', 'uniformName': 'uNMatrix', 'uniformValue': this._normalMatrix};
        //uniforms
        renderable[10] = uniforms;

        var pointers = [];//this._pointers.length =0;
        //console.log(mesh);
        pointers[0] = {'pointerType': 'aVertexPosition', 'pointerValue': mesh.vertexPositionBuffer, 'pointerLength': 3};
        pointers[1] = {'pointerType': 'aVertexNormal', 'pointerValue': mesh.normalPositionBuffer, 'pointerLength': 3};
        pointers[2] = {'pointerType': 'aTextureCoord', 'pointerValue': mesh.texturePositionBuffer, 'pointerLength': 2};
        pointers[3] = {'pointerType': 'index', 'pointerValue': mesh.indexPositionBuffer};

        //pointers/attributes
        renderable[11] = pointers;
        //transparent mesh
        renderable[12] = 1;

        this._camera.mvPopMatrix();
        return renderable;
    }

    return false;
};







