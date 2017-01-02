/*global SETV */
SETV.ActionMapper = function(glv) {
    'use strict';

    this._glv = glv;
    this._currentlyPressedKeys = {};
    this._currentlyPressedMouseButtons = {};

    this._mouseWheel = null;
    this._input = {};
    this._originalMouseX = -1;
    this._originalMouseY = -1;

    this._mouseXPos = null;
    this._mouseYPos = null;

    this._mouseMovementX = null;
    this._mouseMovementY = null;
    this._lockedCursor = false;

    //this._canvasElem = document.getElementById(this._glv.canvasId);

    document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
    this._glv.canvasElem.addEventListener('mousedown', this.handleMouseDown.bind(this), false);
    this._glv.canvasElem.addEventListener('mouseup', this.handleMouseUp.bind(this), false);

    // register the callback when a pointerlock event occurs
    document.addEventListener('pointerlockchange', this.changeCallback.bind(this), false);
    document.addEventListener('mozpointerlockchange', this.changeCallback.bind(this), false);
    document.addEventListener('webkitpointerlockchange', this.changeCallback.bind(this), false);

    var event;
    if ('onwheel' in document) {
        event = 'wheel';
    }
    else {
        if ('onmousewheel' in document) {
            event = 'mousewheel';
        }
        else {
            event = 'DOMMouseScroll';
        }
    }
    window.addEventListener(event, this.handleMouseWheel);
};

SETV.ActionMapper.prototype.mouseX = function(e) {
    'use strict';
    if (e.pageX) {
        return e.pageX;
    }
    else if (e.clientX) {
        return e.clientX + (document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft :
                document.body.scrollLeft);
    }
    else {
        return null;
    }
};

SETV.ActionMapper.prototype.mouseY = function(e) {
    'use strict';
    if (e.pageY) {
        return e.pageY;
    }
    else if (e.clientY) {
        return e.clientY + (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop);
    }
    else {
        return null;
    }
};

SETV.ActionMapper.prototype.changeCallback = function(e) {

    //var canvasElem = document.getElementById('canvas');

    if (document.pointerLockElement === this._glv.canvasElem ||
        document.mozPointerLockElement === this._glv.canvasElem ||
        document.webkitPointerLockElement === this._glv.canvasElem) {

        // we've got a pointerlock for our element, add a mouselistener

        document.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
    } else {

        this._lockedCursor = false;
        // pointer lock is no longer active, remove the callback
        document.removeEventListener('mousemove', this.handleMouseMove.bind(this), false);

    }
};

SETV.ActionMapper.prototype.handleKeyDown = function(event) {
    'use strict';
    this._currentlyPressedKeys[event.keyCode] = true;

};

SETV.ActionMapper.prototype.handleKeyUp = function(event) {
    'use strict';

    this._currentlyPressedKeys[event.keyCode] = false;
};

SETV.ActionMapper.prototype.resetInput = function() {
    "use strict";
    this._mouseMovementX = 0;
    this._mouseMovementY = 0;
}

SETV.ActionMapper.prototype.getInput = function() {
    "use strict";

    this._input.keyboard = this._currentlyPressedKeys;
    this._input.mouse = {
        'xPos': this._mouseXPos,
        'yPos': this._mouseYPos,
        'mouseMovementX': this._mouseMovementX,
        'mouseMovementY': this._mouseMovementY,
        'buttons': this._currentlyPressedMouseButtons,
        'originalXPos': this._originalMouseX,
        'originalYPos': this._originalMouseY,
        'mouseWheel': this._mouseWheel
    };
    return this._input;

};

SETV.ActionMapper.prototype.handleMouseWheel = function(event) {
    'use strict';
    //http://jsfiddle.net/BXhzD/
    var normalized;
    if (event.wheelDelta) {
        if (event.wheelDelta % 120 === -0) {
            normalized = event.wheelDelta / 120;
        }
        else {
            normalized = event.wheelDelta / 12;
        }

    } else {
        var rawAmmount = event.deltaY ? event.deltaY : event.detail;
        normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
    }

    this._mouseWheel = normalized;

};

SETV.ActionMapper.prototype.handleMouseMove = function(e) {
    'use strict';

    if (this._lockedCursor) {
        var movementX = e.movementX || e.mozMovementX || 0;
        var movementY = e.movementY || e.mozMovementY || 0;

        this._mouseXPos = e.clientX;
        this._mouseYPos = e.clientY;
        this._mouseMovementX = movementX;
        this._mouseMovementY = movementY;
    }
};

SETV.ActionMapper.prototype.handleMouseDown = function(event) {
    'use strict';

    //var canvasElem = document.getElementById(this._canvasElem);

    if (!this._lockedCursor) {
        //if(!havePointerLock) {

        this._glv.canvasElem.requestPointerLock = this._glv.canvasElem.requestPointerLock ||
            this._glv.canvasElem.mozRequestPointerLock ||
            this._glv.canvasElem.webkitRequestPointerLock;
        // Ask the browser to lock the pointer
        this._glv.canvasElem.requestPointerLock();
        //}
        //console.log(event);

        this._lockedCursor = true;

        if (this._originalMouseX === -1) {
            this._originalMouseX = event.clientX;
            this._originalMouseY = event.clientY;
        }

    }
    this._currentlyPressedMouseButtons[event.button] = true;

};

SETV.ActionMapper.prototype.handleMouseUp = function(event) {
    'use strict';
    this._currentlyPressedMouseButtons[event.button] = false;

};
