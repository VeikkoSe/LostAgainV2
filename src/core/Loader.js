/*global SETV,Math,Uint16Array,Float32Array */
SETV.Loader = function(glv, am, em, material, audio, text) {
    'use strict';
    this.elapsedTotal = null;
    this.lastTime = null;
    this.rotationAngle = null;

    this._text = text;
    this._glv = glv;
    this._am = am;
    this._em = em;
    this._material = material;
    this._audio = audio;
};

SETV.Loader.prototype.loadResource = function(path, callback) {
    'use strict';
    var request = new XMLHttpRequest();
    request.open('GET', path + '?' + Math.random());
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            callback(request);
        }
    };
};

SETV.Loader.prototype.buildBuffers = function(bufferdata, type) {
    'use strict';

    var gl = this._glv.getGL();

    var buffer = gl.createBuffer();

    if (type === 'Float32Array') {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferdata), gl.STATIC_DRAW);
    }
    else if (type === 'Uint16Array') {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(bufferdata), gl.STATIC_DRAW);
    }
    return buffer;

};

SETV.Loader.prototype.audioLoad = function(name, key, callback) {
    'use strict';

    var request = new XMLHttpRequest();
    var aC = this._audio.getContext();
    request.open('GET', name + '?' + Math.random());
    request.responseType = 'arraybuffer';
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            aC.decodeAudioData(
                request.response,
                function(buffer) {
                    if (!buffer) {
                        throw new Error('error decoding file data');

                    }

                    callback(key, buffer);
                },
                function(error) {
                    throw new Error('decodeAudioData error', error);
                });
        }
    };

};

SETV.Loader.prototype.textureLoad = function(name, noflip, repeat, callback) {
    'use strict';

    var gl = this._glv.getGL();

    var loadedTexture = gl.createTexture();

    loadedTexture.image = new Image();

    loadedTexture.image.onload = function() {

        if (noflip) {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        }
        else {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        }

        gl.bindTexture(gl.TEXTURE_2D, loadedTexture);
        gl.texImage2D(gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            loadedTexture.image);
        if (repeat) {

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

            gl.texParameteri(gl.TEXTURE_2D,
                gl.TEXTURE_MAG_FILTER,
                gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D,
                gl.TEXTURE_MIN_FILTER,
                gl.LINEAR);

        }

        else {
            gl.texParameteri(gl.TEXTURE_2D,
                gl.TEXTURE_MAG_FILTER,
                gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D,
                gl.TEXTURE_MIN_FILTER,
                gl.LINEAR);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);

        callback();

    };
    loadedTexture.image.src = name;
    return loadedTexture;

};

