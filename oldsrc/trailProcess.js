function trailProcess(sb, helpers) {
    'use strict';

    //constructor() {
    //this.exhaustAmount = 200;
    //this.exhaustInterval = 50;
    //this.exhaustTrail = [];
    var material = sb.getMaterial();
    var program = material.useShader('trail');
    var em = sb.getEntityManager();
    //var lastTime = 0;
    //var exhaustProgram = sm.init('exhaust');
    //var elapsedTotal = 0;
    var gl = sb.getGL();

    var vertexPositionBuffer = gl.createBuffer();
    var texturePositionBuffer = gl.createBuffer();

    var camera = sb.getCamera();

    var init = function() {

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, texturePositionBuffer);
    };

    var updateTrail = function(trailComponent, renderableComponent) {

        var re = renderableComponent;
        var ec = trailComponent;

        var posX = re.getXPos();
        var posZ = re.getZPos();

        var unitX = Math.cos(re.getAngleY());
        var unitZ = Math.sin(re.getAngleY());

        var rendX = (posX - (unitX * ec.getOffSetSideFromCenter())) - ((-1 * unitZ) * ec.getOffSetFromCenter());
        var rendZ = (posZ + (unitZ * ec.getOffSetSideFromCenter())) + (unitX * ec.getOffSetFromCenter());

        var flow = ec.getFlow();
        var square = ec.getSquare();
        var points = ec.getPoints();
        var textureCoordinates = ec.getTexturecoordinates();

        //drop from the end of array
        if ((flow.length / 3) >= ec.getLength()) {
            flow.shift();
            flow.shift();
            flow.shift();
            for (var i = 0; i < 18; i++) {
                points.shift();
            }

            for (i = 0; i < 12; i++) {
                textureCoordinates.shift();
            }
        }

        if (flow.length === 0) {

            flow.push(rendX);
            flow.push(0);
            flow.push(rendZ);

        }

        var xd = rendX - flow[flow.length - 3];
        var zd = rendZ - flow[flow.length - 1];
        var xdh = xd / 2;
        var zdh = zd / 2;
        var distance = Math.sqrt(xd * xd + zd * zd);

        //when to create new
        if (distance > ec.getWidth()) {

            if (flow.length > 3) {

                //quarter of a turn. That means if blue = (x, y), red = (-y, x)

                var i = 0;
                //first triangle
                square[i++] = points[points.length - 6];
                square[i++] = 0;
                square[i++] = points[points.length - 4];

                square[i++] = zdh + rendX;
                square[i++] = 0;
                square[i++] = -1 * xdh + rendZ;

                square[i++] = points[points.length - 3];
                square[i++] = 0;
                square[i++] = points[points.length - 1];

                //second triangle
                square[i++] = points[points.length - 6];
                square[i++] = 0;
                square[i++] = points[points.length - 4];

                square[i++] = -1 * zdh + rendX;
                square[i++] = 0;
                square[i++] = xdh + rendZ;

                square[i++] = zdh + rendX;
                square[i++] = 0;
                square[i++] = -1 * xdh + rendZ;

                for (var i = 0; i < 18; i++) {
                    points.push(square[i]);
                }

                flow.push(rendX);
                flow.push(0);
                flow.push(rendZ);

            }
            else {
                //first triangle
                points.push(-1 * zdh + flow[flow.length - 3]);
                points.push(0);
                points.push(xdh + flow[flow.length - 1]);

                points.push(zdh + rendX);
                points.push(0);
                points.push(-1 * xdh + rendZ);

                points.push(zdh + flow[flow.length - 3]);
                points.push(0);
                points.push(-1 * xdh + flow[flow.length - 1]);

                //second triangle
                points.push(-1 * zdh + flow[flow.length - 3]);
                points.push(0);
                points.push(xdh + flow[flow.length - 1]);

                points.push(-1 * zdh + rendX);
                points.push(0);
                points.push(xdh + rendZ);

                points.push(zdh + rendX);
                points.push(0);
                points.push(-1 * xdh + rendZ);

                flow.push(rendX);
                flow.push(0);
                flow.push(rendZ);

            }

            textureCoordinates.push(1);
            textureCoordinates.push(0);

            textureCoordinates.push(0);
            textureCoordinates.push(1);

            textureCoordinates.push(0);
            textureCoordinates.push(0);

            textureCoordinates.push(1);
            textureCoordinates.push(0);

            textureCoordinates.push(1);
            textureCoordinates.push(1);

            textureCoordinates.push(0);
            textureCoordinates.push(1);

        }

        ec.setFlow(flow);
        ec.setTexturecoordinates(textureCoordinates);
        ec.setPoints(points);
        ec.setSquare(square);

    };

    var update = function(elapsed, totalElapsed) {

        //TODO: Currently fixes the trail stain at start of the game
        if (totalElapsed < 1000) {
            return;
        }
        //var timeNow = new Date().getTime();

        // var elapsed = timeNow - lastTime;
        //elapsedTotal += elapsed;

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.TrailComponent) {
                updateTrail(le.components.TrailComponent, le.components.RenderableComponent);

            }

            if (le.components.MultiTrailComponent) {
                for (var i = 0; i < le.components.MultiTrailComponent.getTrailComponents().length; i++) {
                    updateTrail(le.components.MultiTrailComponent.getTrailComponents()[i], le.components.RenderableComponent);
                }
            }

        }

    };

    var drawTrail = function(trailComponent) {

        var ec = trailComponent;
        //for (var i = 0; i < this.exhaustAmount; i++) {

        if (ec.getPoints().length > 8) {

            material.setProgram(program);
            //material.useTexture('image');
            //gl.enable(gl.BLEND);
            //gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            //gl.disable(gl.DEPTH_TEST);

            gl.bindBuffer(gl.ARRAY_BUFFER, texturePositionBuffer);
            gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ec.getTexturecoordinates()), gl.STATIC_DRAW);

            camera.mvPushMatrix();
            var mvmatrix = camera.getMVMatrix();

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ec.getPoints()), gl.STATIC_DRAW);

            gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

            gl.uniformMatrix4fv(program.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(program.uMVMatrix, false, mvmatrix);
            //gl.drawArrays(gl.LINE_STRIP, 0, ec.points.length/3);
            gl.drawArrays(gl.TRIANGLES, 0, ec.getPoints().length / 3);

            camera.addDrawCall();
            camera.mvPopMatrix();

            //gl.enable(gl.DEPTH_TEST);
            //gl.disable(gl.BLEND);

        }
    };

    var draw = function(le) {

        if ((le.components.TrailComponent || le.components.MultiTrailComponent) && le.components.HealthComponent.getAmount() > 0) {

            if (le.components.TrailComponent) {
                drawTrail(le.components.TrailComponent);
            }
            if (le.components.MultiTrailComponent) {

                for (var i = 0; i < le.components.MultiTrailComponent.getTrailComponents().length; i++) {
                    drawTrail(le.components.MultiTrailComponent.getTrailComponents()[i]);
                }
            }

        }

    };

    return Object.freeze({
        update, draw, init
    });

    //}

}