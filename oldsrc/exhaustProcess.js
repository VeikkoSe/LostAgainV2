function exhaustProcess(sb, helpers) {
    'use strict';

    var em = sb.getEntityManager();
    var camera = sb.getCamera();

    var gl = sb.getGL();

    var material = sb.getMaterial();
    var program = material.useShader('per-fragment-lighting');

    var init = function() {

    };

    var update = function(deltatime) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

        }
    };
    var draw = function(le) {

        //camera.mvPushMatrix();
        //var mvMatrix = camera.getMVMatrix();

        //shadermanager.setProgram(program);

        //for (var e = 0; e < em.entities.length; e++) {
        //   var le = em.entities[e];

        if (le.components.HealthComponent &&
            le.components.HealthComponent.getAmount() < 1) {
            return;
        }

        if (le.components.MultiExhaustComponent) {

            var rc = le.components.RenderableComponent;

            var mc = le.components.MomentumComponent;
            var mec = le.components.MultiExhaustComponent;
            var ecl = mec.getExhaustComponents();

            for (var i = 0; i < ecl.length; i++) {

                camera.mvPushMatrix();
                var mvMatrix = camera.getMVMatrix();

                var ec = ecl[i];

                if (!mc || mc.getCurrentlyAccelerating() === 1) {




                    //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                    material.setProgram(program);

                    gl.uniform1f(program.alphaUniform, 1);
                    gl.uniform1i(program.uDrawColors, 0);

                    gl.uniform1i(program.uUseLighting, 1);
                    //model coordinates
                    gl.uniform3f(program.uLightPosition, 100, 20, 100);
                    gl.uniform3f(program.uLightAmbient, 0, 0, 0);
                    gl.uniform3f(program.uLightDiffuse, 0.8, 0.8, 0.8);
                    gl.uniform3f(program.uLightSpecular, 0.8, 0.8, 0.8);
                    gl.uniform1f(program.uMaterialShininess, 200.0);

                    gl.uniform3fv(program.uDrawColor, [0.5, 0.5, 0.5]);

                    var posX = rc.getXPos();
                    var posZ = rc.getZPos();

                    var unitX = Math.cos(rc.getAngleY());
                    var unitZ = Math.sin(rc.getAngleY());

                    var rendX = (posX - (unitX * ec.getOffSetSideFromCenter())) - ((-1 * unitZ) * ec.getOffSetFromCenter());
                    var rendZ = (posZ + (unitZ * ec.getOffSetSideFromCenter())) + (unitX * ec.getOffSetFromCenter());

                    mat4.translate(mvMatrix, [rendX, rc.getYPos(), rendZ]);

                    mat4.rotate(mvMatrix, rc.getAngleY(), [0, 1, 0]);
                    mat4.rotate(mvMatrix, rc.getAngleZ(), [0, 0, 1]);
                    mat4.rotate(mvMatrix, rc.getAngleX(), [1, 0, 0]);

                    gl.bindBuffer(gl.ARRAY_BUFFER, ec.getMesh().getVertexPositionBuffer());
                    gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

                    gl.bindBuffer(gl.ARRAY_BUFFER, ec.getMesh().getNormalPositionBuffer());
                    gl.vertexAttribPointer(program.aVertexNormal, 3, gl.FLOAT, false, 0, 0);

                    gl.bindBuffer(gl.ARRAY_BUFFER, ec.getMesh().getTexturePositionBuffer());
                    gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
                    //material.useTexture('image');
                    /*
                     gl.activeTexture(gl.TEXTURE0);
                     gl.bindTexture(gl.TEXTURE_2D, ec.getMesh().getTexture());
                     gl.uniform1i(program.samplerUniform, 0);
                     */

                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ec.getMesh().getIndexPositionBuffer());

                    gl.uniformMatrix4fv(program.uPMatrix, false, camera.getPMatrix());
                    gl.uniformMatrix4fv(program.uMVMatrix, false, mvMatrix);

                    var normalMatrix = mat3.create();
                    mat4.toInverseMat3(mvMatrix, normalMatrix);
                    mat3.transpose(normalMatrix);
                    gl.uniformMatrix3fv(program.uNMatrix, false, normalMatrix);

                    gl.drawElements(gl.TRIANGLES, ec.getMesh().getIndexPositionBuffer().numItems, gl.UNSIGNED_SHORT, 0);
                    camera.addDrawCall();
                    camera.mvPopMatrix();

                }

            }
            // }
        }

    };
    return Object.freeze({
        update, draw, init
    });

}