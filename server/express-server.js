var http = require("http");
var express = require("express");
var fs = require('fs');
var url = require('url');
var cors = require('cors');
var bodyParser = require('body-parser')
var storedMessages = require("./messages.json");


var port = 3000;
var ip = "127.0.0.1";

var app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static('client', { index: 'client/index.html' }));


app.options('*', function (req,res) {
  res.status(200).end();
});

app.get('/classes/messages', function (req,res) {
  res.set({'Content-Type': 'application/json'});
  res.status(200).end(JSON.stringify(storedMessages));
});

app.post('/classes/messages', function (req,res) {
  var newMessage = req.body;
  storedMessages.results.push(newMessage);
  fs.writeFile( "messages.json", JSON.stringify(storedMessages), "utf8", function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.status(201).end(JSON.stringify(storedMessages));
});

app.get('/classes/:room', function (req,res) {
  var roomname = req.params.room;
  res.set({'Content-Type': 'application/json'});
  
  var filteredMessages= {results:[]};

  filteredMessages.results = storedMessages.results.filter(function(message) {
    return message.roomname === roomname;
  });

  res.status(200).end(JSON.stringify(filteredMessages));
});

app.post('/classes/:room', function (req,res) {
  var roomname = req.params.room;
  var newMessage = req.body;

  newMessage.roomname = roomname;
  storedMessages.results.push(newMessage);

  fs.writeFile( "messages.json", JSON.stringify(storedMessages), "utf8", function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.status(201).end(JSON.stringify(storedMessages));
});

app.get(':path', function (req, res) {
  // var path = req.params.path;
  res.status(404).end();  
});


var server = app.listen(port, function() {

});

var corsOptions = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
