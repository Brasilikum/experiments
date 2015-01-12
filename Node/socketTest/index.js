/*jslint node: true */
'use strict';
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

//io.origins('192.168.1.174');

io.on('connection', function(socket){
  console.log('Connected to ' + socket.conn.remoteAddress);
  if(socket.conn.remoteAddress != '192.168.1.175'){
  	console.log('Access not allowed');
  	socket.disconnect('unauthorized');
  }
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3546, function(){
  console.log('listening on *:3546');
  console.log('Accepting connections from ' + io.origins());
});