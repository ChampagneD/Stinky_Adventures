var Platformer = Platformer || {};

Platformer.Player = function (game_state, position, properties) {
    "use strict";
    Platformer.Prefab.call(this, game_state, position, properties);
    
    this.walking_speed = +properties.walking_speed;
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    
    this.animations.add("up", [12, 13, 14, 15], 8, true);
    this.animations.add("down", [0, 1, 2, 3], 8, true);
    this.animations.add("left", [4, 5, 6, 7], 8, true);
    this.animations.add("right", [8, 9, 10, 11],8, true);
    
    this.body.setSize(this.width/3, this.height/6, 10, 40);
    this.anchor.setTo(0.5);

    this.game.camera.follow(this);

    // On récupére toutes les infos de TiledState
    this.monState = this.game.state.getCurrentState()

    // On récupére toutes les infos de la tile a la case donnée
    this.mapState = this.monState.map.getTile(14, 8, 2);
    
    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();

};

Platformer.Player.prototype = Object.create(Platformer.Prefab.prototype);
Platformer.Player.prototype.constructor = Platformer.Player;

Platformer.Player.prototype.update = function () {
    "use strict";

    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

    if (this.game.time.events.paused == true) {

        this.monState.basetext.kill();
        this.monState.textArea.kill();
    }

    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    // jump only if touching a tile
    if (this.cursors.up.isDown) {
        this.body.velocity.y -= this.walking_speed;
        this.play("up");
    } else if (this.cursors.down.isDown) {
        this.body.velocity.y += this.walking_speed;
        this.play("down");
    } else if (this.cursors.left.isDown) {
        this.body.velocity.x -= this.walking_speed;
        this.play("left");
    } else if (this.cursors.right.isDown) {
        this.body.velocity.x += this.walking_speed;
        this.play("right");
    } else {
        this.animations.stop(true, false);
    }

    this.trackEvents();

};

//Check if there is an event

Platformer.Player.prototype.trackEvents = function() {

    //this.map = this.cache.getTileMapData('Layer3')
    var distance = this.game.math.distance(this.mapState.worldX, this.mapState.worldY,
        this.x, this.y);

        if (distance < 25) {
            
            this.monState.map.removeTile(14, 8, 2);

            this.monState.map.removeTile(17, 10, 1);
            this.monState.map.removeTile(18, 10, 1);
            this.monState.map.removeTile(19, 10, 1);
            this.monState.map.removeTile(20, 10, 1);

            this.monState.map.removeTile(17, 11, 1);
            this.monState.map.removeTile(18, 11, 1);
            this.monState.map.removeTile(19, 11, 1);
            this.monState.map.removeTile(20, 11, 1);
        }
};








