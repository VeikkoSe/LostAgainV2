function selectableComponent() {
    'use strict';

    var name = 'SelectableComponent';
    var selected = false;
    //var color = picker.createColor();

    return Object.freeze({
        getName: function() {
            return name;
        },
        selected
    });

}
