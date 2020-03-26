/**
 * Created by Jerome on 03-03-16.
 */
//noinspection JSCheckFunctionSignatures,JSCheckFunctionSignatures,JSCheckFunctionSignatures
var game;

function showGame() {
  const element = document.getElementById('game');
  if (element.style.display === 'none' || !element.style.display) {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}

function showOrHideGame(show) {
  const element = document.getElementById('game');
  if (show === false) {
    element.style.display = 'none';
  } else {
    element.style.display = 'block';
  }
}

function createGame() {
  deleteGame();
  game = new Phaser.Game(24 * 32, 17 * 32, Phaser.AUTO, document.getElementById('game'));
  game.state.add('Game', Game);
  game.state.start('Game');

  showOrHideGame('true');
}

function deleteGame() {
  game = null;

  const gameElement = document.getElementById('game');
  const blankElement = document.createElement('div');
  blankElement.id = 'game';
  gameElement.parentNode.replaceChild(blankElement, gameElement);

  showOrHideGame('false');
}

function main() {
  createGame();
  showOrHideGame('false');
}

main();