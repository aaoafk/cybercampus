var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.idToName = {};

server.lastPlayerID = 0;

server.listen(process.env.PORT || 8081, function () {
  console.log('Listening on ' + server.address().port);
});

io.on('connection', function (socket) {

  socket.on('newplayer', function (username) {
    socket.player = {
      id: server.lastPlayerID++,
      x: randomInt(100, 400),
      y: randomInt(100, 400),
      username: username
    };
    console.log('aids 1' + socket.player.id + ' ' + username);
    server.idToName[socket.player.id] = username;

    socket.emit('allplayers', getAllPlayers());
    socket.broadcast.emit('newplayer', socket.player);

    socket.on('click', function (data) {
      console.log('click to ' + data.x + ', ' + data.y);
      socket.player.x = data.x;
      socket.player.y = data.y;
      io.emit('move', socket.player);
    });

    socket.on('disconnect', function () {
      io.emit('remove', socket.player.id);
    });
  });

  socket.on('test', function () {
    console.log('test received');
  });

  socket.on('radio', function (blob) {
    // 'voice' is the name of the 'channel' in audio-client.js where the client receives the audio
    socket.broadcast.emit('voice', blob);
  });
});

function getAllPlayers() {
  const players = [];
  Object.keys(io.sockets.connected).forEach(function (socketID) {
    const player = io.sockets.connected[socketID].player;
    if (player) players.push({...player, username: server.idToName[socketID]});
  });
  console.log(players);
  console.log('hoo haw');
  return players;
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}
