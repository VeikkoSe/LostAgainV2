function controllableComponent() {
    'use strict';

    var name = 'ControllableComponent';

    return Object.freeze({
        getName: function() {
            return name;
        }
    });

}
