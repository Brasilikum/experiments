/*jslint node: true */
'use strict';
//var socket = require('socket.io-client')('http://monitor.lad.pucrs.br:3789/');
var socket = require('socket.io-client')('http://192.168.1.28:3546/');

  socket.on('connect', function(){
  	console.log('Connected');
    socket.on('event', function(data){
    	console.log(data);
    });
    socket.on('disconnect', function(){
    	console.log('Disconnect');
    });
  });