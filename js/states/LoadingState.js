var Phaser = Phaser || {};
var Platformer = Platformer || {};

Platformer.LoadingState = function () {
    "use strict";
    Phaser.State.call(this);
};

Platformer.prototype = Object.create(Phaser.State.prototype);
Platformer.prototype.constructor = Platformer.LoadingState;

Platformer.LoadingState.prototype.init = function (level_data, script_data) {
    "use strict";
    this.level_data = level_data;

    this.script_data = script_data;
};

Platformer.LoadingState.prototype.preload = function () {
   "use strict";
   var assets, asset_loader, asset_key, asset;
   assets = this.level_data.assets;
   for (asset_key in assets) { // load assets according to asset key
      if (assets.hasOwnProperty(asset_key)) {
           asset = assets[asset_key];
           switch (asset.type) {
           case "image":
               this.load.image(asset_key, asset.source);
               break;
           case "spritesheet":
               this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
               break;
           case "tilemap":
               this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
               break;
           }
      }
   }

    this.load.image('basetext', 'assets/images/paper-dialog_big.png');
    this.load.audio('script1', 'assets/son/script1.mp3');
    this.load.spritesheet('button', 'assets/images/menu_Buttons.png', 190, 49);
    this.load.spritesheet('tileSprite', 'assets/images/futur.png', 32, 32, 384);
    this.load.image('hero', 'assets/images/hero.png');

};

Platformer.LoadingState.prototype.create = function () {
    "use strict";
    this.game.state.start('menuState', true, false, this.level_data, this.script_data);

};
