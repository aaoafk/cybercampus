/**
 * lol J
 */
//noinspection JSCheckFunctionSignatures,JSCheckFunctionSignatures,JSCheckFunctionSignatures

// Declare global variables
var game;
var Game;
var Client;

function cleanUpGame() {
  deleteClient();
  initClient();
  deleteGame();
  initGameVars();
}

function createGame() {
  cleanUpGame();
  initGame();
  showOrHideGame('true');
}

function main() {
  // createGame();
  showOrHideGame('false');
}

main();