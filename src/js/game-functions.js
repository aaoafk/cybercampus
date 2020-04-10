/**
 * If hidden then show. If shown then hide.
 */
function gameVisibility() {
  const element = document.getElementById('phaserGame');
  if (element.style.display === 'none' || !element.style.display) {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}

function showOrHideGame(show) {
  const element = document.getElementById('phaserGame');
  if (show === false) {
    element.style.display = 'none';
  } else {
    element.style.display = 'block';
  }
}

function initGame() {
  // full screen potential solution 
  // phaserGame = new Phaser.Game(window.innerWidth * window.devicePixelRatio, 
  //   window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 
  //   document.getElementById('phaserGame'));
  phaserGame = new Phaser.Game(1000 * 700, Phaser.HEADLESS, document.getElementById('phaserGame'));
  phaserGame.state.add('GameLogic', GameLogic);
  phaserGame.state.start('GameLogic');
}

function deleteGame() {
  phaserGame = null;
  if (GameLogic && GameLogic.playerMap) {
    const keys = Object.keys(GameLogic.playerMap);
    keys.forEach(key => GameLogic.removePlayer(key));
    console.log(GameLogic.playerMap);
  }
  GameLogic = {};

  const phaserGameElement = document.getElementById('phaserGame');
  const blankElement = document.createElement('div');
  blankElement.id = 'phaserGame';
  phaserGameElement.parentNode.replaceChild(blankElement, phaserGameElement);

  showOrHideGame(false);
}