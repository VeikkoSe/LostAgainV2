function laserProcess(sb, pubsub, helpers) {
    'use strict';

    //var lastTime = 0;
    //var elapsedTotal = 0;
    //var x = 0;

    var ship = null;

    var gl = sb.getGL();
    var camera = sb.getCamera();

    var em = sb.getEntityManager();
    var material = sb.getMaterial();
    var simplestProgram = material.useShader('simplest');

    //this.texture = null;
    // this.framebuffer = gl.createFramebuffer();

    var points = [];
    var targets = [];

    var vertexPositionBuffer = gl.createBuffer();

    var init = function() {

        targets.push('mothership');
        targets.push('ship');

        points.push(-50, 0, 0);
        points.push(20, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    };

    var railXY = function(startX, startY, startZ, endX, endY, endZ) {
        points = [];

        points.push(startX, startY, startZ);
        points.push(endX, endY, endZ);
        return points;
    };

    var update = function() {
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.LaserComponent) {
                var shooter = le.components.RenderableComponent;

                for (var i = 0; i < targets.length; i++) {

                    var target = em.getEntityByName(targets[i]);
                    if (!target) {
                        continue;
                    }

                    var rc = target.components.RenderableComponent;

                    //var hc = targets[i].components.HealthComponent;
                    if (target.components.HealthComponent.getAmount() > 0 &&
                        le.components.HealthComponent.getAmount() > 0 &&
                        helpers.isInCircle(shooter.getXPos(), shooter.getZPos(), 100, rc.getXPos(), rc.getZPos())) {

                        pubsub.publish('enemyhit', target);
                        //sb.publish("smallexplosion", target);

                        break; //shoot only one target at a time

                    }
                }
            }
        }

    };

    var draw = function(le) {

        if (le.components.LaserComponent) {

            var shooter = le.components.RenderableComponent;
            //var target = ship.components.RenderableComponent;

            for (var i = 0; i < targets.length; i++) {

                var target = em.getEntityByName(targets[i]);
                if (!target) {
                    continue;
                }

                var rc = target.components.RenderableComponent;

                if (target.components.HealthComponent.getAmount() > 0 &&
                    le.components.HealthComponent.getAmount() > 0 &&
                    helpers.isInCircle(shooter.getXPos(), shooter.getZPos(), 100, rc.getXPos(), rc.getZPos())) {

                    material.setProgram(simplestProgram);

                    points = railXY(shooter.getXPos(), shooter.getYPos(), shooter.getZPos(), rc.getXPos(), rc.getYPos(), rc.getZPos());

                    gl.uniform4f(simplestProgram.uColor, 1, 0, 0, 1.0);

                    var mvMatrix = camera.getMVMatrix();
                    camera.mvPushMatrix();

                    gl.lineWidth(8);
                    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);

                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

                    gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

                    gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.getPMatrix());
                    gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, mvMatrix);
                    gl.drawArrays(gl.LINES, 0, 2);
                    gl.lineWidth(1);
                    camera.addDrawCall();

                    camera.mvPopMatrix();
                    break;
                }
            }

        }

    };
    return Object.freeze({update, draw, init});
}
