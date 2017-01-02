function chaseProcess(sb) {
    'use strict';

    //var routeDone = false;

    //var camera = sb.getCamera();
    var em = sb.getEntityManager();

    var update = function(deltatime, timeFromStart) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.RenderableComponent &&
                le.components.MeshComponent &&
                le.components.ChaseComponent) {

                var ship = em.getEntityByName('ship');
                //if normal ship is dead we target the mothership
                if (!ship || ship.components.HealthComponent.amount < 1) {
                    ship = em.getEntityByName('mothership');
                }
                var re = le.components.RenderableComponent;

                var ch = le.components.ChaseComponent;
                var shiprc = ship.components.RenderableComponent;

                var dirX = shiprc.getXPos() - re.getXPos();
                var dirZ = shiprc.getZPos() - re.getZPos();

                //Normalize this vector. That means divide the terms by
                // the magnitude (the hypotenuse) of the vector.
                var hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);

                dirX /= hyp;
                dirZ /= hyp;

                //Add that vector to the enemy's position,
                // multiplied by the speed you want the enemy to move:
                re.setXPos(re.getXPos() + (dirX * ch.getSpeed() * (deltatime / 1000)));
                re.setZPos(re.getZPos() + (dirZ * ch.getSpeed() * (deltatime / 1000)));

            }
        }
    };
    return Object.freeze({
        update, draw: function() {
        }, init: function() {
        }
    });

}