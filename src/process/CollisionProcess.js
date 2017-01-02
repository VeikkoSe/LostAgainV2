/*global SETV*/
SETV.CollisionProcess = function(em, helpers) {
    'use strict';

    this._collisions = [];
    this._em = em;
    this._helpers = helpers;


/*
        pubsub.subscribe('bulletcollision', function(name, enemy) {

            var enemyEntity = enemy.getEntity();
            var hc = enemyEntity.components.HealthComponent;
            var sc = enemyEntity.components.ShieldComponent;

            helpers.createHit(hc, sc);

            if (hc.getAmount() > 0) {
                pubsub.publish('explosion', enemyEntity.components.RenderableComponent);
            }
            else {

                //hc.setAmount(0);
                pubsub.publish('enemyDeath', enemyEntity);
                pubsub.publish('bigexplosion', enemyEntity.components.RenderableComponent);
            }
        });

        pubsub.subscribe('enemyhit', function(name, target) {

            //var enemy = collisionComponent;

            //var enemyEntity = enemy.getEntity();
            var hc = target.components.HealthComponent;
            var sc = target.components.ShieldComponent;

            helpers.createHit(hc, sc);

            //hc.setAmount(hc.getAmount() - 1);
            if (hc.getAmount() > 0) {
                pubsub.publish('smallexplosion', target.components.RenderableComponent);
            }
            else {

                hc.setAmount(0);
                pubsub.publish('bigexplosion', target.components.RenderableComponent);
                if (target.getName() === 'mothership') {
                    //em.removeEntityByName(target.getName());
                    pubsub.publish('gameover', true);
                }
                if (target.getName() === 'ship') {
                    pubsub.publish('respawn', true);
                }

            }
        });

        pubsub.subscribe('collision', function(name, cComponents) {

            var enemy = (cComponents[0].getGroup() === 'enemy') ? cComponents[0] : cComponents[1];

            var enemyEntity = enemy.getEntity();
            var hc = enemyEntity.components.HealthComponent;
            var sc = enemyEntity.components.ShieldComponent;

            helpers.createHit(hc, sc);
            //hc.setAmount(hc.getAmount() - 1);

            if (hc.getAmount() > 0) {
                pubsub.publish('explosion', enemyEntity.components.RenderableComponent);
            }
            else {
                hc.setAmount(0);
                pubsub.publish('enemyDeath', enemyEntity);
                pubsub.publish('bigexplosion', enemyEntity.components.RenderableComponent);
            }

            var player = (cComponents[0].getGroup() === 'player') ? cComponents[0] : cComponents[1];

            var playerEntity = player.getEntity();
            var hcp = playerEntity.components.HealthComponent;
            var scp = playerEntity.components.ShieldComponent;
            //renderable contains xyz of object so we know where to explode
            var pc = playerEntity.components.RenderableComponent;

            helpers.createHit(hcp, scp);

            //we don't explode the ship when shield take damage

            if (scp.getAmount() < 1 && hcp.getAmount() > 0) {

                pubsub.publish('explosion', pc);
            }
            else if (scp.getAmount() < 1 && hcp.getAmount() < 1) {

                hcp.setAmount(0);
                if (playerEntity.getName() === 'mothership') {
                    em.removeEntityByName(playerEntity.name);
                    pubsub.publish('gameover', true);
                }
                if (playerEntity.getName() === 'ship') {
                    pubsub.publish('respawn', true);
                }
                pubsub.publish('bigexplosion', pc);
            }

        });
        */

};

SETV.CollisionProcess.prototype.update = function(input) {
    'use strict';
    var entities = this._em.getEntities();
    this._collisions.length = 0;
    for (var e = 0; e < entities.length; e++) {
        var le = entities[e];
        if (le.components.CollisionComponent) {
            //object is dead. no need to check for collisions
            if (le.components.HealthComponent && le.components.HealthComponent.getAmount() < 1) {
                continue;
            }

            var c = le.components.CollisionComponent;
            var r = le.components.RenderableComponent;

            c.xPos = r.xPos;
            c.yPos = r.yPos;
            c.zPos = r.zPos;
            c.xWidth = r.xWidth;
            c.yYWidth = r.yWidth;
            c.zWidth = r.zWidth;
            c.entity =le;

            this._collisions.push(c);

        }
    }

    for (var i = 0; i < this._collisions.length; i++) {
        for (var j = 0; j < this._collisions.length; j++) {
            if (j !== i &&

                this._collisions[i].xPos < this._collisions[j].getXPos() + this._collisions[j].xWidth &&
                this._collisions[i].xPos + this._collisions[i].xWidth > this._collisions[j].xPos &&
                this._collisions[i].zPos < this._collisions[j].zPos + this._collisions[j].zWidth &&
                this._collisions[i].zWidth + this._collisions[i].zPos > this._collisions[j].zPos &&
                this._collisions[i].group !== this._collisions[j].group) {

                //pubsub.publish('collision', [collisions[i], collisions[j]]);

            }
        }

    }
};

SETV.CollisionProcess.prototype.draw = function() {

};