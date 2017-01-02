function layoutComponent(xPos, yPos, icon, numberComponent) {
    'use strict';

    var name = 'LayoutComponent';

    var children = [];
    var size = 16;
    var root = false;

    return Object.freeze({

        getName: function() {
            return name;
        },
        getChildren: function() {
            return children;
        },
        getXPos: function() {
            return xPos;
        },
        setXPos: function(v) {
            xPos = v;
        },
        getYPos: function() {
            return yPos;
        },
        setIcon: function(v) {
            icon = v;
        },
        getIcon: function() {
            return icon;
        },
        setRoot: function(v) {
            root = v;
        },
        getRoot: function() {
            return root;
        },
        getSize: function() {
            return size;
        },
        setSize: function(v) {
            size = v;
        },
        getComponent: function() {
            return numberComponent;
        },
        addChildren: function(layoutComponent) {
            children.push(layoutComponent);
        },
        init: function() {

        },
        start: function() {

        },
        subscribe: function() {

        }
    });

}