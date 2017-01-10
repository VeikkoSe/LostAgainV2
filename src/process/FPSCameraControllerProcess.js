/*global SETV,console,mat4 */
SETV.FPSCameraControllerProcess = function(camera) {
    'use strict';

    this._camera = camera;

    this._pitch = 0;
    this._pitchRate = 0;

    this._yaw = 0;

    //this._oldMouseX = 0;
    //this._oldMouseY = 0;
    this._worldRotY = 0;
    this._worldRotX = 0;

    this._XAxisRotation = [1, 0, 0];
    this._YAxisRotation = [0, 1, 0];

};

SETV.FPSCameraControllerProcess.prototype.degToRad = function(degrees) {
    'use strict';
    return degrees * Math.PI / 180;
};

SETV.FPSCameraControllerProcess.prototype.draw = function(le) {
    'use strict';

};

SETV.FPSCameraControllerProcess.prototype.update = function(input) {
    'use strict';

    this._worldRotX += input.mouse.mouseMovementX;
    this._worldRotY += input.mouse.mouseMovementY;

    if (this._worldRotY > 89) {
        this._worldRotY = 89;
    }
    if (this._worldRotY < -89) {
        this._worldRotY = -89;
    }

    if (this._worldRotX > 360) {
        this._worldRotX = 0;
    }
    if (this._worldRotX < 0) {
        this._worldRotX = 360;
    }

    var xrotrad = (this._worldRotY / 180 * Math.PI);
    var yrotrad = (this._worldRotX / 180 * Math.PI);

    //W
    if (input.keyboard[87]) {
        this._camera.x -= Math.sin(yrotrad);
        this._camera.y += Math.sin(xrotrad);
        this._camera.z += Math.cos(yrotrad);
    }
    //S
    if (input.keyboard[83]) {

        this._camera.x += Math.sin(yrotrad);
        this._camera.y -= Math.sin(xrotrad);
        this._camera.z -= Math.cos(yrotrad);
    }

    //D
    if (input.keyboard[68]) {
        this._camera.x -= Math.cos(yrotrad);
        this._camera.z -= Math.sin(yrotrad);
    }
    //A
    if (input.keyboard[65]) {

        this._camera.x += Math.cos(yrotrad);
        this._camera.z += Math.sin(yrotrad);
    }


    mat4.lookAt([0, 70, 60], [0, 0, -1], [0, 1, 0], this._camera.mvMatrix);
    //mat4.identity(this._camera.mvMatrix);

    //mat4.rotate(this._camera.mvMatrix, this.degToRad(this._worldRotY), this._XAxisRotation);
    //mat4.rotate(this._camera.mvMatrix, this.degToRad(this._worldRotX), this._YAxisRotation);
    //mat4.translate(this._camera.mvMatrix, [this._camera.x, this._camera.y, this._camera.z]);

};
