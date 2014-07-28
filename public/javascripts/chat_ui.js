var extractMessage = function() {
  return $("#message").val();
};

var sendMessage = function(chat) {
  chat.sendMessage(extractMessage());
};

var processCommand = function(chat) {
  chat.processCommand(extractMessage());
};

var addToTop = function(data) {
  $("#messages ul").append($("<li>" + data.text + "</li>"));
};

$(document).ready( function() {
  var socket = io.connect();
  var chat = new ChatApp.Chat(socket);
  $("form").on('submit', function(event) {
    event.preventDefault();
    if (extractMessage().slice(0,1) === "/") {
      processCommand(chat);
    } else {
      sendMessage(chat);
    }
  });

  socket.on("receivedMessage", function (data) {
    addToTop(data);
  });

  socket.on("nicknameChangeResult", function (data) {
    if (data.success) {
      $("#user-names ul").html("");
      for (var key in data.nicknames) {
        $("#user-names ul").append("<li>" + data.nicknames[key] + "</li>");
      }
    } else {
      $("body").append("<h3>" + data.message + "</h3>")
    }
  })
});