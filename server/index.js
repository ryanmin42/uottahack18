var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var Particle = require('particle-api-js');
var bodyParser = require('body-parser');
var particle = new Particle();
var server = express();
var token = '5f90f7cd63385fc06c946b1779b650198cec72ee';
var picture;
var statement;

particle.login({username: 'muizchunara98@gmail.com', password: '98ztr4jg'}).then(
function(data) {
  token = data.body.access_token;
},
function (err) {
  console.log('Could not log in.', err);
}
);
var devicesPr = particle.listDevices({ auth: token });

devicesPr.then(
function(devices){
  console.log('Devices: ', devices);
},
function(err) {
  console.log('List devices call failed: ', err);
}
);

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
  statement = req.body.results;
});

server.post('/api/particle', function(req, res) {
  res.json({"results": statement});
});

server.listen(3000, function () {
  console.log("Server running at http://localhost:%d", 3000);
});
