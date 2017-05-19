var Platformer = Platformer || {};

Platformer.Dialogue = function (game_state, position, properties) {
    "use strict";



};

Platformer.Dialogue.prototype = Object.create(Platformer.TiledState.prototype);
Platformer.Dialogue.prototype.constructor = Platformer.Dialogue;

Platformer.Dialogue.prototype.init = function(){

    console.log(this);
}

Platformer.Dialogue.prototype.update = function () {
    "use strict";

    console.log(this);

    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    
    // change the direction if walked the maximum distance
    if (Math.abs(this.x - this.previous_x) >= this.walking_distance) {
        this.body.velocity.x *= -1;
        this.previous_x = this.x;
        this.scale.setTo(-this.scale.x, 1);
    }
};