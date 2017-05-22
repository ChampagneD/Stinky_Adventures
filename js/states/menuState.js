var Phaser = Phaser || {};
var Platformer = Platformer || {};

Platformer.menuState = function () {
    "use strict";
    Phaser.State.call(this);
};

Platformer.menuState.prototype = Object.create(Phaser.State.prototype);
Platformer.menuState.prototype.constructor = Platformer.menuState;

Platformer.menuState.prototype.init = function (level_data, script_data) {
    "use strict";
    this.level_data = level_data;
    this.script_data = script_data;

};

Platformer.menuState.prototype.create = function() {


   var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

      // var background = game.add.sprite(game.world.centerX, game.world.centerY, 'background_menu');
      // background.anchor.set(0.5);
      //
      game.stage.backgroundColor = '#ffffff';

      var button_play = game.add.button(100, 150-40, 'button', this.start, this, 2, 0, 1);
      button_play.anchor.set(0.5);
      var button_options = game.add.button(100, 200-40, 'button', this.start, this, 5, 3, 4);
      button_options.anchor.set(0.5);
      var button_credit = game.add.button(100, 250-40, 'button', this.start, this, 8, 6, 7);
      button_credit.anchor.set(0.5);

      game.add.image((game.world.centerX) + 100, game.world.centerY, 'hero').anchor.set(0.5);
      //
      // //  Enables all kind of input actions on this image (click, etc)
      // button_play.inputEnabled = true;
      // button_play.events.onInputDown.add(this.start, this);
      //
      // button_credit.inputEnabled = true;
      // button_credit.events.onInputDown.add(this.credit, this);



   };

Platformer.menuState.prototype.start = function(menu_State) {
      game.stage.backgroundColor = '#000000';
      this.game.state.start('GameState', true, false, this.level_data, this.script_data);
      // menu_music.stop();
   };

Platformer.menuState.prototype.credit = function() {
      game.state.start('credit');
   };
