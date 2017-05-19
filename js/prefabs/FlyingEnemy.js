var Platformer = Platformer || {};

Platformer.FlyingEnemy = function (game_state, position, properties) {
    "use strict";
    Platformer.Dialogue.call(this, game_state, position, properties);
    
    // flying enemies are not affected by gravity
    this.body.allowGravity = false;
    
    this.animations.add("flying", [0, 1], 5, true);
    this.animations.play("flying");
};

Platformer.FlyingEnemy.prototype = Object.create(Platformer.Dialogue.prototype);
Platformer.FlyingEnemy.prototype.constructor = Platformer.FlyingEnemy;