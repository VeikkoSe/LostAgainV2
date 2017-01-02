/*global SETV */
SETV.actionMapper = function(pubsub) {
    'use strict';

    var currentlyPressedKeys = {};

    var handleKeyDown = function(event) {
        currentlyPressedKeys[event.keyCode] = true;
    };

    var handleKeyUp = function(event) {
        currentlyPressedKeys[event.keyCode] = false;
    };

    var init = function() {

        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
        document.onmousemove = handleMouseMove;
        document.onmousedown = handleMouseDown;
        document.onmouseup = handleMouseUp;
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
        window.addEventListener(event, handleMouseWheel);

    };

    var handleMouseWheel = function(event) {
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

        pubsub.publish('mousewheel', normalized);

    };

    var handleMouseMove = function(e) {

        pubsub.publish('mousemove', e);
    };

    var handleMouseDown = function(event) {

        pubsub.publish('mousedown', event);

    };
    var handleMouseUp = function(event) {

        pubsub.publish('mouseup', event);

    };

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
    return {
        init, subscribe: function() {
        }, getCurrentlyPressedKeys: function() {
            return currentlyPressedKeys;
        }

    };
};
