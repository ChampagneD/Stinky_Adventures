var Phaser = Phaser || {};
var Platformer = Platformer || {};

window.i = 1;

window.menuPlayed = false;

var game = new Phaser.Game( 480, 360, Phaser.CANVAS);
game.state.add("BootState", new Platformer.BootState());
game.state.add("LoadingState", new Platformer.LoadingState());
game.state.add("menuState", new Platformer.menuState());
game.state.add("GameState", new Platformer.TiledState());
game.state.start("BootState", true, false, "assets/levels/level1.json", "assets/script/script1.json");
