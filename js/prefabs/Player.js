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
    this.nb_event = true;

    this.game.camera.follow(this);

    // Get the current state so that we have every game object
    this.monState = this.game.state.getCurrentState();

    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();
    this.actionKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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

    if (window.i == 1) {

        // TrackEvents check if the player is near an event and then launch it
        this.trackEvents(14,8,2, 12,8,2) && this.removeTile(1, 17,10, 18,10, 19,10, 17,11, 18,11, 19,11);
    }

    if (window.i == 2) {

        // EventReplaceTile is executed and if it return true them we start this.removeTile
        if (this.eventReplaceTile(4,41,1, 3105,2977, 3110,2980, 3169,3041, 3174,3044)) {

            if (this.removeTile(1, 23,41, 24,41, 25,41, 26,41, 23,42, 24,42, 25,42, 26,42)) {
                    
                this.game.time.events.removeAll();

                // Here we cut the content string from the json into an array
                
                this.monState.storyText = [];
                this.monState.storyText = this.monState.script_data[this.monState.level_data.scriptIndex.index].children[0].content.replace(/.[^\,!.]{1,100}\S*\s*/g, "$&@").split(/\s+@/);

                this.monState.storypos = 0;
                // Here we call the dialog fonction
                this.monState.dialog();
                console.log(this.game.time.events);
            }
        }
    }
};
