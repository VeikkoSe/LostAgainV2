function momentumComponent() {
    'use strict';

    var name = 'MomentumComponent';
    var turnSpeed = 100;
    var speed = 10;
    var acceleration = 50;
    var accelerationOn = 0;
    var rotateLeft = 0;
    var rotateRight = 0;
    var velocityX = 0;
    var velocityY = 0;
    var velocityZ = 0;
    var routeEndXpos = 0;
    var routeEndYpos = 0;
    var routeEndZpos = 0;

    return Object.freeze({
        getName: function() {
            return name;
        },
        getTurnSpeed: function() {
            return turnSpeed;
        },
        setTurnSpeed: function(v) {
            turnSpeed = v;
        },
        getSpeed: function() {
            return speed;
        },
        setSpeed: function(v) {
            speed = v;
        },
        getAccelerationAmount: function() {
            return acceleration;
        },
        setAccelerationAmount: function(v) {
            acceleration = v;
        },
        setCurrentlyAccelerating: function(v) {
            accelerationOn = v;
        },
        getCurrentlyAccelerating: function() {
            return accelerationOn;
        },
        getRotatingLeft: function() {
            return rotateLeft;
        },
        setRotatingLeft: function(v) {
            rotateLeft = v;
        },
        getRotatingRight: function() {
            return rotateRight;
        },
        setRotatingRight: function(v) {
            rotateRight = v;
        },
        getVelocityX: function() {
            return velocityX;
        },
        setVelocityX: function(v) {
            velocityX = v;
        },
        getVelocityZ: function() {
            return velocityZ;
        },
        setVelocityZ: function(v) {
            velocityZ = v;
        },
        getVelocityY: function() {
            return velocityY;
        },
        setVelocityY: function(v) {
            velocityY = v;
        },
        setRouteEndXpos: function(v) {
            routeEndXpos = v;
        },
        getRouteEndXpos: function() {
            return routeEndXpos;
        },
        setRouteEndYpos: function(v) {
            routeEndYpos = v;
        },
        getRouteEndYpos: function() {
            return routeEndYpos;
        },
        setRouteEndZpos: function(v) {
            routeEndZpos = v;
        },
        getRouteEndZpos: function() {
            return routeEndZpos;
        }

    });

}
