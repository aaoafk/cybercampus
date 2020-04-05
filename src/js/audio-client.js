/**
 * This code is based-on code found at https://stackoverflow.com/questions/24874568/live-audio-via-socket-io-1-0.
 * We need to make use of the built-in MediaRecorder. Our goal is to make it so that we send audio every second
 * or so, instead of just sending five seconds worth of audio one time.
 */

var audio = document.createElement('audio');
var audioClips = {};
var audioClipsHTML = document.createElement('audioClips');
var audioNumber = 0;

// Created a separate connection for audio
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
    audioSocket.emit('radio', blob);
  };

  mediaRecorder.sendToServer = function () {
    mediaRecorder.requestData();
    // console.log(this.chunks);
    const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
    audioSocket.emit('radio', blob);
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
audioSocket.on('voice', function (arrayBuffer) {
  const blob = new Blob([arrayBuffer], { 'type': 'audio/ogg; codecs=opus' });

  const audioClip = audioClipsHTML.appendChild(document.createElement('audioClip-' + audioNumber.toString()));
  audioClips[audioNumber] = audioClip;
  audioNumber += 1;

  audioClip.src = window.URL.createObjectURL(blob);
  console.log(audioClip);
  audioClip.play();
});
