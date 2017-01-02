function pulseGunProcess(sb, pubsub, helpers) {
    'use strict';

    var gl = sb.getGL();
    var material = sb.getMaterial();
    //var particleProgram3d = material.useShader('particle3d');
    var program = material.useShader('bullet');

    //var lastTime = 0;
    var camera = sb.getCamera();
    // var particleProgram3d = sm.init('particle3d');
    var em = sb.getEntityManager();
    var collisions = [];
    var positions = [];
    var size = 20;
    var quadcount = 0;
    var indices=[];
    var textures =[];

    //    var bullet;
    var init = function() {

    };

    var shootBullet = function(ammo, shooter) {

        var timeNow = new Date().getTime();

        var bulletsAmount = ammo.getBulletsAmount();
        var bullets = ammo.getBullets();
        var bulletShot = ammo.getBulletShot();
        var bulletReloadSpeed = ammo.getBulletReloadSpeed();

        if (timeNow - bulletReloadSpeed > bulletShot) {

            for (var i = 0; i < bulletsAmount; i++) {

                if (bullets[i].getVisible() === 0) {
                    //sb.getAudio().playSound(6, 0);
                    ammo.setBulletShot(timeNow);
                    bullets[i].setVisible(1);
                    bullets[i].setBirthTime(timeNow);
                    bullets[i].setAngle(shooter.getAngleY());
                    bullets[i].setXPos(shooter.getXPos());
                    bullets[i].setZPos(shooter.getZPos());
                    break;
                }
            }
        }
    };

    var getCollisions = function() {
        collisions.length = 0;
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.CollisionComponent) {
                //object is dead. no need to check for collisions

                if (le.components.HealthComponent && le.components.HealthComponent.getAmount() < 1) {
                    continue;
                }

                var c = le.components.CollisionComponent;
                //var r = le.components.RenderableComponent;

                c.setEntity(le);

                collisions.push(c);

            }
        }
    };

    var checkCollision = function(pgc) {

        var bullets = pgc.getBullets();
        for (var i = 0; i < bullets.length; i++) {
            if (bullets[i].getVisible() !== 1) {
                continue;
            }
            for (var j = 0; j < collisions.length; j++) {
                if (j !== i &&
                    bullets[i].getXPos() >= collisions[j].getXPos() - collisions[j].getXWidth() &&
                    bullets[i].getXPos() <= collisions[j].getXPos() + collisions[j].getXWidth() &&
                    bullets[i].getZPos() >= collisions[j].getZPos() - collisions[j].getZWidth() &&
                    bullets[i].getZPos() <= collisions[j].getZPos() + collisions[j].getZWidth() &&
                    collisions[j].getGroup() === 'enemy' && bullets[i].getVisible() === 1) {

                    pubsub.publish('bulletcollision', collisions[j]);

                }
            }
        }

    };

    var createShot = function(le) {

        if (le.components.GunComponent &&
            le.components.GunComponent.getShooting() === 1 &&
            le.components.GunComponent.getActiveWeapon() === 1 &&
            le.components.HealthComponent.getAmount() > 0 &&
            le.components.PulseGunComponent) {

            shootBullet(le.components.PulseGunComponent, le.components.RenderableComponent);
        }

    };

    var moveBullets = function(pgc, deltatime) {
        var timeNow = new Date().getTime();

        var bullets = pgc.getBullets();
        var bulletsAmount = pgc.getBulletsAmount();
        for (var i = 0; i < bulletsAmount; i++) {

            if (timeNow - bullets[i].getDeathtime() > bullets[i].getBirthTime()) {
                bullets[i].setVisible(0);
            }
            else {

                var posX = bullets[i].getSpeed() * ( deltatime / 1000.0 ) * Math.cos(bullets[i].getAngle());
                var posZ = bullets[i].getSpeed() * ( deltatime / 1000.0 ) * Math.sin(bullets[i].getAngle());

                bullets[i].setXPos(bullets[i].getXPos() + posX);
                bullets[i].setZPos(bullets[i].getZPos() - posZ);
            }

        }
    };

    var update = function(deltatime) {

        getCollisions();

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            createShot(le);

            if (le.components.PulseGunComponent) {
                var pgc = le.components.PulseGunComponent;
                checkCollision(pgc);

                moveBullets(pgc, deltatime);
            }
        }

    };

    var addQuad = function (x, y, z) {


        var offset = quadcount * 18;
        // triangle first
        positions[offset+0] = x+size;
        positions[offset+1] = y+(-size);
        positions[offset+2] = z+0.0;

        positions[offset+3] = x+size;
        positions[offset+4] = y+size;
        positions[offset+5] = z+0.000001;

        positions[offset+6] = x+(-size);
        positions[offset+7] = y+(-size);
        positions[offset+8] = z+(-0.000000);

        positions[offset+9] = x+size;
        positions[offset+10] = y+size;
        positions[offset+11] = z+0.000001;

        positions[offset+12] = x+(-size);
        positions[offset+13] = y+size;
        positions[offset+14] = z+(-0.000000);

        positions[offset+15] =  x+(-size);
        positions[offset+16] = y+(-size);
        positions[offset+17] = z+(-0.000000);

        //indices.push(0,1,2,1,4,2);


        textures.push(1.0,0.0,
                1.0,1.0,
                0.0,0.0,

                1.0,1.0,
                0.0,1.0,
                0.0,0.0);



        quadcount++;


        //return base;
    };

    var draw = function(le) {

        //for (var e = 0; e < em.entities.length; e++) {
        //   var le = em.entities[e];

        if (le.components.PulseGunComponent) {
            gl.disable(gl.DEPTH_TEST);
            gl.enable(gl.BLEND);

            //var pc = le.components.PhotonTorpedoComponent;
            var ptc = le.components.PulseGunComponent;



            var bullets = ptc.getBullets();
            quadcount = 0;
            indices.length = 0;

            positions.length = 0;
            textures.length =0;
            for (var i = 0; i < ptc.getBulletsAmount(); i++) {

                if (bullets[i].getVisible() !== 1) {
                    continue;
                }

                addQuad(bullets[i].getXPos(),bullets[i].getYPos(),bullets[i].getZPos());


            }

            if (positions.length > 0) {


                //console.log(positions.length);
            //if()
                material.setProgram(program);

                camera.mvPushMatrix();
                var mvMatrix = camera.getMVMatrix();
                //var sprite = ptc.getSprite();

                //vertBuffer = ;
                gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
                gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(positions), gl.STATIC_DRAW);
                gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 3*4, 0);




                //gl.bindBuffer(gl.ARRAY_BUFFER, ptc.getPointStartPositionBuffer());
                //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0,0.0,0.0]), gl.STATIC_DRAW);
                //gl.vertexAttribPointer(program.aPosition, 3, gl.FLOAT, false, 0, 0);



                gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
                gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(textures), gl.STATIC_DRAW);
                //gl.bindBuffer(gl.ARRAY_BUFFER, ptc.getMesh().getTexturePositionBuffer());
                gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 2*4, 0);


                material.useTexture(ptc.getMesh().getName());


                //gl.uniform3fv(program.uPositions, false, positions);


                gl.uniformMatrix4fv(program.uPMatrix, false, camera.getPMatrix());
                gl.uniformMatrix4fv(program.uMVMatrix, false, mvMatrix);




                //var normalMatrix = mat3.create();
                //mat4.toInverseMat3(mvMatrix, normalMatrix);
                //mat3.transpose(normalMatrix);
                //gl.uniformMatrix3fv(program.uNMatrix, false, normalMatrix);


                //console.log(ptc.getMesh().getIndexPositionBuffer().numItems);
                //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ptc.getMesh().getIndexPositionBuffer());

                //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
                //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

                //console.log(quadcount);
                //console.log(positions.length);

                //gl.drawArrays(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
                gl.drawArrays(gl.TRIANGLES, 0, positions.length / 3);
                //gl.drawElements(gl.TRIANGLES, indices.length , gl.UNSIGNED_SHORT, 0);
                camera.addDrawCall();

                camera.mvPopMatrix();

            }

            gl.enable(gl.DEPTH_TEST);
            gl.disable(gl.BLEND);

        }

        //}

    };

    return Object.freeze({update, draw, init});
}