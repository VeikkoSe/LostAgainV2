/* global GAME */
GAME.GameState = function(glv, plist, em, camera, actionMapper, audio, material,meshRenderer) {
    'use strict';
    this._meshRenderer = meshRenderer;

    this._audio = audio;
    this._processList = plist;
    this._glv = glv;
    this._em = em;
    this._camera = camera;
    this._frameCount = 0;
    this._elapsedTotal = 0;
    this._lastTime = 0;
    this.input = null;
    this._actionMapper = actionMapper;
    this._material = material;

    this._drawables  = [];
};

GAME.GameState.prototype.init = function() {
    'use strict';

    //var pMatrix = this._camera.getPMatrix();

    this._camera.setPerspective();
    this._camera.setBlackClear();

    //var gl = this._glv.getGL();
    //gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //gl.enable(gl.DEPTH_TEST);

    this._audio.startMusic(1, 0, true);
    //this._audio.playSound('mothershipMotor', 0, true);

    //this._startTime = new Date().getTime();
};

GAME.GameState.prototype.update = function() {
    'use strict';

    this.input = this._actionMapper.getInput();
    //this.mouse = this._actionMapper.getMouseAction();

    var pl = this._processList.length;
    var entities = this._em.getEntities();

    var timeNow = new Date().getTime();

    this._frameCount++;




    if (this._lastTime !== 0) {

        var elapsed = timeNow - this._lastTime;
        this._elapsedTotal += elapsed;

        //skip lost frames
        if (elapsed < 300) {

            var el = entities.length;


            for (var d = 0; d < pl; d++) {
                for (var c = 0; c < el; c++) {

                    this._processList[d].update(this.input,elapsed,entities[c]);
                }
            }
        }

        if (this._elapsedTotal >= 1000) {
            var fps = this._frameCount;
            this._frameCount = 0;
            this._elapsedTotal -= 1000;

            document.getElementById('fps').innerHTML = fps.toString();

        }
    }

    this._lastTime = timeNow;
    this._actionMapper.resetInput();

};

GAME.GameState.prototype.draw = function() {
    'use strict';

    this._material.bindFrameBuffer();

    this._glv.clear();
    var pl = this._processList.length;
    var entities = this._em.getEntities();

    var el = entities.length;

    this._drawables.length = 0;



    for (var d = 0; d < pl; d++) {

        for (var c = 0; c < el; c++) {
            var drawable = this._processList[d].draw(entities[c]);

            if(drawable) {
                this._drawables.push(drawable);
            }
        }
    }
    //console.log(this._drawables);

    this._meshRenderer.render(this._drawables);

    this._material.drawPostProcess();

};







