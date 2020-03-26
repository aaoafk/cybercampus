/**
 * lol J
 */
//noinspection JSCheckFunctionSignatures,JSCheckFunctionSignatures,JSCheckFunctionSignatures

// (sadly) declare global variables
var phaserGame; // GUI for game
var GameLogic; // underlying logic for GUI
var gameFunctions; // extra functions for GameLogic
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
  // createGame(); // initially don't create a game - only make one if a user actually "joins" a room
  showOrHideGame('false');
}

main();