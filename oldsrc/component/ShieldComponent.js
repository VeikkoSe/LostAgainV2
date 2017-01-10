/*global GAME*/
SETV.ShieldComponent = function(amount, sprite, mesh, scale) {
    'use strict';

    this.name = 'ShieldComponent';
    this.max = amount;
    this.lastHit = 0;
    this.lastShieldAdded = 0;
    this.amount = 20;
    this.scale = null;
    this.mesh = null;

}
