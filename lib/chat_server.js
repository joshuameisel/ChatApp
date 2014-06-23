var createChat = function(server) {
  var io = require('socket.io').listen(server);
  io.sockets.on('connection', function (socket) {
    
    socket.on('sendMessage', function (data) {
      io.sockets.emit('receivedMessage', data);
    });
    console.log('connected');
  });
}

exports.createChat = createChat;