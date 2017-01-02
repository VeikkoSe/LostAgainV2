function cameraControllerProcess(sb, pubsub, staticCamera) {
    'use strict';

    var camera = sb.getCamera();
    var em = sb.getEntityManager();
    var mouseX = 0;
    //var mouseY = 0;
    //var degreeAlt = Math.PI / 180;
    var tmpX = 0;
    var tmpY = 0;
    var tmpZ = 0;

    var init = function() {
        var mousedown = 0;

        pubsub.subscribe('mousedown', function(name, e) {
            mousedown = 1;
        });

        pubsub.subscribe('mouseup', function(name, e) {
            mousedown = 0;
        });

        if (!staticCamera) {
            pubsub.subscribe('mousemove', function(name, e) {

                if (mousedown === 1) {

                    if (mouseX - e.clientX > 0) {
                        camera.setYRotation('1');
                    }
                    else {
                        camera.setYRotation('-1');
                    }
                }
                mouseX = e.clientX;

            });

            pubsub.subscribe('mousewheel', function(name, e) {
                if (e === -1) {
                    sb.getCamera().setDistance('10');
                }
                else {
                    sb.getCamera().setDistance('-10');
                }
            });
        }
    };

    var update = function(deltatime) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.CameraTargetComponent && le.components.RenderableComponent) {

                var re = le.components.RenderableComponent;

                var mvMatrix = camera.getMVMatrix();

                var x = camera.getDistance() * Math.cos(camera.getYRotation()) + re.getXPos();
                var z = camera.getDistance() * Math.sin(camera.getYRotation()) + re.getZPos();
                //
                var zComponent = re.getZPos() - camera.getZPos();
                var xComponent = re.getXPos() - camera.getXPos();
                var y = Math.sqrt(zComponent * zComponent + xComponent * xComponent) * Math.tan(camera.getPitch());

                camera.setXPos(x);
                camera.setYPos(y);
                camera.setZPos(z);



                //mat4.lookAt([camera.getXPos(), camera.getYPos(), camera.getZPos()], [re.getXPos(), 0, re.getZPos()], [0, 1, 0], mvMatrix);
                mat4.lookAt([0, 150, 150], [0, 0, 0], [0, 1, 0], mvMatrix);

                if (camera.getXPos() !== tmpX || camera.getYPos() !== tmpY || camera.getZPos() !== tmpZ) {
                    // console.log(tmpX,tmpY,tmpZ);
                    tmpX = camera.getXPos();
                    tmpY = camera.getYPos();
                    tmpZ = camera.getZPos();
                }
            }

        }
    };
    return Object.freeze({
        update, draw: function() {
        },
        init
    });
}
