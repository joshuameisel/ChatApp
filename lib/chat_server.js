var createChat = function(server) {
  var guestNumber = 1;
  var nicknames = {};
  var io = require('socket.io').listen(server);
  io.sockets.on('connection', function (socket) {
    
        
    if (!nicknames[socket.id]) {
      console.log("Shouldn't be in here, but once")
      nicknames[socket.id] = "guest" + guestNumber;
      io.sockets.emit('nicknameChangeResult', {
        text: "guest" + guestNumber, success: true
      });
      guestNumber++;
    }    
    
    socket.on('sendMessage', function (data) {
      data.text = nicknames[socket.id] + ": " + data.text;
      io.sockets.emit('receivedMessage', data);
    });
    
    socket.on('nicknameChangeRequest', function(data) {
      if (data.text.slice(0,5) === "guest") {
        socket.emit('nicknameChangeResult', {
        success: false,
        message: 'Names cannot start w/ guest'
        });
        return;
      }
      
      for (var key in nicknames) {
        if (data.text === nicknames[key]) {
          socket.emit('nicknameChangeResult', {
          success: false,
          message: 'Names must be unique'
          });
          return;
        }
      }
      
      nicknames[socket.id] = data.text; 
      io.sockets.emit('nicknameChangeResult', {
        nicknames: nicknames,
        success: true
      });
    });
    console.log('connected');
  });
}

exports.createChat = createChat;