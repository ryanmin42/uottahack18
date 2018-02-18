var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var server = express();
var request = require('request');
//var TextToSpeech = require('text-to-speech-js');
server.use(bodyParser.json({limit: "50mb"}));
var picture;
var statement;

server.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

server.use(bodyParser.urlencoded({
	extended: true
}));

server.use(bodyParser.json());

request({
  method: 'POST',
  url: 'https://api.kairos.com/gallery/remove',
  headers: {
    'Content-Type': 'application/json',
    'app_id': 'c5f15112',
    'app_key': 'c54cd4e0dddcbe2beb12e7ed797d1815'
  },
  body: "{  \"gallery_name\": \"family\"}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});

request({
  method: 'POST',
  url: 'https://api.kairos.com/gallery/remove',
  headers: {
    'Content-Type': 'application/json',
    'app_id': 'c5f15112',
    'app_key': 'c54cd4e0dddcbe2beb12e7ed797d1815'
  },
  body: "{  \"gallery_name\": \"badpeople\"}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});

server.post('/api/image', function(req, res) {
	picture = req.body;
	console.log('/api/image SUCCESS.');
	res.end(JSON.stringify({"result" : "SUCCESS"}));
});

server.get('/api/html', function(req, res) {
	console.log('/api/html SUCCESS.');
	res.json(picture);
});

server.get('/api/results', function(req, res) {
	statement = req.body.result;
  //TextToSpeech.talk(statement);
});

server.listen(3000, function () {
	console.log("Server running at http://localhost:%d", 3000);
});
