'use strict';

var iosockets = null;     //holds all the clients io.sockets
var iosocketsWebsocketOnly = null;     //holds all the clients io.sockets

var players = require('./players'),
    _ = require('lodash');

var handleClient = function (socket) {

    //console.log("connection with 2.1.1 socket.io : "+socket.id);
    socket.on('status', function (settings, status, priority) {
        // console.log("Socket Id: "+ socket.id +"status event: "+JSON.stringify(status) + ", Setting: "+JSON.stringify(settings));
        var statusObject = _.extend(
            {
                lastReported: Date.now(),
                ip: socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address,
                socket: socket.id,
                priority: priority
            },
            settings,
            status
        )
        statusObject.newSocketIo = true;
        players.updatePlayerStatus(statusObject)
    });

    socket.on('secret_ack', function (err) {
        players.secretAck(socket.id, err ? false : true);
        // console.log("secret event: "+socket.id);
    })

    socket.on('shell_ack', function (response) {
        players.shellAck(socket.id, response);
        // console.log("shell event: "+socket.id);
    });

    socket.on('media_ack', function (response) {
        players.playlistMediaAck(socket.id, response);
        // console.log("media event: "+socket.id);
    });

    socket.on('snapshot', function (response) {
        players.piScreenShot(socket.id,response);
        // console.log("snapshot event: "+socket.id);
    });

    socket.on('setplaylist_ack', function(response) {
        players.playlistChangeAck(socket.id, response);
        // console.log("playlist event: "+socket.id);
    });
    
    socket.on('upload', function (player, filename, data) {
        players.upload(player, filename, data);
        // console.log("upload event: "+socket.id);
    });

    socket.on('disconnect', function (reason) {
        players.updateDisconnectEvent(socket.id,reason);
        // console.log("disconnect event: "+socket.id);
    });
};

exports.startSIO = function (io) {
    io.sockets.on('connection', handleClient);
    iosockets = io.sockets;
    // console.log("connection event: ");
}

exports.startSIOWebsocketOnly = function(io) {
    io.sockets.on('connection', handleClient);
    iosocketsWebsocketOnly = io.sockets;
    // console.log("connection 2 event: ");
}

exports.emitMessage = function (sid) {
    if (iosockets.sockets[sid]) {
    var args = Array.prototype.slice.call(arguments,1);
    // console.log("Socket Id: " +sid +"Emit message event: "+JSON.stringify(args));
    iosockets.sockets[sid].emit.apply(iosockets.sockets[sid], args);
    }
}

