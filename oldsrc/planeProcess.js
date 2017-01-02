function planeProcess(sb) {

    var gl = sb.getGL();
    var camera = sb.getCamera();

    //var em = sb.getEntityManager();
    var material = sb.getMaterial();
    var simplestProgram = material.useShader('simplest');

    var draw = function(le) {


        // for (var e = 0; e < em.entities.length; e++) {
        //   var le = em.entities[e];

        if (le.components.PlaneComponent) {

            material.setProgram(simplestProgram);

            var ftc = le.components.PlaneComponent;
            var mvMatrix = camera.getMVMatrix();

            camera.mvPushMatrix();

            //gl.uniform3fv(shaderProgram.uDrawColor, [1, 1, 1]);
            //gl.uniform3fv(shaderProgram.uMaterialDiffuse, [1, 1, 1]);

            //mat4.translate(camera.mvMatrix, [0, 0, 0]);
            mat4.scale(mvMatrix, [10, 10, 10]);
            // mat4.rotate(camera.mvMatrix, 90 * Math.PI / 180, [1, 1, 1]);
            //gl.uniform3fv(shaderProgram.uDrawColor, [1, 1, 1]);

            //gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);

            gl.bindBuffer(gl.ARRAY_BUFFER, ftc.getPlane().vertexPositionBuffer);
            gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

            gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, mvMatrix);

            // gl.bindBuffer(gl.ARRAY_BUFFER, ftc.terrain.normalPositionBuffer);
            //gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);

            //gl.bindBuffer(gl.ARRAY_BUFFER, ftc.terrain.texturePositionBuffer);
            //gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
            //gl.activeTexture(gl.TEXTURE0);
            //gl.bindTexture(gl.TEXTURE_2D, ftc.terrain.texture.loadedTexture);
            //gl.uniform1i(shaderProgram.samplerUniform, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ftc.getPlane().indexPositionBuffer);

            //helpers.setMatrixUniforms();
            //console.log(ftc.getPlane().indexPositionBuffer.numItems);
            gl.drawElements(gl.LINES, ftc.getPlane().indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
            camera.addDrawCall();
            //gl.drawElements(gl.TRIANGLES, foundTerrain.terrain.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
            // gl.disable(gl.BLEND);
            camera.mvPopMatrix();

            // }

        }
        //}
    };
    return Object.freeze({
        update: function() {
        }, draw, init: function() {
        }
    });

}