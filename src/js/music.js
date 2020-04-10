function toggleElevatorMusic() {
  const music = document.getElementById('elevator-music');
  if (music.paused) {
    music.play();
    document.getElementById('play-elevator-music').value = 'Mute music'
  } else {
    document.getElementById('play-elevator-music').value = 'Play music';
    music.pause();
  }
}

function initElevatorMusic() {
  const music = document.getElementById('elevator-music');
  music.loop = true;
  music.volume = 0.75;
  document.getElementById('play-elevator-music').style.display = 'none';
}

function toggleNatureSounds() {
  const music = document.getElementById('nature-sounds');
  if (music.paused) {
    music.play();
    document.getElementById('play-nature-sounds').value = 'Mute nature'
  } else {
    music.pause();
    document.getElementById('play-nature-sounds').value = 'Play nature';
  }
}

function startNatureSounds() {
  document.getElementById('play-nature-sounds').style.display = '';
  toggleNatureSounds();
}

function initNatureSounds() {
  const music = document.getElementById('nature-sounds');
  document.getElementById('play-nature-sounds').style.display = 'none';
  music.loop = true;
  music.volume = 1;
}

initElevatorMusic();
initNatureSounds();
