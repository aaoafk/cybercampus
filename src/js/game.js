/*
 * Bye J
 */

function initGameVars() {
  GameLogic = {};

  GameLogic.init = function () {
    phaserGame.stage.disableVisibilityChange = true;
  };

  GameLogic.preload = function () {
    phaserGame.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    phaserGame.load.spritesheet('tileset', 'assets/map/tilesheet.png', 32, 32);
    phaserGame.load.image('sprite', 'assets/sprites/sprite.png');
  };

  GameLogic.create = function () {
    GameLogic.playerMap = {};
    const testKey = phaserGame.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);
    const map = phaserGame.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    let layer;
    for (let i = 0; i < map.layers.length; i++) {
      layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    layer.events.onInputUp.add(GameLogic.getCoordinates, this);
    Client.askNewPlayer();
  };

  GameLogic.getCoordinates = function (layer, pointer) {
    Client.sendClick(pointer.worldX, pointer.worldY);
  };

  GameLogic.addNewPlayer = function (id, x, y) {
    GameLogic.playerMap[id] = phaserGame.add.sprite(x, y, 'sprite');
  };

  GameLogic.movePlayer = function (id, x, y) {
    const player = GameLogic.playerMap[id];
    const distance = Phaser.Math.distance(player.x, player.y, x, y);
    const tween = phaserGame.add.tween(player);
    const duration = distance * 10;
    tween.to({ x: x, y: y }, duration);
    tween.start();
  };

  GameLogic.removePlayer = function (id) {
    GameLogic.playerMap[id].destroy();
    delete GameLogic.playerMap[id];
  };
}
