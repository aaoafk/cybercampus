import React from 'react';
import Phaser from 'phaser';
import BasicPhaserRender from './basic-phaser-render/basic-phaser-render';

/**
 * Displays a room.
 */
export default function PhaserRoom() {
  return (
    <div></div>
  );
}

export const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    },
  },
  scene: BasicPhaserRender,
};

const game = new Phaser.Game(config);