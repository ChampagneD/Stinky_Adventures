var Phaser = Phaser || {};
var Platformer = Platformer || {};

Platformer.BootState = function () {
    "use strict";
    Phaser.State.call(this);
};

Platformer.prototype = Object.create(Phaser.State.prototype);
Platformer.prototype.constructor = Platformer.BootState;

Platformer.BootState.prototype.init = function (level_file, script_file) {
    "use strict";
    this.level_file = level_file;
    this.script_file = script_file;
};

Platformer.BootState.prototype.preload = function () {
    "use strict";
    this.load.text("level"+window.i, this.level_file);
    this.load.text("script"+window.i, this.script_file);
};

Platformer.BootState.prototype.create = function () {
    "use strict";

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    var level_text, level_data, script_text, script_data;
    level_text = this.game.cache.getText("level"+ window.i);

    level_data = JSON.parse(level_text);

    script_text = this.game.cache.getText("script"+window.i);

    script_data = JSON.parse(script_text);

    this.game.state.start("LoadingState", true, false, level_data, script_data);

};
