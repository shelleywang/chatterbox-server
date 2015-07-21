var http = require("http");
var express = require("express");
var fs = require('fs');
var url = require('url');
var storedMessages = require("./messages.json");


var port = 3000;
var ip = "127.0.0.1";

var app = express();


app.options('*', function (req,res) {
  res.set(defaultCorsHeaders);
  res.status(200).end();
});

app.get('/classes/messages', function (req,res) {
  res.set({'Content-Type': 'application/json'});
  res.status(200).end(JSON.stringify(storedMessages));
});

app.post('/classes/messages', function (req,res) {
  var newMessage = JSON.parse(req.body);
  storedMessages.results.push(newMessage);
  fs.writeFile( "server/messages.json", JSON.stringify( storedMessages ), "utf8", function(err) {
    if (err) {
      console.log(err);
    }
  });
  response.status(201).end(JSON.stringify(storedMessages));
});

app.get('/classes/*', function (req,res) {

});

app.post('/classes/*', function (req,res) {

});

app.get('/*', function (req, res) {
  res.send('Hello World!');
});






var server = app.listen(port, function() {

});

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};