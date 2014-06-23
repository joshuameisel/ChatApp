var http = require('http');

var server = http.createServer(function (request, response) {
  response.defaultEncoding = "utf8";
  router.route(request, response);
});

server.listen(8080);
var chatServer = require('./lib/chat_server');
chatServer.createChat(server);
var router = require("./router");


console.log('Server running at http://127.0.0.1:8080/');