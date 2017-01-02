function postProcess(sb) {
    'use strict';

    //constructor() {
    var gl = sb.getGL();

    var camera = sb.getCamera();

    //var lastTime = 0;
    //var elapsedTotal = 0;
    //var x = 0;
    //var framebuffer = null;
    //var renderbuffer = null;

    var material = sb.getMaterial();
    var program = material.useShader('screenquad');
    //var blurHorizontal = material.useShader('blurhorizontal');

    var texture = null;
    var texture2 = null;
    var texture3 = null;
    var fb;
    var verts;
    var vertBuffer = gl.createBuffer();

    var rttFramebuffer;
    var rttTexture;
    var screenQuadVBO = gl.createBuffer();

    //var basebuffer = gl.createFramebuffer();
    //var framebuffer = gl.createFramebuffer();

    var init = function() {





        // fb = gl.createFramebuffer();

        //   initTextureFramebuffer();

        /*
         var framebuffer2 = gl.createFramebuffer();

         var texCoordBuffer = gl.createBuffer();



         var points = [];


         var vertexPositionBuffer = gl.createBuffer();
         */
        /*
         texture = createTexture();

         //gl.texImage2D(
         //    gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height, 0,
         //    gl.RGBA, gl.UNSIGNED_BYTE, null);

         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sb.getResolutionWidth(), sb.getResolutionHeight(), 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

         texture2 = createTexture();

         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sb.getResolutionWidth(), sb.getResolutionHeight(), 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
         */
        // verts = setRectangle(0, 0, 500, 500);
        /*



         var fbo = gl.createFramebuffer();
         gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
         gl.framebufferTexture2D(
         gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
         */

        // gl.bindFramebuffer(gl.FRAMEBUFFER, basebuffer);
        // gl.enable(gl.DEPTH_TEST);

        //points.push(-50, 0, 0);
        //points.push(20, 0, 0);

        //gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

        //texture = initTextureFramebuffer(framebuffer);
        // texture2 = initTextureFramebuffer(framebuffer2);
        // texture3 = initTextureFramebuffer(basebuffer);

        /*gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
         1.0, 1.0,
         0.0, 1.0,
         0.0, 0.0,
         1.0, 1.0,
         0.0, 0.0,
         1.0, 0.0]), gl.STATIC_DRAW);
         gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);

         setRectangle(0, 0, sb.getResolutionWidth(), sb.getResolutionHeight());

         */

    };

    // gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);

    var setRectangle = function(x, y, width, height) {
        var x1 = x;
        var x2 = x + width;
        var y1 = y;
        var y2 = y + height;

        // x1, y2,
        //    x2, y1,
        //    x2, y2
        /*gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([

         x2, y1,
         x1, y1,
         x1, y2,


         x2, y1,
         x1, y2,
         x2, y2,


         ]), gl.STATIC_DRAW);*/

        return [x2, y1,
            x1, y1,
            x1, y2,

            x2, y1,
            x1, y2,
            x2, y2];
    };

    var createTexture = function() {

        var tex = gl.createTexture();

        //gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        //rttFramebuffer.width = 512;
        //rttFramebuffer.height = 512;

        gl.bindTexture(gl.TEXTURE_2D, tex);

        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        gl.bindTexture(gl.TEXTURE_2D, null);
        return tex;

    };

    /*

     var renderbuffer = gl.createRenderbuffer();
     gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
     gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, sb.getResolutionWidth(), sb.getResolutionHeight());

     gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
     gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

     gl.bindTexture(gl.TEXTURE_2D, null);


     gl.bindRenderbuffer(gl.RENDERBUFFER, null);
     gl.bindFramebuffer(gl.FRAMEBUFFER, null);

     //return tex;

     };*/

    var draw = function(le, frameBuffer) {

        //gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        //gl.bindTexture(gl.TEXTURE_2D, rttTexture);
        //gl.generateMipmap(gl.TEXTURE_2D);
        //gl.bindTexture(gl.TEXTURE_2D, null);

        //WE DRAW TGE MODIFIED IMAGE

        //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        //material.setProgram(program);

        // fb = gl.createFramebuffer();

        //texture = createTexture();

        //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sb.getResolutionWidth(), sb.getResolutionHeight(), 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        //texture = createTexture();

        //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sb.getResolutionWidth(), sb.getResolutionHeight(), 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        //verts = setRectangle(0, 0, 512, 512);

        material.setProgram(program);

        // var mvMatrix = camera.getMVMatrix();

        // gl.uniformMatrix4fv(program.uPMatrix, false, camera.getPMatrix());
        //gl.uniformMatrix4fv(program.uMVMatrix, false, mvMatrix);

        // gl.uniform4f(program.uColor, 1.0, 1.0, 0.0, 1.0);

        //material.useTexture('image');
        // Bind:
        gl.bindBuffer(gl.ARRAY_BUFFER, screenQuadVBO);
        gl.enableVertexAttribArray(program.vertexPositionNDC);
        gl.vertexAttribPointer(program.vertexPositionNDC, 2, gl.FLOAT, false, 0, 0);

        // Draw 6 vertexes => 2 triangles:
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        //gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);

        /*

         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
         gl.enableVertexAttribArray(program.aVertexPosition);
         gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

         gl.drawArrays(gl.TRIANGLES, 0, 2);
         */
        //gl.drawArrays(gl.TRIANGLES, 0, 6);

        // Create a framebuffer and attach the texture.

        //gl.activeTexture(gl.TEXTURE0);
        //gl.bindTexture(gl.TEXTURE_2D, rttTexture);
        //gl.uniform1i(blurVertical.samplerUniform, 0);

        //var renderbuffer = gl.createRenderbuffer();
        //gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
        //gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, sb.getResolutionWidth(), sb.getResolutionHeight());

        //gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

        /*
         //firstPass();
         //secondPass();

         var verts = setRectangle(0, 0, 500, 500);

         gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);


         //var program = createProgramFromScripts(gl, ["vshader", "fshader"], ["a_position"]);
         //gl.useProgram(program);




         // create an empty texture
         var tex = gl.createTexture();
         gl.bindTexture(gl.TEXTURE_2D, tex);

         //gl.bindTexture(gl.TEXTURE_2D, tex);
         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sb.getResolutionWidth(), sb.getResolutionHeight(), 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

         // Create a framebuffer and attach the texture.

         gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);

         // Render to the texture (using clear because it's simple)


         // Now draw with the texture to the canvas
         // NOTE: We clear the canvas to red so we'll know
         // we're drawing the texture and not seeing the clear
         // from above.

         */
        /*
         material.setProgram(blurVertical);
         gl.bindRenderbuffer(gl.RENDERBUFFER, null);

         gl.clearColor(0, 1, 0, 1);
         gl.clear(gl.COLOR_BUFFER_BIT);

         gl.uniform1i(blurVertical.samplerUniform, 0);
         gl.activeTexture(gl.TEXTURE0);
         gl.bindTexture(gl.TEXTURE_2D, texture);



         */

        //gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
        //gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        //gl.enableVertexAttribArray(0);

        //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        //gl.clearColor(1, 1, 0, 1); // red
        //gl.clear(gl.COLOR_BUFFER_BIT);

    };

    var update = function() {

    };

    var firstPass = function() {

        gl.bindTexture(gl.TEXTURE_2D, texture);
        //gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);

        //gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer2);
        //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        material.setProgram(blurVertical);

        //gl.clearColor(0, 0, 0, 1); // red
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
        //this.setRectangle(0, 0, gl.viewportWidth,  gl.viewportHeight);

        gl.vertexAttribPointer(blurVertical.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.vertexAttribPointer(blurVertical.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(blurVertical.samplerUniform, 0);

        gl.uniform2f(blurVertical.uResolution, sb.getResolutionWidth(), sb.getResolutionHeight());

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        gl.bindTexture(gl.TEXTURE_2D, texture2);
        //gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);

    };

    var secondPass = function() {
        //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        //sm.setProgram(blurHorizontalProgram);
        material.setProgram(blurHorizontal);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
        //this.setRectangle(0, 0, gl.viewportWidth,  gl.viewportHeight);

        gl.vertexAttribPointer(blurHorizontal.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.vertexAttribPointer(blurHorizontal.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1i(blurHorizontal.samplerUniform, 0);
        gl.uniform1i(blurHorizontal.samplerUniform2, 1);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture2);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture3);

        gl.uniform2f(blurHorizontal.uResolution, sb.getResolutionWidth(), sb.getResolutionHeight());

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        //camera.drawCalls++;

    };

    return Object.freeze({update, draw, init});

}