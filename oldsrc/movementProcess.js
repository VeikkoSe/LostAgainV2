function movementProcess(sb, pubsub, helpers) {
    'use strict';

    var em = sb.getEntityManager();


    var setMovingAngle= function(rc,re,deltatime) {
        //newX and newZ are false by default so
        // we don't move anywhere if newpos is not set
        if (!rc.getRouteDone()) {


            //Create a vector in the direction

            var dirX =  rc.getRouteEndXpos()-re.getXPos();
            var dirZ =  rc.getRouteEndZpos()-re.getZPos();

            //
            //dirX = dirX*-1;

            //Normalize this vector.
            // That means divide the terms by the magnitude
            // (the hypotenuse) of the vector.
            var distance = Math.sqrt(dirX * dirX + dirZ * dirZ);



            var angR = Math.atan2(-1*dirZ,dirX);


            //if(angR<0) {
             //   angR = (-1 * angR) + Math.PI;
            //}
            //console.log(angR);
            //var deg = (angR / Math.PI * 180) - 90 + (angR > 0 ? 0 : 360);
            //var change = angR;//-Math.PI/4 + (angR > 0 ? 0 : Math.PI);

            //theta_rad = atan2(y,x);
            //var change = (angR/Math.PI*180) + (angR > 0 ? 0 : 360);


            //var deg = 0;

            dirX /= distance;
            dirZ /= distance;
            //Add that vector to the enemy's position,
            // multiplied by the speed you want the enemy to move:
            re.setXPos(re.getXPos() + (dirX * rc.getSpeed() * (deltatime / 1000)));
            re.setZPos(re.getZPos() + (dirZ * rc.getSpeed() * (deltatime / 1000)));

            re.setAngleY(angR);

        }
    };


    function railsMovement(le,deltatime) {


        //Rails movement
        if (le.components.RailsMovementComponent &&
            le.components.RenderableComponent) {

            if (le.components.HealthComponent.getAmount() < 1) {
                return;
            }

            var rc = le.components.RailsMovementComponent;

            var re = le.components.RenderableComponent;

            if ((helpers.isNumeric(rc.getRouteEndXpos()) &&
                helpers.isNumeric(rc.getRouteEndZpos())) &&
                (helpers.isCloseOrbit(re.getXPos(), rc.getRouteEndXpos()) &&
                helpers.isCloseOrbit(re.getZPos(), rc.getRouteEndZpos()))) {
                rc.setRouteDone(true);
                pubsub.publish('routeDone');

            }

            setMovingAngle(rc,re,deltatime);

        }



    }

    var update = function(deltatime) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            railsMovement(le,deltatime);

            //Momentum movement
            if (le.components.MomentumComponent) {

                le.components.MomentumComponent.setRotatingLeft(0);
                le.components.MomentumComponent.setRotatingRight(0);
                le.components.MomentumComponent.setCurrentlyAccelerating(0);
                le.components.GunComponent.setShooting(0);

                //up arrow
                if (sb.getActionMapper().getCurrentlyPressedKeys()[38]) {
                    le.components.MomentumComponent.setCurrentlyAccelerating(1);
                }
                //left
                if (sb.getActionMapper().getCurrentlyPressedKeys()[37]) {
                    le.components.MomentumComponent.setRotatingLeft(1);
                }
                //right
                if (sb.getActionMapper().getCurrentlyPressedKeys()[39]) {
                    le.components.MomentumComponent.setRotatingRight(1);
                }
                //spacebar
                if (sb.getActionMapper().getCurrentlyPressedKeys()[32]) {
                    le.components.GunComponent.setShooting(1);
                }
            }
        }

        //Momentum movement
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.MomentumComponent && le.components.RenderableComponent) {

                var mm = le.components.MomentumComponent;
                var re = le.components.RenderableComponent;

                if (mm.getCurrentlyAccelerating() === 1) {

                    var dirVectorX = Math.cos(re.getAngleY());
                    var dirVectorZ = Math.sin(re.getAngleY());

                    var tx = mm.getVelocityX();
                    var tz = mm.getVelocityZ();

                    tx += mm.getAccelerationAmount() * dirVectorX * (deltatime / 1000);
                    tz += mm.getAccelerationAmount() * dirVectorZ * (deltatime / 1000);
                    var posX = (tx < 0) ? tx * -1 : tx;
                    var posZ = (tz < 0) ? tz * -1 : tz;

                    //we cant go past top speed on x or z axel but allow deasselerating
                    if (posX < mm.getSpeed() && posZ < mm.getSpeed()) {

                        mm.setVelocityX(tx);
                        mm.setVelocityZ(tz);
                    }
                }
                if (mm.getRotatingRight() === 1) {

                    if (re.getAngleY() >= 2*Math.PI) {
                        re.setAngleY(0);
                    }
                    if (re.getAngleY() < 0) {
                        re.setAngleY(2*Math.PI);
                    }

                    re.setAngleY(re.getAngleY() - mm.getTurnSpeed() * (deltatime / 1000));
                }
                if (mm.getRotatingLeft() === 1) {

                    if (re.getAngleY() >= 2*Math.PI) {
                        re.setAngleY(0);
                    }

                    if (re.getAngleY() < 0) {
                        re.setAngleY(2*Math.PI);
                    }

                    re.setAngleY(re.getAngleY() + mm.getTurnSpeed() * (deltatime / 1000));
                    //console.log(re.getAngleY() + mm.getTurnSpeed() * (deltatime / 1000));
                }



                re.setXPos(re.getXPos() + mm.getVelocityX() * (deltatime / 1000));
                re.setZPos(re.getZPos() - mm.getVelocityZ() * (deltatime / 1000));
            }

        }
    };

    var init = function() {

    };

    return Object.freeze({
        update, draw: function() {
        }, init
    });

}