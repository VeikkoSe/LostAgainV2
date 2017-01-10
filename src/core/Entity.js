/*global SETV*/
SETV.Entity = function(id, name) {
    'use strict';

    this._id = id;
    this._name = name;
    this.components = [];
    this._componentCount = 0;
};

SETV.Entity.prototype.getName = function() {
    'use strict';
    return this._name;
};

SETV.Entity.prototype.getId = function() {
    'use strict';
    return this._id;
};

SETV.Entity.prototype.hasComponent = function(name) {
    'use strict';
    return (this.components[name] !== undefined);

};

SETV.Entity.prototype.addComponent = function(name,variables) {
    'use strict';
    this._componentCount++;
    //console.log(component);
    this.components[name] = variables;
};

