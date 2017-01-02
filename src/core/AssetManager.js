/*global SETV */
SETV.AssetManager = function() {
    'use strict';
    this._assets = null;
    this._imageAtlasList = null;

};

SETV.AssetManager.prototype.setPositions = function(positions) {
    'use strict';
    this._imageAtlasList = positions;
};

SETV.AssetManager.prototype.setAssets = function(assets) {
    'use strict';
    this._assets = assets;
};
SETV.AssetManager.prototype.getAssets = function(assets) {
    'use strict';
    return this._assets;
};

SETV.AssetManager.prototype.translateTextureName = function(name) {
    "use strict";

    for (var i = 0; i < this._imageAtlasList.length; i++) {

        if (name === this._imageAtlasList[i].imageName) {
            return this._imageAtlasList[i].atlasName;

        }
    }

};
