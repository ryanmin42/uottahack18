var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var TextToSpeech = require('text-to-speech-js');
var picture;
var statement;

server.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(bodyParser.json());

server.post('/api/image', function(req, res) {
  picture = req.body;
});

server.get('/api/html', function(req, res) {
  res.json(picture);
});

server.get('/api/results', function(req, res) {
  statement = req.body.result;
  TextToSpeech.talk(statement);
});

server.listen(3000, function () {
  console.log("Server running at http://localhost:%d", 3000);
});
