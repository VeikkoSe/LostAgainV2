/* global SETV */
SETV.LayoutComponent = function(xPos, yPos, icon, numberComponent) {
    'use strict';

    this.name = 'LayoutComponent';

    this.children = [];
    this.size = 16;
    this.root = null;
    this.xPos = xPos;
    this.yPos = yPos;
    this.icon = icon;
    this.numberComponent = numberComponent;
};


SETV.LayoutComponent.prototype.addChildren = function(layoutComponent) {
    'use strict';
    this.children.push(layoutComponent);
};


