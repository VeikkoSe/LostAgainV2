/*global SETV */
SETV.Audio = function(am) {
    'use strict';

    this._am = am;
    this._audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    this._destination = this._audioCtx.destination;

    this._masterGain = this._audioCtx.createGain();
    this._musicGain = this._audioCtx.createGain();
    this._effectGain = this._audioCtx.createGain();
    this._muteGain = this._audioCtx.createGain();

    this._meter = this._audioCtx.createScriptProcessor(2048, 1, 1);
    this._meter.onaudioprocess = this.processAudio;

    this._muteGain.connect(this._destination);
    this._masterGain.connect(this._muteGain);
    this._musicGain.connect(this._masterGain);
    this._effectGain.connect(this._masterGain);

    this._muteGain.connect(this._meter);
    this._meter.connect(this._destination);

};

SETV.Audio.prototype.getContext = function() {
    'use strict';
    return this._audioCtx;
};

SETV.Audio.prototype.startMusic = function(index, pos, loop) {
    'use strict';

    var music = this._am.getAssets().music;

    var loopSound = loop;

    var source = this._audioCtx.createBufferSource();

    source.buffer = music[index];

    source.connect(this._musicGain);
    if (loopSound) {
        source.loop = true;
    }
    source.start(pos);

};

SETV.Audio.prototype.setMasterVolume = function(level) {
    'use strict';

    this._masterGain.gain.value = level;
};

SETV.Audio.prototype.setMusicVolume = function(level) {
    'use strict';
    this._musicGain.gain.value = level;
};

SETV.Audio.prototype.setEffectsVolume = function(level) {
    'use strict';

    this._effectGain.gain.value = level;
};

SETV.Audio.prototype.useSound = function(onoff) {

    'use strict';

    this._muteGain.gain.value = 0;
    if (onoff === 1) {
        this._muteGain.gain.value = 1;

    }

};

SETV.Audio.prototype.processAudio = function(e) {
    'use strict';
    var buffer = e.inputBuffer.getChannelData(0);

    var isClipping = false;
    // Iterate through buffer to check if any of the |values| exceeds 1.
    for (var i = 0; i < buffer.length; i++) {
        var absValue = Math.abs(buffer[i]);
        if (absValue >= 1) {
            isClipping = true;
            break;
        }
    }

};

SETV.Audio.prototype.playSound = function(index, pos, loop) {
    'use strict';

    var loopSound = ( typeof loop === 'undefined') ? false : loop;

    var sounds = this._am.getAssets().soundEffects;
    //if(loadedBuffer===null) {
    //  return false;
    //}

    var source = this._audioCtx.createBufferSource();
    //var source2 = context.createBufferSource();

    source.buffer = sounds[index];
    //source2.buffer = bufferList[1];

    //var gainNode = audioCtx.createGain();
    //audioCtx.destination
    source.connect(this._effectGain);
    //source2.connect(context.destination);
    if (loopSound) {
        source.loop = true;
    }
    source.start(pos);
};







