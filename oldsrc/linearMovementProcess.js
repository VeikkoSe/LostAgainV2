function linearMovementProcess(sb) {
    'use strict';

    var em = sb.getEntityManager();

    var isClose = function(currentCoord, newCoord) {

        return (currentCoord < newCoord + 0.1 && currentCoord > newCoord - 0.1);

    };

    var update = function(deltatime) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            //for (var e = 0; e < foundMoveEntities.length; e++) {

            if (le.components.Selectable && le.components.Renderable && le.components.Movable) {

                var se = le.components.Selectable;
                var re = le.components.RenderableComponent;
                var me = le.components.Movable;

                if (me && se.selected && camera.clickPosition) {

                    me.newXpos = camera.clickPosition[0];
                    me.newYpos = camera.clickPosition[1];
                    me.newZpos = camera.clickPosition[2];

                }

                //newX and newZ are false by default so we don't move anywhere if newpos is not set
                if ((isNumeric(le.components.Movable.newXpos) && isNumeric(le.components.Movable.newZpos)) &&
                    (!isClose(re.xPos, le.components.Movable.newXpos) || !isClose(re.zPos, le.components.Movable.newZpos))) {

                    //Create a vector in the direction

                    var dirX = me.newXpos - re.xPos;
                    var dirZ = me.newZpos - re.zPos;

                    //Normalize this vector. That means divide the terms by the magnitude (the hypotenuse) of the vector.
                    var hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);

                    var angR = Math.atan2(dirZ,dirX);
                    //var deg = (angR / Math.PI * 180) + (angR > 0 ? 0 : 360);
                    //var change = angR + (angR > 0 ? 0 : Math.PI);

                    dirX /= hyp;
                    dirZ /= hyp;

                    //if(ang<0)
                    //ang = ang+360.0;

                    //Add that vector to the enemy's position, multiplied by the speed you want the enemy to move:
                    re.xPos += dirX * me.speed * (deltatime / 1000);
                    re.zPos += dirZ * me.speed * (deltatime / 1000);
                    re.yPos = 0;

                    re.angleY = angR;

                }

            }
        }
    };

    return Object.freeze({
        update,
        draw: function() {
        },
        init: function() {
        }
    });
}