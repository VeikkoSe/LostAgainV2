function asteroidRenderProcess(sb) {
    'use strict';

    var normalMatrix = mat3.create();

    var em = sb.getEntityManager();

    var megaElapsedTotal = 0;

    var ambientProgram = sm.init('ambient');

    var monstermap = null;
    var lastTime = 0;
    var vertexPositionBuffer = gl.createBuffer();

    var cube = new Cube();

    var camera = sb.getCamera();
    var gl = sb.getGL();

    var elapsedTotal = 0;

    var combinedMeshes = {};

    var verts = cube.vertices();

    var init = function() {

        vertexPositionBuffer.nums = 0;
        combinedMeshes.vertices = [];
        vertexPositionBuffer.nums = 0;

        for (var g = 0; g < 5000; g++) {
            var x = getRandomInt(-100, 100);
            var y = getRandomInt(0, 0);
            var z = getRandomInt(-100, 100);

            for (var i = 0; i < verts.length; i += 3) {

                var newVerts = [];

                //object coordinates
                newVerts.push(verts[i]);
                newVerts.push(verts[i + 1]);
                newVerts.push(verts[i + 2]);
                //world xyx
                newVerts.push(x);
                newVerts.push(y);
                newVerts.push(z);
                //number of the object
                newVerts.push(g);
                newVerts.push(g);
                newVerts.push(g);

                combinedMeshes.vertices.push.apply(combinedMeshes.vertices, newVerts);
            }

            vertexPositionBuffer.nums += verts.length / 3;

        }

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(combinedMeshes.vertices), gl.STATIC_DRAW);
    };

    var textureFromPixelArray = function(dataArray, type, width, height) {
        var dataTypedArray = new Uint8Array(dataArray); // Don't need to do this if the data is already in a typed array
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texImage2D(gl.TEXTURE_2D, 0, type, width, height, 0, type, gl.UNSIGNED_BYTE, dataTypedArray);
        // Other texture setup here, like filter modes and mipmap generation
        return texture;
    };

    /*
     var randomIntFromInterval(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
     }
     */
    /*
     getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
     }

     */
    var createTexture = function(elapsed) {

        megaElapsedTotal += elapsed;
        if (megaElapsedTotal > 100 || monstermap === null) {

            megaElapsedTotal = 0;
            var b = new ArrayBuffer(128 * 128 * 4);
            var v1 = new Uint8Array(b);
            var g = 0;
            for (var i = 0; i < 128 * 128; i++) {

                if (randomIntFromInterval(0, 1) === 1) {
                    v1[g++] = 255;
                    v1[g++] = 255;
                    v1[g++] = 255;
                    v1[g++] = 255;

                }
                else {

                    v1[g++] = 0;
                    v1[g++] = 0;
                    v1[g++] = 0;
                    v1[g++] = 0;
                }
            }

            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR ) ;
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR ) ;
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT ) ;
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT ) ;
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 128, 128, 0, gl.RGBA,
                gl.UNSIGNED_BYTE, v1);
            gl.generateMipmap(gl.TEXTURE_2D);

            monstermap = texture;

        }

    };

    var update = function(deltatime, timeSinceBeginning) {
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.AsteroidComponent) {

                createTexture(deltatime);
            }
        }
    };

    var draw = function() {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.AsteroidComponent) {


                //sm.setProgram(this.ambientProgram);

                gl.uniform3fv(ambientProgram.uCameraPos, [camera.getXPos(), camera.getYPos(), camera.getZPos()]);
                //gl.uniform3fv(this.ambientProgram.uCameraPos, [0, 20, -20]);
                gl.uniformMatrix4fv(ambientProgram.uPMatrix, false, camera.getPMatrix());

                var timeNow = new Date().getTime();

                if (lastTime !== 0) {

                    elapsedTotal += timeNow - lastTime;
                    gl.uniform1f(ambientProgram.uElapsed, elapsedTotal.toFixed(1));

                }

                gl.uniform1f(ambientProgram.uElapsed, 0);
                lastTime = timeNow;

                //material.useTexture('image');
                /*gl.activeTexture(gl.TEXTURE0);
                 gl.bindTexture(gl.TEXTURE_2D, monstermap);
                 gl.uniform1i(ambientProgram.uVisibility, 0);
                 */

                gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
                gl.vertexAttribPointer(ambientProgram.aVertexPosition, 3, gl.FLOAT, false, 36, 0);
                gl.vertexAttribPointer(ambientProgram.aWorldCoordinates, 3, gl.FLOAT, false, 36, 12);
                gl.vertexAttribPointer(ambientProgram.aCubeNumber, 3, gl.FLOAT, false, 36, 24);

                gl.drawArrays(gl.TRIANGLES, 0, vertexPositionBuffer.nums);
                camera.addDrawCall();
            }
        }
    };
    return Object.freeze({update, draw, init});
}