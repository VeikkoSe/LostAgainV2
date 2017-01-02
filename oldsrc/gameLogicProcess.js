/**
 * Created by vge on 10/7/15.
 * @param {object} sb sandbox
 * @return {object} Closure
 */
function gameLogicProcess(sb, pubsub) {
    'use strict';

    var em = sb.getEntityManager();
    var ec = sb.getEntityCreator();
    var routeDoneCalculator = 0;

    var init = function() {

        pubsub.subscribe('routeDone', function(name, entity) {

            routeDoneCalculator++;
            if (routeDoneCalculator > 777) {
                routeDoneCalculator = 0;
                pubsub.publish('loadstage', 'levelupstate');
                return;
            }
            var ms = em.getEntityByName('mothership');
            var rmc = ms.components.RailsMovementComponent;

            //TODO something sparcling to hide the destruction.
            // possibly destroy when out of screen
            em.removeEntityByName('fuel');

            var fuelEntity = ec.createFuel(false);
            var fuelComponents = fuelEntity.components;

            rmc.setRouteEndXpos(fuelComponents.RenderableComponent.getXPos());
            rmc.setRouteEndZpos(fuelComponents.RenderableComponent.getZPos());
            rmc.setRouteDone(false);

            ms.components.RailsMovementComponent = rmc;

        });

        pubsub.subscribe('gameover', function(name, b) {
            //alert('game over. Refresh');
        });

        pubsub.subscribe('enemyDeath', function(name, b) {

            var ms = em.getEntityByName('mothership');
            var sc = ms.components.ScoreComponent;
            sc.setValue(sc.getValue() + 1);

            if (b.components.RespawnComponent) {
                if (b.getName() === 'mine') {
                    ec.createMine(ms);
                }
                if (b.getName() === 'destroyer') {
                    ec.createDestroyer(ms);
                }
                em.removeEntityById(b.getId());

            }

        });

        pubsub.subscribe('respawn', function(name, b) {
            var ms = em.getEntityByName('mothership');
            //if mothership is destroyed we don't respawn
            if (ms.components.HealthComponent.getAmount() > 0) {

                var ship = em.getEntityByName('ship');

                ship.components.RenderableComponent.setXPos(ms.components.RenderableComponent.getXPos() + 20);
                ship.components.RenderableComponent.setZPos(ms.components.RenderableComponent.getZPos() + 20);

                var trailComponents = ship.components.MultiTrailComponent.getTrailComponents();
                for (var i = 0; i < trailComponents.length; i++) {
                    trailComponents[i].resetTrail();
                }

                ship.components.ShieldComponent.setAmount(3);
                ship.components.HealthComponent.setAmount(3);
            }

        });

    };

    return Object.freeze({
        update: function() {

        }, draw: function() {
        }, init
    });

}