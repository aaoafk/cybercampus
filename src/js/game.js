/*
 * Bye J
 */

function initGameVars() {
  GameLogic = {};

  GameLogic.init = function () {
    phaserGame.stage.disableVisibilityChange = true;
  };

  GameLogic.preload = function () {
    phaserGame.load.tilemap('map', 'assets/map/swat_map_json1.json', null, Phaser.Tilemap.TILED_JSON);
    phaserGame.load.spritesheet('tileset', 'assets/map/tilesheet.png', 32, 32);
    phaserGame.load.spritesheet('treetileset', 'assets/map/trees2.png', 32, 32);
    phaserGame.load.spritesheet('buildingstileset', 'assets/map/buildings.png', 32, 32);

    phaserGame.load.image('sprite', 'assets/sprites/sprite.png');
  };

  GameLogic.create = function () {
    // enable physics for player sprite
    phaserGame.physics.startSystem(Phaser.Physics.ARCADE);
    GameLogic.playerMap = {};
    GameLogic.cursors = phaserGame.input.keyboard.createCursorKeys(); // set up keyboard input
    const map = phaserGame.add.tilemap('map');
    // add tileset images
    map.addTilesetImage('tilesheet', 'tileset');
    map.addTilesetImage('trees', 'treetileset');
    map.addTilesetImage('buildings', 'buildingstileset');
    phaserGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // create layers
    let layer;
    for (let i = 0; i < map.layers.length; i++) {
      layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    layer.resizeWorld();
    layer.events.onInputUp.add(GameLogic.getCoordinates, this); ////////
    Client.askNewPlayer();
  };

  GameLogic.getCoordinates = function (layer, pointer) {
    Client.sendClick(pointer.worldX, pointer.worldY);
  };

  // friendAndFoe = game.add.group();
  // enemies = game.add.group();

  // for (var i = 0; i < 16; i++)
  // {
  //     //  This creates a new Phaser.Sprite instance within the group
  //     //  It will be randomly placed within the world and use the 'baddie' image to display
  //     enemies.create(360 + Math.random() * 200, 120 + Math.random() * 200, 'baddie');
  // }

  // //  You can also add existing sprites to a group.
  // //  Here we'll create a local sprite called 'ufo'
  // var ufo = game.add.sprite(200, 240, 'ufo');

  // //  And then add it to the group
  // friendAndFoe.add(ufo);

  GameLogic.addNewPlayer = function (id, x, y, playerName = null) {
    allPlayers[id] = playerName;
    tellMainToUpdateMetaData();

    const character = this.add.sprite(x, y, 'sprite');
    const style = { font: "15px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: character.width, align: "center" };
    const text = phaserGame.add.text(0, -5, playerName, style); // need to multiple -5 by the number of times the username wraps around
    character.addChild(text);

    phaserGame.camera.follow(character);

    phaserGame.physics.arcade.enable(character);
    // prevent out of bounds movement
    character.body.setCircle(16);
    character.body.collideWorldBounds = true;

    GameLogic.playerMap[id] = character;
    GameLogic.playerId = id; // save player id -> potential issue here:
    // there can be multiple players per browser (one per tab). this variable only stores 
    // one tab's id. we can try to force limit a browser/client to one tab.
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
    // keyboard movement
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
