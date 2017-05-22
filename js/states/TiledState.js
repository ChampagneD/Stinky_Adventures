var Phaser = Phaser || {};
var Platformer = Platformer || {};

Platformer.TiledState = function () {
    "use strict";
    Phaser.State.call(this);
};

Platformer.TiledState.prototype = Object.create(Phaser.State.prototype);
Platformer.TiledState.prototype.constructor = Platformer.TiledState;

Platformer.TiledState.prototype.init = function (level_data, script_data) {
    "use strict";
    this.level_data = level_data;

    this.script_data = script_data;


    // start physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // create map and set tileset
    this.map = this.game.add.tilemap(level_data.map.key);
    this.map.addTilesetImage(this.map.tilesets[0].name, level_data.map.tileset);

    //This variable define the step of the dialogue
    this.storypos=0;

    this.mySound = this.add.audio('script'+window.i);

    //The array for the text
    this.storyText = new Array();

};

Platformer.TiledState.prototype.create = function () {
    "use strict";
    var group_name, object_layer, collision_tiles;
    this.game.renderer.renderSession.roundPixels = true

    // create map layers
    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) { // collision layer
            collision_tiles = [];
            layer.data.forEach(function (data_row) { // find tiles used in the layer
                data_row.forEach(function (tile) {
                    // check if it's a valid tile index and isn't already in the list
                    if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                        collision_tiles.push(tile.index);
                    }
                }, this);
            }, this);
            this.map.setCollision(collision_tiles, true, layer.name);
        }
    }, this);
    // resize the world to be the size of the current layer
    this.layers[this.map.layer.name].resizeWorld();

    // create groups
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);

    this.prefabs = {};

    for (object_layer in this.map.objects) {
        if (this.map.objects.hasOwnProperty(object_layer)) {
            // create layer objects
            this.map.objects[object_layer].forEach(this.create_object, this);
        }
    }

    // Here we cut the content string from the json into an array
    this.storyText = this.script_data[0].content.replace(/.[^\,!.]{1,100}\S*\s*/g, "$&@").split(/\s+@/)


    // Here we call the dialog fonction
    this.dialog();

};

Platformer.TiledState.prototype.create_object = function (object) {
    "use strict";

    var position, prefab;
    // tiled coordinates starts in the bottom left corner
    position = {"x": object.x + (this.map.tileHeight / 2), "y": object.y - (this.map.tileHeight / 2)};
    // create object according to its type
    switch (object.type) {
    case "player":
        prefab = new Platformer.Player(this, position, object.properties);
        break;
    case "ground_enemy":
        prefab = new Platformer.Enemy(this, position, object.properties);
        break;
    case "flying_enemy":
        prefab = new Platformer.FlyingEnemy(this, position, object.properties);
        break;
    case "goal":
        prefab = new Platformer.Goal(this, position, object.properties);
        break;
    }

    this.prefabs[object.name] = prefab;
};

Platformer.TiledState.prototype.restart_level = function () {
    "use strict";
    this.game.state.restart(true, false, this.level_data);
};


    /********************************* DIALOGUE ***************************************/

Platformer.TiledState.prototype.dialog = function(){

        //The base where we'll write the dialogue (eg. an ancient paper)
        this.basetext = this.add.sprite(50, this.game.height - 80, 'basetext');
        this.game.physics.arcade.enableBody(this.basetext);
        this.basetext.scale.setTo(0.4);
        this.basetext.anchor.setTo(0, 0);
        this.basetext.fixedToCamera = true;

        //Here we draw the text area
        var styleDescritpion = {font: '11px Arial', fill: 'red', fontWeight: 'bold', stroke: '#000000', strokeThickness: 0, wordWrap: true, wordWrapWidth: this.basetext.width, maxLines: 3};
        this.textArea = this.game.add.text(0, 0, "", styleDescritpion);
        this.textArea.fixedToCamera = true;
        this.textArea.resolution = 1;
        this.textArea.setTextBounds(this.basetext.x + 20, this.basetext.y + 10, this.basetext.width - 10, this.basetext.height - 10);
        this.game.world.bringToTop(this.textArea);

        this.game.debug.geom(this.textArea.textBounds);

        this.mySound.play();

        //The text change with the step
        this.textArea.text = this.storyText[this.storypos];

        //The step increase
        this.storypos = Math.abs(this.storypos + 1);

        //The text is on top (on Z axis)
        this.game.world.bringToTop(this.textArea);

        //Here we write the text
        this.game.time.events.repeat(3000, this.storyText.length - 1,function () {

            //The text change with the step
            this.textArea.text = this.storyText[this.storypos];

            //The step increase
            this.storypos = Math.abs(this.storypos + 1);

            //The text is on top (on Z axis)
            this.game.world.bringToTop(this.textArea);

       }
       , this);

        //Here
        this.game.time.events.onComplete.add(function() {

            this.basetext.kill();
            this.textArea.kill();

        }, this);

};
