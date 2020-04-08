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
    GameLogic.cursors = phaserGame.input.keyboard.createCursorKeys(); // set up keyboard input
    const map = phaserGame.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    let layer;
    for (let i = 0; i < map.layers.length; i++) {
      layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    layer.events.onInputUp.add(GameLogic.getCoordinates, this); ////////
    Client.askNewPlayer();
  };

  GameLogic.getCoordinates = function (layer, pointer) {
    Client.sendClick(pointer.worldX, pointer.worldY);
  };

  GameLogic.addNewPlayer = function (id, x, y, playerName=null) {
    allPlayers[id] = playerName;
    tellMainToUpdateMetaData();
    GameLogic.playerMap[id] = phaserGame.add.sprite(x, y, 'sprite');
    GameLogic.playerId = id; // save player id -> potential issue here:
    // there can be multiple players per browser (one per tab). this variable only stores one tab's id. we can try to force limit a browser/client to one tab.
  };

  GameLogic.movePlayer = function (id, x, y) {
    const player = GameLogic.playerMap[id];
    const distance = Phaser.Math.distance(player.x, player.y, x, y);
    const tween = phaserGame.add.tween(player);
    const duration = distance * 10;
    tween.to({ x: x, y: y }, duration);
    tween.start();
  };

  GameLogic.update = function () {
    const unit = 3;
    if (GameLogic.cursors.left.isDown) {
      Client.sendArrowKey(-unit, 0);
    } else if (GameLogic.cursors.right.isDown) {
      Client.sendArrowKey(unit, 0);
    } else if (GameLogic.cursors.up.isDown) {
      Client.sendArrowKey(0, -unit);
    } else if (GameLogic.cursors.down.isDown) {
      Client.sendArrowKey(0, unit);
    }
  }

  GameLogic.removePlayer = function (id) {
    GameLogic.playerMap[id].destroy();
    delete GameLogic.playerMap[id];
    delete allPlayers[id];
    tellMainToUpdateMetaData();
  };
}
