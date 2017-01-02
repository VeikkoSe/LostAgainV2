function multiExhaustComponent() {
    'use strict';

    var name = 'MultiExhaustComponent';
    var exhaustComponents = [];

    var addExhaust = function(exhaustComponent) {
        exhaustComponents.push(exhaustComponent);
    };

    return Object.freeze({
        getName: function() {
            return name;
        },
        getExhaustComponents: function() {
            return exhaustComponents;
        },
        addExhaust
    });

}
