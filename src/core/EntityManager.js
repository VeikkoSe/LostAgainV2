/*global SETV*/
SETV.EntityManager = function(entity) {
    'use strict';
    this._entities = [];
    this._maxId = 0;
    this._entityObj = entity;

};

SETV.EntityManager.prototype.assetsToEntities = function(loadedStructure) {
    'use strict';

    var entityStructure = loadedStructure.entities;

    for (var i = 0; i < entityStructure.length; i++) {

        var ent = this.addNew(entityStructure[i].name);
        var components = entityStructure[i].components;
        for (var j = 0; j < components.length; j++) {

            var component = {};//components[j].name]();

            //console.log(Component);
            var data = components[j].data;
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    component[key] = data[key];
                }
            }
            //if(components[j].name ==='ModelComponent') {
             ////   var m = mat4.create();
             //   mat4.identity(m);
             //   component['mvMatrix'] = m;

            //}

            //console.log(component);
            ent.addComponent(components[j].name,component);

        }
    }

};

SETV.EntityManager.prototype.addNew = function(name) {
    'use strict';
    this._maxId++;

    var ent = new this._entityObj(this._maxId, name);

    this._entities.push(ent);
    return ent;

};
SETV.EntityManager.prototype.removeEntityByName = function(name) {
    'use strict';
    for (var e = 0; e < this._entities.length; e++) {
        if (this._entities[e].getName() === name) {
            this._entities.splice(e, 1);
        }
    }
};

SETV.EntityManager.prototype.removeEntityById = function(id) {
    'use strict';
    for (var e = 0; e < this.entities.length; e++) {
        if (this._entities[e].getId() === id) {
            this._entities.splice(e, 1);
        }
    }
};

SETV.EntityManager.prototype.getEntityByName = function(name) {
    'use strict';
    for (var e = 0; e < this._entities.length; e++) {
        if (this._entities[e].getName() === name) {
            return this._entities[e];
        }
    }
};

SETV.EntityManager.prototype.clearAll = function() {
    'use strict';
    this._entities.length = 0;
    this._maxId = 0;
};

SETV.EntityManager.prototype.getEntities = function() {
    'use strict';
    return this._entities;
    //this._maxId = 0;
};

SETV.EntityManager.prototype.sortToRender = function() {
    'use strict';
    //return this.entities;
    //this._maxId = 0;
};

