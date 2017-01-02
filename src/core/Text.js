/* global SETV */
SETV.Text = function(glv, helpers) {
    'use strict';

    //var sb;

    this._he = helpers;
    this._fontJson = null;
    this._resolutionWidth = glv.getResolutionWidth();
    this._resolutionHeight = glv.getResolutionHeight();

    this._positions = null;

    //var position;
};
SETV.Text.prototype.textToC = function(text) {
    'use strict';
    var ret = [];
    for (var i = 0; i < text.length; i++) {
        if (text[i] === '\n') {
            ret.push('newline');
        }
        else {

            ret.push(this._fontJson[text.charCodeAt(i)]);
        }
    }

    return ret;
};

SETV.Text.prototype.formatPixel = function(pixel) {
    'use strict';
    var imageSize = 256;
    return (2 * pixel + 1) / (2 * imageSize);

};
SETV.Text.prototype.setPositions = function(positions) {
    'use strict';
    this._fontJson = positions;

};

SETV.Text.prototype.buildData = function(letters, twoD, xPos, yPos) {
    'use strict';
    //var scalingFactor = 2;
    //32 reads in the fnt file created by the program
    var fontHeight = 32;

    var ret = [];

    var xAdvance = 0;
    var yAdvance = 0;

    for (var i = 0; i < letters.length; i++) {

        if (letters[i] === 'newline') {
            yAdvance -= fontHeight;
            xAdvance = 0;
            continue;
        }

        var yOffsetandAdvance = yAdvance - this._he.pInt(letters[i].yoffset);
        var xOffset = this._he.pInt(letters[i].xoffset);
        var xOffsetandAdvance = xOffset + xAdvance;
        var scale = 1;

        if (twoD) {

            //zero,zero is bottom left

            var xPosition = xPos;
            var yPosition = yPos;
            ret.push(
                //first point
                xPosition + (scale * ((xOffsetandAdvance + this._he.pInt(letters[i].width)) / this._resolutionWidth)),
                (1 - (scale * (-1 * yOffsetandAdvance) / this._resolutionHeight)) - yPosition,
                //texture coordinates
                0.0, this.formatPixel(this._he.pInt(letters[i].x) + this._he.pInt(letters[i].width)), this.formatPixel(this._he.pInt(letters[i].y)),
                //second point
                xPosition + (scale * (xOffsetandAdvance / this._resolutionWidth)),
                (1 - (scale * (-1 * yOffsetandAdvance) / this._resolutionHeight)) - yPosition,
                //texture coordinates
                0.0, this.formatPixel(this._he.pInt(letters[i].x)), this.formatPixel(this._he.pInt(letters[i].y)),
                //third point
                xPosition + (scale * (xOffsetandAdvance / this._resolutionWidth)),
                (1 - (scale * (32 / this._resolutionHeight))) - yPosition,
                //texture coordinates
                0.0, this.formatPixel(this._he.pInt(letters[i].x)), this.formatPixel(this._he.pInt(letters[i].y) + this._he.pInt(letters[i].height)),

                //second triangle and two texture coordinates
                //first point
                xPosition + (scale * ((xOffsetandAdvance + this._he.pInt(letters[i].width)) / this._resolutionWidth)),
                (1 - (scale * (-1 * yOffsetandAdvance) / this._resolutionHeight)) - yPosition,
                //texture coordinates
                0.0, this.formatPixel(this._he.pInt(letters[i].x) + this._he.pInt(letters[i].width)), this.formatPixel(this._he.pInt(letters[i].y)),
                //second point
                xPosition + (scale * (xOffsetandAdvance / this._resolutionWidth)),
                (1 - (scale * (32 / this._resolutionHeight))) - yPosition,
                //texture coordinates
                0.0, this.formatPixel(this._he.pInt(letters[i].x)), this.formatPixel(this._he.pInt(letters[i].y) + this._he.pInt(letters[i].height)),
                //third point
                xPosition + (scale * ((xOffsetandAdvance + this._he.pInt(letters[i].width)) / this._resolutionWidth)),
                (1 - (scale * (32 / this._resolutionHeight))) - yPosition,
                //texture coordinates
                0.0, this.formatPixel(this._he.pInt(letters[i].x) + this._he.pInt(letters[i].width)), this.formatPixel(this._he.pInt(letters[i].y) + this._he.pInt(letters[i].height))
            );

        }
        else {
            ret.push(
                //first triangle and two texture coordinates
                xOffsetandAdvance + this._he.pInt(letters[i].width), yOffsetandAdvance, 0.0, this.formatPixel(this._he.pInt(letters[i].x) + this._he.pInt(letters[i].width)), this.formatPixel(this._he.pInt(letters[i].y)),
                xOffsetandAdvance, yOffsetandAdvance, 0.0, this.formatPixel(this._he.pInt(letters[i].x)), this.formatPixel(this._he.pInt(letters[i].y)),
                xOffsetandAdvance, yOffsetandAdvance - this._he.pInt(letters[i].height), 0.0, this.formatPixel(this._he.pInt(letters[i].x)), this.formatPixel(this._he.pInt(letters[i].y) + this._he.pInt(letters[i].height)),

                //second triangle and two texture coordinates
                xOffsetandAdvance + this._he.pInt(letters[i].width), yOffsetandAdvance, 0.0, this.formatPixel(this._he.pInt(letters[i].x) + this._he.pInt(letters[i].width)), this.formatPixel(this._he.pInt(letters[i].y)),
                xOffsetandAdvance, yOffsetandAdvance - this._he.pInt(letters[i].height), 0.0, this.formatPixel(this._he.pInt(letters[i].x)), this.formatPixel(this._he.pInt(letters[i].y) + this._he.pInt(letters[i].height)),
                xOffsetandAdvance + this._he.pInt(letters[i].width), yOffsetandAdvance - this._he.pInt(letters[i].height), 0.0, this.formatPixel(this._he.pInt(letters[i].x) + this._he.pInt(letters[i].width)), this.formatPixel(this._he.pInt(letters[i].y) + this._he.pInt(letters[i].height))
            );
        }

        xAdvance += this._he.pInt(letters[i].xadvance);

    }

    return ret;

};





