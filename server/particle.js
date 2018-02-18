var Particle = require('particle-api-js');
var express = require('express');
var particle = new Particle();
var token = "5f90f7cd63385fc06c946b1779b650198cec72ee";
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(express.static('public'))

app.get('/api/devices', function (req, res) {
  particle.listDevices({ auth: token })
  .then(function (devices) {
    res.json(devices.body);
  }, function (err) {
    console.log(err);
  });
});

app.post('/api/particle', function (req, res) {
  particle.callFunction({
    deviceId: '470057000751353530373132',
    name: 'results',
    argument: res.body.results,
    auth: token
  }).then(function(data) {
    console.log('it worked!');
    console.log(data);
    res.json(data);
  }, function (err) {
    console.log(err);
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
