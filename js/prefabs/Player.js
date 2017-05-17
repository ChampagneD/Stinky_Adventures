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

    this.monState = this.game.state.getCurrentState()

    this.mapState = this.monState.map.getTile(5, 1, 2);



    console.log(this.monState);
    
    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();

    var styleDescritpion = {font: '35px Arial', fill: '#ff0000', align: 'center', fontWeight: 'bold', stroke: '#ffffff', strokeThickness: 0};
    this.textArea = this.game.add.text(0, 0, "", styleDescritpion);
    this.textArea.anchor.set(0.5);
    this.textArea.fixedToCamera = true;
    this.textArea.cameraOffset.x = 470;
    this.textArea.cameraOffset.y = 560;
    this.game.world.bringToTop(this.textArea);

};

Platformer.Player.prototype = Object.create(Platformer.Prefab.prototype);
Platformer.Player.prototype.constructor = Platformer.Player;

Platformer.Player.prototype.update = function () {
    "use strict";

    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.collide(this, this.game_state.groups.enemies, this.hit_enemy, null, this);

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

    //this.map = this.cache.getTileMapData('Layer3')
    var distance = this.game.math.distance(this.mapState.worldX, this.mapState.worldY,
        this.x, this.y);

        if (distance < 25) {
            
            this.monState.map.removeTile(5, 1, 2);
        }

};

Platformer.Player.prototype.hit_enemy = function (player, enemy) {
    "use strict";
    // if the player is above the enemy, the enemy is killed, otherwise the player dies
    if (enemy.body.touching.up) {
        enemy.kill();
        player.y -= this.bouncing;
    } else {
        this.music_fond.destroy();
        this.game_state.restart_level();
    }
};