/**
 * J ain't here
 */

function initClient() {
  Client = {};
  Client.socket = io.connect();

  Client.sendTest = function () {
    console.log("test sent");
    Client.socket.emit('test');
  };

  Client.askNewPlayer = function () {
    Client.socket.emit('newplayer', username);
  };

  Client.sendClick = function (x, y) {
    Client.socket.emit('click', { x: x, y: y });
  };

  Client.socket.on('newplayer', function (data) {
    GameLogic.addNewPlayer(data.id, data.x, data.y, data.username);
    console.log(data);
  });

  Client.socket.on('allplayers', function (data) {
    for (let i = 0; i < data.length; i++) {
      GameLogic.addNewPlayer(data[i].id, data[i].x, data[i].y, data.username);
    }

    Client.socket.on('move', function (data) {
      GameLogic.movePlayer(data.id, data.x, data.y);
    });

    Client.socket.on('remove', function (id) {
      GameLogic.removePlayer(id);
    });
  });
}

function deleteClient() {
  if (Client) {
    Client.socket.disconnect(true);
  }
  Client = {};
}
