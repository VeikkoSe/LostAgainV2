function trailComponent(sprite, length, width, offSetFromCenter, offSetSideFromCenter) {
    'use strict';

    var name = 'ExhaustComponent';

    //points that are calculated from flow points
    var points = [];
    var flow = [];

    var texturecoordinates = [];
    var square = [];

    return Object.freeze({
        getName: function() {
            return name;
        },
        getOffSetFromCenter: function() {
            return offSetFromCenter;
        },
        getOffSetSideFromCenter: function() {
            return offSetSideFromCenter;
        },
        getLength: function() {
            return length;
        },
        getWidth: function() {
            return width;
        },
        getFlow: function() {
            return flow;
        },

        getSquare: function() {
            return square;
        },
        getTexturecoordinates: function() {
            return texturecoordinates;
        },
        setFlow: function(v) {
            flow = v;
        },
        setTexturecoordinates: function(v) {
            texturecoordinates = v;
        },

        getSprite: function() {
            return sprite;
        },
        getPoints: function() {
            return points;
        },
        setPoints: function(v) {
            points = v;
        },
        setSquare: function(v) {
            square = v;
        },
        resetTrail: function() {
            points = [];
            square = [];
            flow = [];
            texturecoordinates = [];
        }
    });

}
