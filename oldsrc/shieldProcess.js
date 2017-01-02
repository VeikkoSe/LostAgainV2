function shieldProcess(sb) {
    'use strict';

    var em = sb.getEntityManager();
    var material = sb.getMaterial();
    var program = material.useShader('per-fragment-lighting');
    var camera = sb.getCamera();
    var gl = sb.getGL();

    var update = function(deltatime, timeSinceStart) {

        var timeNow = new Date().getTime();
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.ShieldComponent) {

                var sc = le.components.ShieldComponent;

                var lastHit = sc.getLastShieldAdded();
                if (lastHit > 0 && timeNow - lastHit > 3000) {
                    sc.setLastShieldAdded(timeNow);
                    if (sc.getAmount() < sc.getMax()) {
                        sc.setAmount(sc.getAmount() + 1);
                    }
                    else {
                        sc.setLastShieldAdded(0);
                    }

                }

            }
        }

    };

    var draw = function(le) {

        var timeNow = new Date().getTime();

        if (le.components.ShieldComponent &&
            le.components.RenderableComponent &&
            le.components.HealthComponent

        ) {

            var rc = le.components.RenderableComponent;
            var sc = le.components.ShieldComponent;
            var hc = le.components.HealthComponent;

            //we do not render objects wich health is zero
            if (
                sc.getAmount() < 1 ||
                hc.getAmount() < 1 ||
                typeof sc.getMesh() === 'undefined') {
                return;
            }

            var lastHit = sc.getLastHit();
            if (lastHit > 0 && timeNow - lastHit < 1000) {

                camera.mvPushMatrix();
                var mvMatrix = camera.getMVMatrix();

                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                gl.enable(gl.BLEND);
                gl.disable(gl.DEPTH_TEST);

                //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                material.setProgram(program);

                //gl.uniform3fv(this.shaderProgram.uMaterialDiffuse, mc.mesh.diffuse);

                mat4.translate(mvMatrix, [rc.getXPos(), rc.getYPos(), rc.getZPos()]);

                if (sc.getScale() !== 1) {
                    mat4.scale(mvMatrix, [sc.getScale(), sc.getScale(), sc.getScale()]);
                }

                gl.uniform1f(program.alphaUniform, 0.5);
                gl.uniform1i(program.uDrawColors, 0);

                gl.uniform1i(program.uUseLighting, 1);
                //model coordinates
                gl.uniform3f(program.uLightPosition, 100, 20, 100);
                gl.uniform3f(program.uLightAmbient, 0, 0, 0);
                gl.uniform3f(program.uLightDiffuse, 0.8, 0.8, 0.8);
                gl.uniform3f(program.uLightSpecular, 0.8, 0.8, 0.8);
                gl.uniform1f(program.uMaterialShininess, 100.0);

                gl.bindBuffer(gl.ARRAY_BUFFER, sc.getMesh().getVertexPositionBuffer());
                gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, sc.getMesh().getNormalPositionBuffer());
                gl.vertexAttribPointer(program.aVertexNormal, 3, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, sc.getMesh().getTexturePositionBuffer());
                gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

                //material.useTexture('image');
                /*
                 gl.activeTexture(gl.TEXTURE0);
                 gl.bindTexture(gl.TEXTURE_2D, sc.getMesh().getTexture());
                 gl.uniform1i(program.samplerUniform, 0);
                 */

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sc.getMesh().getIndexPositionBuffer());

                gl.uniformMatrix4fv(program.uPMatrix, false, camera.getPMatrix());
                gl.uniformMatrix4fv(program.uMVMatrix, false, mvMatrix);

                var normalMatrix = mat3.create();
                mat4.toInverseMat3(mvMatrix, normalMatrix);
                mat3.transpose(normalMatrix);
                gl.uniformMatrix3fv(program.uNMatrix, false, normalMatrix);

                gl.drawElements(gl.TRIANGLES, sc.getMesh().getIndexPositionBuffer().numItems, gl.UNSIGNED_SHORT, 0);
                camera.addDrawCall();
                camera.mvPopMatrix();

                gl.enable(gl.DEPTH_TEST);
                gl.disable(gl.BLEND);
            }

        }
    };

    return Object.freeze({
        draw, update, init: function() {
        }
    });
}