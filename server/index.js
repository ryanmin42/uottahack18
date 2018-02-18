var http = require('http');
var fs = require('fs');
var express = require('express');
var picture;

fs.readFile('./index.html', function (err, html) {
  var server =  http.createServer(function(request, response) {
      response.writeHeader(200, {"Content-Type": "text/html"});
      response.write(html);
      response.end();
  }).listen(3000);

  server.use(bodyParser.urlencoded({
    extended: true
  }));

  server.use(bodyParser.json());

  server.post('/api/image', function(req, res) {
    picture = req.body;
  });

  server.get('/api/html', function(req, res) {
    res.json(picture);
    
  })
});

console.log("Server running at http://localhost:%d", 3000);
