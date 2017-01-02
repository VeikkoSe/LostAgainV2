/* global SETV,WebGLDebugUtils,WebGLUtils */
SETV.GLV = function(canvas, resolutionWidth, resolutionHeight, debug) {
    'use strict';

    this._gl = null;
    //this.canvasId = canvas;

    this._rw = resolutionWidth;
    this._rh = resolutionHeight;

    this._currentProgram = null;
    this._depthTest = 0;

    this.canvasElem = document.getElementById(canvas);

    this.canvasElem.width = resolutionWidth;
    this.canvasElem.height = resolutionHeight;

    if (debug) {
        this._gl = WebGLDebugUtils.makeDebugContext(this.canvasElem.getContext('webgl', {alpha: false}));
    }
    else {
        this._gl = WebGLUtils.setupWebGL(this.canvasElem);
    }
    this.setViewport();

};

SETV.GLV.prototype.clear = function() {
    'use strict';

    this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
};

SETV.GLV.prototype.getGL = function() {
    'use strict';
    return this._gl;
};

SETV.GLV.prototype.setViewport = function() {
    'use strict';
    this._gl.viewport(0, 0, this._rw, this._rh);

};

SETV.GLV.prototype.clearcolor = function() {

};

SETV.GLV.prototype.clearDepth = function() {

};
SETV.GLV.prototype.disableDepthTest = function() {
    'use strict';
    if (this._depthTest === 1) {
        this._gl.disable(this._gl.DEPTH_TEST);
        this._depthTest = 0;
    }

};

SETV.GLV.prototype.enableDepthTest = function() {
    'use strict';
    if (this._depthTest === 0) {
        this._gl.enable(this._gl.DEPTH_TEST);
        this._depthTest = 1;
    }
};

SETV.GLV.prototype.enableBlend = function() {

};

SETV.GLV.prototype.getResolutionWidth = function() {
    'use strict';
    return this._rw;
};

SETV.GLV.prototype.getResolutionHeight = function() {
    'use strict';
    return this._rh;
};

SETV.GLV.prototype.createPrograms = function(shaders) {
    'use strict';
    var allPrograms = [];
    for (var key in shaders) {

        // skip loop if the property is from prototype
        if (!shaders.hasOwnProperty(key)) {
            continue;
        }
        //console.log(shaders[key]);
        allPrograms[shaders[key].name] = this.createProgram(shaders[key].name, shaders[key].vs, shaders[key].fs, shaders[key].uniforms, shaders[key].attributes);
    }
    return allPrograms;

};

SETV.GLV.prototype.createProgram = function(shaderName, vsSource, fsSource, uniforms, attributes) {
    'use strict';

    var gl = this._gl;
    var program = gl.createProgram();

    //program.name = name;

    var fsshader = this._gl.createShader(this._gl.FRAGMENT_SHADER);

    gl.shaderSource(fsshader, fsSource);
    gl.compileShader(fsshader);
    if (!gl.getShaderParameter(fsshader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(fsshader));

    }

    var vsshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vsshader, vsSource);
    gl.compileShader(vsshader);
    if (!gl.getShaderParameter(vsshader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(vsshader));
    }

    gl.attachShader(program, vsshader);
    gl.attachShader(program, fsshader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error('Could not initialise shaders');
    }

    for (var ukey in uniforms) {
        // skip loop if the property is from prototype
        if (!uniforms.hasOwnProperty(ukey)) {
            continue;
        }
        for (var uniformsKey in uniforms[ukey]) {

            if (!uniforms[ukey].hasOwnProperty(uniformsKey)) {
                continue;
            }
            program[uniformsKey] = gl.getUniformLocation(program, uniformsKey);
        }
    }

    for (var akey in attributes) {
        // skip loop if the property is from prototype
        if (!attributes.hasOwnProperty(akey)) {
            continue;
        }
        for (var attributeKey in attributes[akey]) {

            if (!attributes[akey].hasOwnProperty(attributeKey)) {
                continue;
            }
            //var attributeValue = attributes[key][attibuteKey];
            //console.log(attibuteKey+':'+ attributeValue);
            program[attributeKey] = gl.getAttribLocation(program, attributeKey);
            gl.enableVertexAttribArray(program[attributeKey]);

        }
    }

    return program;

};