SETV.Loader.prototype.loadState = function(levelName, callback) {
    'use strict';
    //we get level json, from there we get all the files needed

    var that = this;

    this.loadResource('resources/stage/' + levelName + '.json', function(data) {

        var jsonData = JSON.parse(data.responseText);

        var entlenght = jsonData.entities.length;
        var entities = jsonData.entities;
        var loaded = 0;
        var tobeLoaded = 0;
        var loadedData = {};

        loadedData.shaders = {};
        loadedData.models = {};
        loadedData.textures = {};
        loadedData.soundEffects = {};
        loadedData.music = {};
        loadedData.structure = jsonData;

        var globalShaders = jsonData.shaders;
        var fontName = jsonData.font;

        that.loadResource('resources/build/positions.json', function(positions) {

            var atlasTexturePositions = JSON.parse(positions.responseText);

            that._am.setPositions(atlasTexturePositions);

            var shaderAfter = function(data) {
                var jsonS = JSON.parse(data.responseText);
                jsonS.vs = jsonS.vs.join('\n');
                jsonS.fs = jsonS.fs.join('\n');

                loadedData.shaders[jsonS.name] = jsonS;
                loaded++;

                if (loaded === tobeLoaded) {
                    beforeReturn(loadedData);
                }
            };

            var soundAfter = function(insertKey, buffer) {
                loadedData.soundEffects[insertKey] = buffer;
                loaded++;
                if (loaded === tobeLoaded) {
                    beforeReturn(loadedData);
                }
            };

            var musicAfter = function(insertKey, buffer) {
                loadedData.music[insertKey] = buffer;
                loaded++;
                if (loaded === tobeLoaded) {
                    beforeReturn(loadedData);
                }
            };

            var generalAfter = function() {
                loaded++;
                if (loaded === tobeLoaded) {
                    beforeReturn(loadedData);
                }
            };

            //final callback before returning
            //we create entitities and programs here before returning and starting tick
            var beforeReturn = function(assets) {




                that._em.assetsToEntities(assets.structure);
                that._em.sortToRender();
                that._am.setAssets(assets);
                var programs = that._glv.createPrograms(assets.shaders);

                that._material.setPrograms(programs);
                that._text.setPositions(assets.font);
                callback();

            };

            tobeLoaded++;
            that.loadResource('resources/font/' + fontName + '.json', function(data) {

                loadedData.fontPositions = JSON.parse(data.responseText);
                //loadedData.fontPositions = fontData.responseText;
                loaded++;
                if (loaded === tobeLoaded) {
                    beforeReturn(loadedData);
                }
            });

            for (var k = 0; k < globalShaders.length; k++) {
                tobeLoaded++;
                that.loadResource('resources/shader/' + globalShaders[k] + '.json', shaderAfter);
            }

            var modelAfter = function(data) {
                var model = JSON.parse(data.responseText);

                //console.log(model);

                loadedData.models[model.name] = model;

                loadedData.models[model.name].vertexPositionBuffer = that.buildBuffers(model.vertices, 'Float32Array');
                loadedData.models[model.name].texturePositionBuffer = that.buildBuffers(model.texturecoordinates, 'Float32Array');
                loadedData.models[model.name].indexPositionBuffer = that.buildBuffers(model.indices, 'Uint16Array');
                loadedData.models[model.name].normalPositionBuffer = that.buildBuffers(model.normals, 'Float32Array');

                loaded++;

                if (loaded >= tobeLoaded) {
                    beforeReturn(loadedData);
                }
            };

            for (var i = 0; i < entlenght; i++) {

                var components = entities[i].components;
                var clength = components.length;
                for (var j = 0; j < clength; j++) {

                    if (entities[i].components[j].name === 'ModelComponent') {

                        var model = entities[i].components[j];
                        tobeLoaded++;
                        that.loadResource('resources/shader/' + model.data.shader + '.json', shaderAfter);
                        tobeLoaded++;
                        that.loadResource('resources/build/model/' + model.data.mesh + '.json', modelAfter);
                        var atlasName = that._am.translateTextureName(model.data.texture);

                        if (typeof loadedData.textures[atlasName] === 'undefined') {
                            tobeLoaded++;
                            loadedData.textures[atlasName] = that.textureLoad('resources/build/image/' + atlasName, true, false, generalAfter);
                        }
                    }
                    if (entities[i].components[j].name === 'MusicComponent') {
                        /*
                         var musicClip = entities[i].components[j];

                         for (var h = 0; h < musicClip.data.clips.length; h++) {
                         tobeLoaded += 1;
                         that.loadResource('resources/sound/music/' + musicClip.data.clips[h] + '.ogg', generalAfter);
                         }
                         */
                        var musicClip = entities[i].components[j];
                        for (var key in musicClip.data.clips) {
                            // skip loop if the property is from prototype
                            if (!musicClip.data.clips.hasOwnProperty(key)) {
                                continue;
                            }

                            var obj = musicClip.data.clips[key];

                            tobeLoaded += 1;
                            that.audioLoad('resources/sound/music/' + obj + '.ogg', key, musicAfter);
                        }
                    }
                    if (entities[i].components[j].name === 'SoundComponent') {
                        var soundClip = entities[i].components[j];
                        for (var kd in soundClip.data.clips) {
                            // skip loop if the property is from prototype
                            if (!soundClip.data.clips.hasOwnProperty(kd)) {
                                continue;
                            }

                            var ob = soundClip.data.clips[kd];

                            tobeLoaded += 1;
                            that.audioLoad('resources/sound/effect/' + ob + '.ogg', kd, soundAfter);
                        }

                    }

                }
            }
        });
    });
};

