function photonTorpedoComponent() {
    'use strict';

    var birthTime = 0;
    var angle = 0;
    var xPos = 0.0;
    var yPos = 0.0;
    var zPos = 0.0;
    var visible = 0;
    var speed = 150;
    var deathtime = 1500;

    return {

        getBirthTime: function() {
            return birthTime;
        },
        getAngle: function() {
            return angle;
        },
        getXPos: function() {
            return xPos;
        },
        getYPos: function() {
            return yPos;
        },
        getZPos: function() {
            return zPos;
        },
        getVisible: function() {
            return visible;
        },
        getSpeed: function() {
            return speed;
        },
        getDeathtime: function() {
            return deathtime;
        },

        setBirthTime: function(v) {
            birthTime = v;
        },
        setAngle: function(v) {
            angle = v;
        },
        setXPos: function(v) {
            xPos = v;
        },
        setYPos: function(v) {
            yPos = v;
        },
        setZPos: function(v) {
            zPos = v;
        },
        setVisible: function(v) {
            visible = v;
        },
        setSpeed: function(v) {
            speed = v;
        },
        setDeathtime: function(v) {
            deathtime = v;
        }

    };

}
