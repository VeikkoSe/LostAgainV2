function pulseGunComponent() {
    'use strict';

    //constructor() {
    var name = 'PulseGunComponent';
    var mesh = null;
    var bulletsAmount = 80;
    var bulletReloadSpeed = 100;
    var bullets = [];
    var bulletShot = 0;

    var pointPositions = [];

    //build buffers
    //var position = [];

    //cant create buffer on every loop. Need to create one buffer for every bullet.
    //position.push(bullets[i].getXPos());
    //position.push(bullets[i].getYPos());
    //position.push(bullets[i].getZPos());

    return Object.freeze({
        getName: function() {
            return name;
        },
        getMesh: function() {
            return mesh;
        },
        setMesh: function(m) {
          mesh = m;
        },

        getBulletsAmount() {
            return bulletsAmount;
        },

       // getPointPositions() {
       //     return pointPositions;
       // },
        //setPointPositions(v) {
        //    pointPositions = v;
        //},
        getBullets() {
            return bullets;
        },
        setBullets(v) {
            bullets = v;
        },
        setBulletShot(v) {
            bulletShot = v;
        },
        getBulletShot() {
            return bulletShot;
        },
        getBulletReloadSpeed() {
            return bulletReloadSpeed;
        }

    });

}
