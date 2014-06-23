var fs = require('fs');

var route = function (request, response) {
  if (request.url === "/") {
    fs.readFile("public/index.html", function(error, file){
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"}); 
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(file);
            response.end();
        }
    });

  } else {
    fs.readFile(request.url.slice(1), function (err, file) {
      if (err) {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        console.log(request)
        response.end("file not found");
      }
      else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(file);
        response.end();
      }
    });
  }
};

exports.route = route;