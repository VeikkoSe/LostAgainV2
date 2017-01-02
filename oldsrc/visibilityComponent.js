function visibilityComponent(visibility) {
    'use strict';

    var name = 'VisibilityComponent';

    return Object.freeze({
        getName: function() {
            return name;
        },
        visibility
    });

}

