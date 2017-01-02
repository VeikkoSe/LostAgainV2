function explosionProcess(sb, pubsub) {
    'use strict';

    var gl = sb.getGL();
    //var am = sb.getAssetManager();
    var material = sb.getMaterial();
    var particleProgram = material.useShader('lifetimeparticle');
    var explosions = [];
    var explosionArrayLength = 10;

    var camera = sb.getCamera();

    //var sprite;

    var init = function() {

        for (var i = 0; i < explosionArrayLength; i++) {
            var particle = asteroidExplosion(sb);
            particle.init();
            particle.setVisible(0);
            explosions[i] = particle;
        }

        pubsub.subscribe('explosion', function(name, entity) {

            createNewMediumExplosion(entity.getXPos(), entity.getZPos());

        });

        pubsub.subscribe('smallexplosion', function(name, entity) {

            createNewSmallExplosion(entity.getXPos(), entity.getZPos());

        });

        pubsub.subscribe('bigexplosion', function(name, entity) {

            createNewBigExplosion(entity.getXPos(), entity.getZPos());

        });

    };

    var update = function(elapsed) {

        for (var i = 0; i < explosionArrayLength; i++) {
            var explosion = explosions[i];
            var liveTime = explosion.getTime();

            if (explosion.getTime() > 3) {
                explosion.setVisible(0);
                //explosions.splice(i, 1);
                //first ones have to have bigger time
                //we can replace splice with shift
                //explosions.shift();
                //explosionsLength--;
            }
            else {
                explosion.setTime(liveTime + elapsed / 3000);
            }
        }

    };

    var createNewSmallExplosion = function(x, z) {
        //slow
        sb.getAudio().playSound(9, 0);
        var explosion;
        for (var i = 0; i < explosionArrayLength; i++) {
            explosion = explosions[i];
            if (explosion.getVisible() === 0) {
                explosion.setXPos(x);
                explosion.setYPos(0);
                explosion.setZPos(z);
                explosion.setTime(0);
                explosion.setVisible(1);
                break;
            }
        }
        //var particle = asteroidExplosion(sb, x, 0, z, 'small');
        //particle.init();

        //explosions.push(particle);

    };

    var createNewMediumExplosion = function(x, z) {
        //slow
        // sb.getAudio().playSound(9,0);
        //var particle = asteroidExplosion(sb, x, 0, z, 'medium');
        //particle.init();
        /*
         sb.getAudio().playSound(9,0);
         var explosion;
         for (var i = 0; i < explosionArrayLength; i++) {
         explosion = explosions[i];
         if(explosion.getVisible()===0) {
         explosion.setXPos(0);
         explosion.setYPos(0);
         explosion.setZPos(0);
         explosion.setTime(0);
         explosion.setVisible(1);
         }
         }
         */
        //explosions.push(particle);

        createNewSmallExplosion(x, z);

    };

    var createNewBigExplosion = function(x, z) {

        createNewSmallExplosion(x, z);
        //sb.getAudio().playSound(9,0);
        //var particle = asteroidExplosion(sb, x, 0, z, 'large');
        //particle.init();

        /*sb.getAudio().playSound(9,0);
         var explosion;
         for (var i = 0; i < explosionArrayLength; i++) {
         explosion = explosions[i];
         if(explosion.getVisible()===0) {
         explosion.setXPos(0);
         explosion.setYPos(0);
         explosion.setZPos(0);
         explosion.setTime(0);
         explosion.setVisible(1);
         }
         }
         */

        //explosions.push(particle);

    };

    var draw = function() {

        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);

        material.setProgram(particleProgram);
        var mvMatrix = camera.getMVMatrix();

        //material.useTexture('image');

        // TODO TOO MENY DRAWCALLS, SOME BUG

        //console.log('drawCallsE1: '+ camera.getDrawCalls());
        for (var i = 0; i < explosionArrayLength; i++) {
            var explosion = explosions[i];

            if (explosion.getVisible() === 0) {

                continue;
            }
            //console.log(explosion.getVisible());
            camera.mvPushMatrix();

            gl.bindBuffer(gl.ARRAY_BUFFER, explosion.getPointLifetimeBuffer());
            gl.vertexAttribPointer(particleProgram.pointLifetimeAttribute, explosion.getPointLifetimeBuffer().itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, explosion.getPointStartPositionsBuffer());
            gl.vertexAttribPointer(particleProgram.pointStartPositionAttribute, explosion.getPointStartPositionsBuffer().itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, explosion.getPointEndPositionsBuffer());
            gl.vertexAttribPointer(particleProgram.pointEndPositionAttribute, explosion.getPointEndPositionsBuffer().itemSize, gl.FLOAT, false, 0, 0);

            gl.uniformMatrix4fv(particleProgram.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(particleProgram.uMVMatrix, false, mvMatrix);

            gl.uniform3f(particleProgram.centerPositionUniform, explosion.getXPos(), explosion.getYPos(), explosion.getZPos());

            gl.uniform4f(particleProgram.colorUniform, 1, 0.5, 0.1, 0.7);
            gl.uniform1f(particleProgram.timeUniform, explosion.getTime());

            gl.drawArrays(gl.POINTS, 0, explosion.getPointLifetimeBuffer().numItems);

            camera.addDrawCall();
            camera.mvPopMatrix();

        }

        gl.enable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);

    };
    return Object.freeze({update, draw, init});
}




















