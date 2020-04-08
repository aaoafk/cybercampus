/**
 * This code is based-on code found at https://stackoverflow.com/questions/24874568/live-audio-via-socket-io-1-0.
 * We need to make use of the built-in MediaRecorder. Our goal is to make it so that we send audio every second
 * or so, instead of just sending five seconds worth of audio one time.
 */

var audioNumber = 0;

// Create a separate connection for audio
audioSocket = io.connect();
audioConstraints = { audio: true };

navigator.mediaDevices.getUserMedia(audioConstraints).then(function (mediaStream) {
  const mediaRecorder = new MediaRecorder(mediaStream);
  mediaRecorder.onstart = function (e) {
    this.chunks = [];
  };
  mediaRecorder.ondataavailable = function (e) {
    this.chunks.push(e.data);
  };
  mediaRecorder.onstop = function (e) {
    const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
    const roomChannel = room ? room : 'wholeCampus';
    audioSocket.emit(roomChannel, blob);
  };

  mediaRecorder.sendToServer = function () {
    mediaRecorder.requestData();
    // console.log(this.chunks);
    const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
    audioSocket.emit('wholeCampus', blob);
    // this.chunks = [];
  };

  // Start recording
  mediaRecorder.start();

  // Stop and start recording every second and broadcast it to the server
  setInterval(() => {
    mediaRecorder.stop();
    mediaRecorder.start();
    // mediaRecorder.sendToServer();
  }, 2000);
});

// When the client receives a voice message it will play the sound
audioSocket.on('wholeCampusVoice', function (arrayBuffer) {
  if (room && room !== 'wholeCampus') return;
  console.log('henlo');
  const blob = new Blob([arrayBuffer], { 'type': 'audio/ogg; codecs=opus' });
  const clip = document.createElement('audio');
  clip.id = 'audioclip-' + audioNumber.toString();
  clip.controls = 'controls';
  clip.src = window.URL.createObjectURL(blob);
  clip.type = 'audio/ogg';
  audioNumber += 1;
  clip.play();
});

audioSocket.on('parrishVoice', function (arrayBuffer) {
  if (room !== 'parrish') return;
  console.log('pari');
  const blob = new Blob([arrayBuffer], { 'type': 'audio/ogg; codecs=opus' });
  const clip = document.createElement('audio');
  clip.id = 'audioclip-' + audioNumber.toString();
  clip.controls = 'controls';
  clip.src = window.URL.createObjectURL(blob);
  clip.type = 'audio/ogg';
  audioNumber += 1;
  clip.play();
});