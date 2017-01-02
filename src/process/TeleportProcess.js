/* global GAME */
GAME.TeleportProcess = function(glv,em,material,camera,helpers) {
    'use strict';

    //class TeleportProcess extends processor {
    //}
    //constructor() {

    this._material = material;
   // var simplestProgram = material.useShader('simplest');

    this._em = em;
    this._gl = glv.getGL();
    this._camera = camera;
    this._helpers = helpers;
    };
    //}

GAME.TeleportProcess.prototype.update = function(deltatime, totalElapsed) {
    'use strict';
        var ms = this._em.getEntityByName('mothership');
        var ship = this._em.getEntityByName('ship');

        if (ms && ship) {




            //if (totalElapsed > 2000)
            //ms.components.JumpAreaComponent.visible = true;

            //TODO: change to vectors
            ms.components.JumpAreaComponent.points =
                this._helpers.circleXY(ms.components.RenderableComponent.xPos,
                    0,
                    ms.components.RenderableComponent.zPos,
                    ms.components.JumpAreaComponent.radius,
                    ms.components.JumpAreaComponent.pointAmount);

            if (!this._helpers.isInCircle(ms.components.RenderableComponent.xPos,
                    ms.components.RenderableComponent.zPos,
                    ms.components.JumpAreaComponent.radius,
                    ship.components.RenderableComponent.xPos,
                    ship.components.RenderableComponent.zPos)
            ) {

                var dirX = ms.components.RenderableComponent.xPos - ship.components.RenderableComponent.xPos;
                var dirZ = ms.components.RenderableComponent.zPos - ship.components.RenderableComponent.zPos;

                var origHyp = Math.sqrt(dirX * dirX + dirZ * dirZ);

                //normalize
                var dirXnormal = dirX / origHyp;
                var dirZnormal = dirZ / origHyp;

                //we get new vector that is in same direction but always inside the circle
                dirX = (ms.components.JumpAreaComponent.radius - 1) * dirXnormal;
                dirZ = (ms.components.JumpAreaComponent.radius - 1) * dirZnormal;

                var posx = dirX + ms.components.RenderableComponent.xPos;
                var posZ = dirZ + ms.components.RenderableComponent.zPos;

                ship.components.RenderableComponent.xPos = posx;
                ship.components.RenderableComponent.zPos = posZ;

                //for (var i = 0; i < ship.components.MultiExhaustComponent.exhaustComponents.length; i++) {
                //   ship.components.MultiExhaustComponent.exhaustComponents[i].points = [];
                //  ship.components.MultiExhaustComponent.exhaustComponents[i].flow = [];
                //}
                //var trailComponents = ship.components.MultiTrailComponent.getTrailComponents();
                //for (var i = 0; i < trailComponents.length; i++) {
                  //  trailComponents[i].resetTrail();
                    //trailComponents[i].setPoints([]);
                    //trailComponents[i].setFlow([]);
                //}

            }
        }

    };

GAME.TeleportProcess.prototype.draw = function(le) {

    /*

        if (le.components.JumpAreaComponent && le.components.JumpAreaComponent.getVisible() === true) {

            material.setProgram(simplestProgram);

            var mvMatrix = camera.getMVMatrix();

            gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, mvMatrix);

            var c = le.components.JumpAreaComponent.getColor();
            gl.uniform4f(simplestProgram.uColor, c[0], c[1], c[2], 1.0);

            gl.bindBuffer(gl.ARRAY_BUFFER, le.components.JumpAreaComponent.getVertexPositionBuffer());

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(le.components.JumpAreaComponent.getPoints()), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(simplestProgram.aVertexPosition);
            gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.LINES, 0, le.components.JumpAreaComponent.getPoints().length / 3);
            camera.addDrawCall();
        }
*/
    };

GAME.TeleportProcess.prototype.isInRectangle = function(centerX, centerY, radius, x, y) {
        return x >= centerX - radius && x <= centerX + radius &&
            y >= centerY - radius && y <= centerY + radius;
    };

GAME.TeleportProcess.prototype.getOppositeAngle = function(angle) {
        //angle = angle * Math.PI/180;
        var ret = false;
        if (angle > 180) {
            ret = angle - 180;
        }
        else if (angle < 180) {
            ret = angle + 180;
        }

        return ret;

    };






