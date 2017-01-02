function starMoveProcess(sb) {
    'use strict';

    var gl = sb.getGL();

    var pointStartPositionsBuffer = gl.createBuffer();
    var startPositions = [];
    var colors = [];
    //var em = sb.getEntityManager();
    var camera = sb.getCamera();

    var material = sb.getMaterial();
    var program = material.useShader('star');

    var numParticles = 10000;

    var init = function() {

        gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);

        var color = [1, 1, 1, 1];
        colors.push(color);

        var color2 = [1, 1, 1, 2];
        colors.push(color2);

        var color3 = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
        colors.push(color3);

        var color4 = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
        colors.push(color4);

        for (var i = 0; i < numParticles; i++) {

            startPositions.push(randomBetween(2200, -2200));
            startPositions.push(randomBetween(100, -800));
            startPositions.push(randomBetween(300, -800));
            //pointsize
            startPositions.push(randomBetween(1, 1));
        }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);

    };

    var randomBetween = function(min, max) {
        if (min < 0) {
            return min + Math.random() * (Math.abs(min) + max);
        } else {
            return min + Math.random() * max;
        }
    };

    var draw = function(le) {

        if (le.components.StarComponent) {

            var mvMatrix = camera.getMVMatrix();
            // sm.setProgram(starProgram);
            material.setProgram(program);
            camera.mvPushMatrix();
            //gl.uniform3fv(program.uCameraPos, [camera.getXPos(), camera.getYPos(), camera.getZPos()]);

            gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);

            gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 16, 0);
            gl.vertexAttribPointer(program.aPointSize, 1, gl.FLOAT, false, 16, 12);

            gl.uniformMatrix4fv(program.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(program.uMVMatrix, false, mvMatrix);

            gl.drawArrays(gl.POINTS, 0, numParticles);
            camera.addDrawCall();
            camera.mvPopMatrix();
        }

    };

    var update = function() {

        for (var i = 0; i < startPositions.length; i += 4) {
            if (startPositions[i] < -110) {
                startPositions[i] = 1000;
            }
            else {
                startPositions[i] = startPositions[i] - 5;
            }
        }
    }

    return Object.freeze({
        draw, update, init
    });
}