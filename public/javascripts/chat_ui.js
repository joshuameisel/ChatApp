var extractMessage = function() {
  return $("#message").val();
};

var sendMessage = function(chat) {
  chat.sendMessage(extractMessage());
};

var addToTop = function(data) {
  $("ul").append($("<li>" + data.text + "</li>"));
};

$(document).ready( function() {
  var socket = io.connect();
  var chat = new ChatApp.Chat(socket);
  $("form").on('submit', function(event) {
    event.preventDefault();
    sendMessage(chat);
  });
  
  socket.on("receivedMessage", function (data) {
    addToTop(data);
  });
});