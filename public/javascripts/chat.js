(function(root) {
  var ChatApp = root.ChatApp = (root.ChatApp || {} );
  
  var Chat = ChatApp.Chat = function (socket) {
    this.socket = socket;
  };
  
  Chat.prototype.sendMessage = function (text) {
    this.socket.emit("sendMessage", {text: text});
  };
  
  Chat.prototype.processCommand = function (text) {
    if (text.slice(1,5) === "nick") {
      this.socket.emit("nicknameChangeRequest", {text: text.slice(6)});
    }
    
    else {
      $("body").append("<h3>ERRORRRRR</h3>");
    }
  };
}(this));