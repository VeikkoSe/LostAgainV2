/* global SETV,Float32Array*/
SETV.Material = function(glv, am, helpers) {
    'use strict';

    this._currentProgram = null;
    this._allPrograms = [];
    this._uniforms = [];
    this._pointers = [];

    this._currentTexture = null;
    this._am = am;
    this._glv = glv;
    this._he = helpers;
    this._postprocess = false;

    //we create buffer and texture for postprocess effects
    var gl = this._glv.getGL();
    this._frameBuffer = gl.createFramebuffer();
    this._rttTexture = gl.createTexture();
    this._screenQuadVBO = gl.createBuffer();

    this.initTextureFramebuffer();
};

SETV.Material.prototype.setProgram = function(programName) {
    'use strict';

    if (this._currentProgram === null || (this._currentProgram !== programName)) {
        var gl = this._glv.getGL();

        gl.useProgram(this._allPrograms[programName]);
        this._currentProgram = programName;

        //this._uniforms.length = 0;
        //this._pointers.length = 0;
    }

    return this._allPrograms[programName];
};

SETV.Material.prototype.setPrograms = function(programs) {
    'use strict';
    this._allPrograms = programs;
};

SETV.Material.prototype.bindFrameBuffer = function() {
    'use strict';
    var gl = this._glv.getGL();
    if (this._postprocess) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
    }
    else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

};

SETV.Material.prototype.drawPostProcess = function() {
    'use strict';

    if (!this._postprocess) {
        return;
    }

    var gl = this._glv.getGL();

    gl.bindTexture(gl.TEXTURE_2D, this._rttTexture);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);

    //WE RENDER THE CAPTURED TEXTURE
    var program = this.setProgram('screenquad');
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    this._glv.clear();

    gl.activeTexture(gl.TEXTURE0);

    gl.uniform1i(program.samplerUniform, 0);
    gl.bindTexture(gl.TEXTURE_2D, this._rttTexture);
    this._currentTexture = null;

    this.setPointer(program.aVertexPosition, this._screenQuadVBO, 2);

    // Draw 2 triangles
    gl.drawArrays(gl.TRIANGLES, 0, 6);

};

SETV.Material.prototype.initTextureFramebuffer = function() {
    'use strict';

    if (!this._postprocess) {
        return;
    }

    var gl = this._glv.getGL();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);

    gl.bindTexture(gl.TEXTURE_2D, this._rttTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //gl.generateMipmap(gl.TEXTURE_2D);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._glv.getResolutionWidth(), this._glv.getResolutionHeight(), 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this._glv.getResolutionWidth(), this._glv.getResolutionHeight());

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._rttTexture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    var verts = [
        // First triangle:
        1.0, 1.0,
        -1.0, 1.0,
        -1.0, -1.0,
        // Second triangle:
        -1.0, -1.0,
        1.0, -1.0,
        1.0, 1.0
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, this._screenQuadVBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

};

SETV.Material.prototype.setUniform = function(type, variable, value) {
    'use strict';
    var gl = this._glv.getGL();
    var program = this._allPrograms[this._currentProgram];



    if (typeof this._uniforms[this._currentProgram] === 'undefined') {
        this._uniforms[this._currentProgram] = {};
    }

    if (typeof this._uniforms[this._currentProgram][variable] !== 'undefined') {

        if (Object.prototype.toString.call(this._uniforms[this._currentProgram][variable]) === '[object Float32Array]') {

            if (this._he.arraysEqual(this._uniforms[this._currentProgram][variable], value)) {
                return true;
            }
        }
        else {

            if (this._uniforms[this._currentProgram][variable] === value) {
                return true;
            }
        }
    }


    switch (type) {
        case 'Matrix4fv':
            gl.uniformMatrix4fv(program[variable], false, value);
            this._uniforms[this._currentProgram][variable] = value;
            break;
        case 'Matrix3fv':
            gl.uniformMatrix3fv(program[variable], false, value);
            this._uniforms[this._currentProgram][variable] = value;
            break;
        case '1i':
            gl.uniform1i(program[variable], value);
            this._uniforms[this._currentProgram][variable] = value;
            break;
        case 'float':
            gl.uniform1f(program[variable], value);
            this._uniforms[this._currentProgram][variable] = value;
            break;
    }

};

SETV.Material.prototype.setPointer = function(position, buffer, size) {
    'use strict';
    var gl = this._glv.getGL();

    var program = this._allPrograms[this._currentProgram];
    //console.log(this._allPrograms);
    //console.log(this._currentProgram);

    //if(typeof this._pointers[position]  !== 'undefined' && this._pointers[position] === buffer) {
    //    return true;
    //}

    //this._pointers[position] = buffer;
    if (position === 'index') {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    }
    else {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        //console.log(buffer);
        gl.vertexAttribPointer(program[position], size, gl.FLOAT, false, 0, 0);
    }

};

SETV.Material.prototype.useTexture = function(textureName) {
    'use strict';

    var atlasName = this._am.translateTextureName(textureName);

    if (typeof this._currentTexture === 'undefined' || this._currentTexture !== atlasName) {
        var gl = this._glv.getGL();
        var texture = this._am.getAssets().textures[atlasName];
        gl.activeTexture(gl.TEXTURE0);
        this.setUniform('1i', 'uSampler', 0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        this._currentTexture = atlasName;

    }

};
