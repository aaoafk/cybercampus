/**
 * Created by Jerome on 03-03-16.
 */
//noinspection JSCheckFunctionSignatures,JSCheckFunctionSignatures,JSCheckFunctionSignatures
var game;
var Game;
var Client;

/**
 * If hidden then show. If shown then hide.
 */
function gameVisibility() {
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
  deleteClient();
  initClient();
  deleteGame();
  initGameVars();
  game = new Phaser.Game(24 * 32, 17 * 32, Phaser.HEADLESS, document.getElementById('game'));
  game.state.add('Game', Game);
  game.state.start('Game');

  showOrHideGame('true');
}

function deleteClient() {
  if (Client) {
    Client.socket.disconnect(true);
  }
  Client = {};
}

function deleteGame() {
  game = null;

  // Need to figure out how to remove player from game.
  // Client (and server?) still thinks players from deleted games (same tab) are still active.
  if (Game && Game.playerMap) {
    const keys = Object.keys(Game.playerMap);
    keys.forEach(key => Game.removePlayer(key));
    console.log(Game.playerMap);
  }

  Game = {};

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