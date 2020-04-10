
function playElevatorMusic() {
  const music = document.getElementById('elevator-music');
  if (music.paused) music.play();
  else music.pause();
}

function setElevatorMusic() {
  const music = document.getElementById('elevator-music');
  music.loop = true;
  music.volume = 0.75;
}

setElevatorMusic();
