/*global SETV,mat4,mat3,console */
SETV.RotationProcess = function(glv, camera, material, am) {
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
    //this._renderable.rotate = [];



};

SETV.RotationProcess.prototype.update = function() {
    'use strict';

};



SETV.RotationProcess.prototype.draw = function(le) {
    'use strict';

    //if(le.components.ModelComponent && le.components.RotationComponent) {
    //    var rotC = le.components.RotationComponent;
    //    var mc = le.components.ModelComponent;


    //}



    return false;
};


