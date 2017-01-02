function railsMovementComponent() {
    'use strict';

    var name = 'RailsMovementComponent';
    var routeEndXpos;
    var routeEndZpos;
    var routeDone;
    var speed;
    var angle;

    return Object.freeze({
        getName: function() {
            return name;
        },
        getRouteEndXpos: function() {
            return routeEndXpos;
        },
        getRouteEndZpos: function() {
            return routeEndZpos;
        },
        setRouteEndXpos: function(v) {
            routeEndXpos = v;
        },
        setRouteEndZpos: function(v) {
            routeEndZpos = v;
        },
        getRouteDone: function() {
            return routeDone;
        },
        setRouteDone: function(v) {
            routeDone = v;
        },
        setSpeed: function(v) {
            speed = v;
        },
        getSpeed: function() {
            return speed;
        },
        setAngle: function(v) {
            angle = v;
        },
        getAngle: function() {
            return angle;
        }

    });

}
