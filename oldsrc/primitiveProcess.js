function primitiveProcess(sb) {
    'use strict';

    var gl = sb.getGL();
    var vertexPositionBuffer = gl.createBuffer();

    var material = sb.getMaterial();
    var program = material.useShader('simplest');

    var camera = sb.getCamera();

    var draw = function(le) {

        //for (var e = 0; e < em.entities.length; e++) {
        //  var le = em.entities[e];

        if (le.components.PrimitiveComponent && le.components.RenderableComponent) {

            material.setProgram(program);
            //var re = le.components.Renderable;
            //var p = {x: re.xPos, y: re.yPos, z: re.zPos};

            //this.points = this.circleXY(p, ;

            camera.mvPushMatrix();
            gl.uniformMatrix4fv(program.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(program.uMVMatrix, false, camera.getMVMatrix());
            var c = le.components.PrimitiveComponent.color;

            gl.uniform4f(program.uColor, c[0], c[1], c[2], 1.0);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(le.components.PrimitiveComponent.points), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(program.aVertexPosition);
            gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.LINES, 0, le.components.PrimitiveComponent.points.length / 3);
            camera.addDrawCall();

            camera.mvPopMatrix();
        }

        // }
    };

    return Object.freeze({
        update: function() {
        }, draw, init: function() {
        }
    });

}