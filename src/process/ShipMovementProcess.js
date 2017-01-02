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
    //
    //console.log(ent);
    //var entities = ent;
    var le = ent;

            //Momentum movement
            if (le.components.ShipMovementComponent && le.components.RenderableComponent) {

                var sm = le.components.ShipMovementComponent;
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
                //spacebar
                if (input.keyboard[32]) {
                    //le.components.GunComponent.setShooting(1);
                }
            //}

            //if (le.components.ShipMovementComponent ) {

                //var mm = le.components.ShipMovementComponent;
                var re = le.components.RenderableComponent;

                if (sm.currentlyAccelerating === 1) {

                    var dirVectorX = Math.cos(re.angleY);
                    var dirVectorZ = Math.sin(re.angleY);

                    var tx = sm.velocityX;
                    var tz = sm.velocityZ;

                    tx += sm.acceleration * dirVectorX;
                    tz += sm.acceleration * dirVectorZ;

                    //console.log(tx);
                    //console.log(tz);

                    var posX = (tx < 0) ? tx * -1 : tx;
                    var posZ = (tz < 0) ? tz * -1 : tz;



                    //we cant go past top speed on x or z axel but allow deasselerating
                    if (posX < sm.maxSpeed && posZ < sm.maxSpeed) {

                        sm.velocityX = tx;
                        sm.velocityZ = tz;
                    }
                }


                if (sm.rotatingRight === 1) {

                    if (re.angleY >= 2*Math.PI) {
                        re.angleY = 0;
                    }
                    if (re.angleY < 0) {
                        re.angleY =2*Math.PI;
                    }

                    re.angleY = re.angleY - sm.turnSpeed * (deltatime / 1000);
                }
                if (sm.rotatingLeft === 1) {

                    if (re.angleY >= 2*Math.PI) {
                        re.angleY = 0;
                    }

                    if (re.angleY < 0) {
                        re.angleY = 2*Math.PI;
                    }

                    re.angleY = re.angleY + sm.turnSpeed * (deltatime / 1000);

                }


                //console.log(sm.velocityX);
                re.xPos += sm.velocityX * (deltatime / 1000);
                re.zPos -= sm.velocityZ * (deltatime / 1000);

                //console.log(re.xPos,re.zPos);
            }

        //}
};

