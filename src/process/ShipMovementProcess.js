/*global GAME */
GAME.ShipMovementProcess = function() {
    'use strict';

    //this._em = em;

};

GAME.ShipMovementProcess.prototype.draw = function() {
    'use strict';

};
GAME.ShipMovementProcess.prototype.update = function(input,deltatime,ent) {
    'use strict';

    var le = ent;

    //Momentum movement
    if (le.components.ShipMovementComponent && le.components.PositionComponent && le.components.RotationComponent) {

        var sm = le.components.ShipMovementComponent;
        var pc = le.components.PositionComponent;
        var rc = le.components.RotationComponent;

        sm.rotatingLeft =0;
        sm.rotatingRight =0;
        sm.currentlyAccelerating = 0;
        //le.components.GunComponent.setShooting(0);

        //up arrow
        if (input.keyboard[38]) {
            sm.currentlyAccelerating = 1;
        }
        //left
        if (input.keyboard[37]) {
            sm.rotatingLeft = 1;
        }
        //right
        if (input.keyboard[39]) {
            sm.rotatingRight = 1;
        }


        if (sm.currentlyAccelerating === 1) {

            var dirVectorX = Math.cos(rc.angleY);
            var dirVectorZ = Math.sin(rc.angleY);

            var tx = sm.velocityX;
            var tz = sm.velocityZ;

            tx += sm.acceleration * dirVectorX;
            tz += sm.acceleration * dirVectorZ;

            var posX = (tx < 0) ? tx * -1 : tx;
            var posZ = (tz < 0) ? tz * -1 : tz;


            //we cant go past top speed on x or z axel but allow deasselerating
            if (posX < sm.maxSpeed && posZ < sm.maxSpeed) {

                sm.velocityX = tx;
                sm.velocityZ = tz;
            }
        }

        if (sm.rotatingRight === 1) {

            if (rc.angleY >= 2*Math.PI) {
                rc.angleY = 0;
            }
            if (rc.angleY < 0) {
                rc.angleY =2*Math.PI;
            }

            rc.angleY = rc.angleY - sm.turnSpeed * (deltatime / 1000);
        }
        if (sm.rotatingLeft === 1) {

            if (rc.angleY >= 2*Math.PI) {
                rc.angleY = 0;
            }

            if (rc.angleY < 0) {
                rc.angleY = 2*Math.PI;
            }

            rc.angleY = rc.angleY + sm.turnSpeed * (deltatime / 1000);

        }

        pc.xPos += sm.velocityX * (deltatime / 1000);
        pc.zPos -= sm.velocityZ * (deltatime / 1000);

    }

};

