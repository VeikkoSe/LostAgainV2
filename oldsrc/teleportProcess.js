function teleportProcess(sb, helpers) {
    'use strict';

    //class TeleportProcess extends processor {
    //}
    //constructor() {

    var material = sb.getMaterial();
    var simplestProgram = material.useShader('simplest');

    var em = sb.getEntityManager();
    var gl = sb.getGL();
    var camera = sb.getCamera();

    //}

    var update = function(deltatime, totalElapsed) {

        var ms = em.getEntityByName('mothership');
        var ship = em.getEntityByName('ship');

        if (ms && ship) {




            //if (totalElapsed > 2000)
            //ms.components.JumpAreaComponent.visible = true;

            //TODO: change to vectors
            ms.components.JumpAreaComponent.setPoints(
                helpers.circleXY(ms.components.RenderableComponent.getXPos(),
                    0,
                    ms.components.RenderableComponent.getZPos(),
                    ms.components.JumpAreaComponent.getRadius(),
                    ms.components.JumpAreaComponent.getPointAmount()));

            if (!helpers.isInCircle(ms.components.RenderableComponent.getXPos(),
                    ms.components.RenderableComponent.getZPos(),
                    ms.components.JumpAreaComponent.getRadius(),
                    ship.components.RenderableComponent.getXPos(),
                    ship.components.RenderableComponent.getZPos())
            ) {

                var dirX = ms.components.RenderableComponent.getXPos() - ship.components.RenderableComponent.getXPos();
                var dirZ = ms.components.RenderableComponent.getZPos() - ship.components.RenderableComponent.getZPos();

                var origHyp = Math.sqrt(dirX * dirX + dirZ * dirZ);

                //normalize
                var dirXnormal = dirX / origHyp;
                var dirZnormal = dirZ / origHyp;

                //we get new vector that is in same direction but always inside the circle
                dirX = (ms.components.JumpAreaComponent.getRadius() - 1) * dirXnormal;
                dirZ = (ms.components.JumpAreaComponent.getRadius() - 1) * dirZnormal;

                var posx = dirX + ms.components.RenderableComponent.getXPos();
                var posZ = dirZ + ms.components.RenderableComponent.getZPos();

                ship.components.RenderableComponent.setXPos(posx);
                ship.components.RenderableComponent.setZPos(posZ);

                //for (var i = 0; i < ship.components.MultiExhaustComponent.exhaustComponents.length; i++) {
                //   ship.components.MultiExhaustComponent.exhaustComponents[i].points = [];
                //  ship.components.MultiExhaustComponent.exhaustComponents[i].flow = [];
                //}
                var trailComponents = ship.components.MultiTrailComponent.getTrailComponents();
                for (var i = 0; i < trailComponents.length; i++) {
                    trailComponents[i].resetTrail();
                    //trailComponents[i].setPoints([]);
                    //trailComponents[i].setFlow([]);
                }

            }
        }

    };

    var draw = function(le) {

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

    };

    var isInRectangle = function(centerX, centerY, radius, x, y) {
        return x >= centerX - radius && x <= centerX + radius &&
            y >= centerY - radius && y <= centerY + radius;
    };

    var getOppositeAngle = function(angle) {
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
    return Object.freeze({
        draw, update, init: function() {
        }
    });

}



