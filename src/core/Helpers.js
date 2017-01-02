/*global SETV*/
SETV.Helpers = function() {
    "use strict";
    this._currentHeap = 0;
    this._lastUsedHeap = 0;
};

SETV.Helpers.prototype.randomRangedIntFromPos = function(pos) {
    'use strict';
    var rnd = this.getRandomInt(800 + pos, -800 + pos);
    if (rnd > 600 + pos ||
        rnd < -600 + pos) {
        return rnd;
    }
    else {
        return this.randomRangedIntFromPos(pos);
    }
};

SETV.Helpers.prototype.randomCloseInt = function() {
    'use strict';
    return this.randomCloseInt(30, -30);

};

SETV.Helpers.prototype.arraysEqual = function(arr1, arr2) {
    'use strict';
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
};

SETV.Helpers.prototype.randomRangedInt = function() {
    'use strict';
    var rnd = this.getRandomInt(500, -500);
    if (rnd > 300 ||
        rnd < -300) {
        return rnd;
    }
    else {
        return this.getRandomInt(500, -500);
    }
};

SETV.Helpers.prototype.getRandomInt = function(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/*
 not a helper!
 SETV.Helpers.prototype.createHit = function(hc, sc) {
 'use strict';
 var timeNow = new Date().getTime();

 if (sc) {
 sc.setLastHit(timeNow);
 if (sc.getLastShieldAdded() === 0) {

 sc.setLastShieldAdded(timeNow); //TODO: Combine variables

 }
 }

 if (sc && sc.getAmount() > 0) {
 //we count from the first hit untill the shield has reset

 sc.setAmount(sc.getAmount() - 1);
 }
 else {
 hc.setAmount(hc.getAmount() - 1);
 }

 if (hc.getAmount() < 0) {
 hc.setAmount(0);
 }

 };
 */

SETV.Helpers.prototype.readCookie = function(name) {
    'use strict';
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};

SETV.Helpers.prototype.setCookie = function(cname, cvalue, exdays) {
    'use strict';
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
};

SETV.Helpers.prototype.pInt = function(nro) {
    'use strict';
    return parseInt(nro, 10);
};

SETV.Helpers.prototype.randomIntFromInterval = function(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1) + min);
};

SETV.Helpers.prototype.getMousePos = function(canvas, evt) {
    'use strict';
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};

SETV.Helpers.prototype.isInCircle = function(centerX, centerY, radius, x, y) {
    'use strict';
    return ((centerX - x) * (centerX - x)) + ((centerY - y) * (centerY - y)) < (radius * radius);
};

SETV.Helpers.prototype.circleXY = function(x, y, z, radius, amount) {
    'use strict';
    var points = [];
    var stepSize = ((2 * Math.PI) / amount);
    for (var d = 0; d <= (2 * Math.PI) - stepSize; d += stepSize) {
        points.push(((Math.sin(d) * radius) + x), y, (Math.cos(d) * radius) + z);
    }
    return points;
};

SETV.Helpers.prototype.intersectionpoint = function(A, B) {
    'use strict';
    //http://stackoverflow.com/questions/2447361/3d-line-plane-intersection-with-simple-plane
    var r = -A[1] / B[1];

    var x = (r * B[0] + A[0]) / (r + 1);
    var z = (r * B[2] + A[2]) / (r + 1);

    return [x, 0, z];

};

SETV.Helpers.prototype.isClose = function(currentCoord, newCoord) {
    'use strict';
    if (currentCoord <= newCoord + 0.1 && currentCoord >= newCoord - 0.1) {
        return true;
    }

    return false;
};

SETV.Helpers.prototype.checkMemory = function() {
    'use strict';

    this._currentHeap = window.performance.memory.usedJSHeapSize;
    //console.log(this._currentHeap);
    if (this._currentHeap < this._lastUsedHeap)
        console.log('Garbage collected!');
    this._lastUsedHeap = this._currentHeap;
};

SETV.Helpers.prototype.isCloseOrbit = function(currentCoord, newCoord) {
    'use strict';
    if (currentCoord <= newCoord + 100 && currentCoord >= newCoord - 100) {
        return true;
    }

    return false;
};

SETV.Helpers.prototype.isNumeric = function(n) {
    'use strict';
    return !isNaN(parseFloat(n)) && isFinite(n);
};

SETV.Helpers.prototype.buildPlane = function(width, squares) {
    'use strict';
    var xLength = squares;
    var yLength = squares;

    var heightMapVertexData = [];
    var hd = [];

    var zPosition = 0;

    var part = width / squares;

    var c = 0;
    // First, build the data for the vertex buffer
    for (var x = 0; x < xLength; x++) {

        for (var y = 0; y < yLength; y++) {

            var xPosition1 = part * x + part;
            var yPosition1 = part * y;

            var xPosition2 = part * x + part;
            var yPosition2 = part * y + part;

            var xPosition3 = part * x;
            var yPosition3 = part * y;

            var xPosition4 = part * x;
            var yPosition4 = part * y;

            var xPosition5 = part * x + part;
            var yPosition5 = part * y + part;

            var xPosition6 = part * x;
            var yPosition6 = part * y + part;

            // Position
            hd[c++] = [xPosition1, yPosition1];
            hd[c++] = [xPosition2, yPosition2];
            hd[c++] = [xPosition3, yPosition3];

            hd[c++] = [xPosition4, yPosition4];
            hd[c++] = [xPosition5, yPosition5];
            hd[c++] = [xPosition6, yPosition6];

        }
    }

    c = 0;
    var iloop = [];
    var il = 0;
    var added = {};
    var val = [];
    var alreadyAdded;

    for (var i = 0; i < hd.length; i++) {
        alreadyAdded = false;

        if (hd[i][0] + ',' + hd[i][1] in added) {

            iloop.push(added[hd[i][0] + ',' + hd[i][1]]);
            alreadyAdded = true;

        }

        if (!alreadyAdded) {
            heightMapVertexData[c++] = hd[i][0];
            heightMapVertexData[c++] = 0;
            heightMapVertexData[c++] = hd[i][1];

            added[hd[i][0] + ',' + hd[i][1]] = il;
            iloop.push(il);

            il++;
        }
    }
    var plane = [];
    plane.push(iloop);
    plane.push(heightMapVertexData);
    return plane;
};



