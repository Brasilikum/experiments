'use strict';
var socket = require('socket.io');
var debug = require('debug')('websocket');
var io;

module.exports.listen = function(server){
	io = socket.listen(server);
	
	io.sockets.on('connection', function (socket) {
		debug('new connection');
	    
	    socket.on('disconnect', function(){
	        debug('disconnected');
	    });
	    
	    socket.on('dirBash', function (data){
	    	debug('dirBash');
	        debug(data);
	    });
	    
	    socket.on('totalMemory', function (data){
	        debug('totalMemory');
	        debug(data);
	    });
	    
	    socket.on('vmStats', function (data){
	        debug('vmStats');
	        debug(data);;
	    });
	});
}