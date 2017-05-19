var Phaser = Phaser || {};
var Platformer = Platformer || {};

Platformer.TiledState = function () {
    "use strict";
    Phaser.State.call(this);
};

Platformer.TiledState.prototype = Object.create(Phaser.State.prototype);
Platformer.TiledState.prototype.constructor = Platformer.TiledState;

Platformer.TiledState.prototype.init = function (level_data) {
    "use strict";
    this.level_data = level_data;
    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    // start physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // create map and set tileset
    this.map = this.game.add.tilemap(level_data.map.key);
    this.map.addTilesetImage(this.map.tilesets[0].name, level_data.map.tileset);

    this.nb_dialogue = 1;

    //This variable define the step of the dialogue
    this.storypos=0;
            
            
    //The array for the text
    this.storyText = new Array();
            
    // The text is from Shakespeare's "As You Like It"
    this.storyText[0]="Go apart, Adam, and thou shalt\n hear how he will shake me up.";
    this.storyText[1]="Now, sir! what make you here?";
    this.storyText[2]="Nothing: I am not taught to make any thing.";
    this.storyText[3]="What mar you then, sir?";
    this.storyText[4]="Marry, sir, I am helping you to mar\n that which God made, a poor unworthy brother\n of yours, with idleness.";
    this.storyText[5]="Marry, sir, be better employed, and be naught awhile.";
    this.storyText[6]="Shall I keep your hogs and eat husks\n with them? What prodigal portion have I spent,\n that I should come to such penury?";
    this.storyText[7]="Know you where your are, sir?";
    this.storyText[8]="O, sir, very well; here in your orchard.";

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

/********************************* DIALOGUE ***************************************/

    if (this.nb_dialogue == 1) {

        //The base where we'll write the dialogue (eg. an ancient paper)
        this.basetext = this.add.sprite(50, this.game.height - 70, 'basetext');
        this.physics.arcade.enableBody(this.basetext);
        this.basetext.scale.setTo(0.4);
        this.basetext.anchor.setTo(0, 0);
        this.basetext.fixedToCamera = true;


        //Here we draw the text
        var styleDescritpion = {font: '11px Arial', fill: 'red', fontWeight: 'bold', stroke: '#000000', strokeThickness: 0, wordWrap: true, wordWrapWidth: this.basetext.width, maxLines: 3};
        this.textArea = this.game.add.text(0, 0, "", styleDescritpion);
        this.textArea.fixedToCamera = true;
        this.textArea.resolution = 1;
        this.textArea.setTextBounds(this.basetext.x + 20, this.basetext.y + 10, this.basetext.width - 10, this.basetext.height - 10);
        this.game.world.bringToTop(this.textArea);
        console.log(this.basetext);

        this.nb_dialogue++;

        this.game.debug.geom(this.textArea.textBounds);

        //Here we write the text
        this.game.time.events.loop(3000, function () {

            //The text change with the step
            this.textArea.text = this.storyText[this.storypos];
            
            //The step increase
            this.storypos = Math.abs(this.storypos + 1);
            
            //The text is on top (on Z axis)
            this.world.bringToTop(this.textArea);
            
       }
       , this);
    }
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
