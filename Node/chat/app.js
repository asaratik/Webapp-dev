var port = process.env.PORT || 8080;
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require("socket.io").listen(server),
    nicknames = {};

server.listen(port);
//server.listen(process.env.PORT, process.env.IP);
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});
io.sockets.on('connection', function(socket) {
    socket.on('send message', function(data) {
        io.sockets.emit('new message', {msg: data, nick: socket.nickname});
    });

    socket.on('new user', function(data, callback) {
        if (data in nicknames) {
            io.sockets.emit('new message', {msg: data+ ' rejoined session', nick: 'admin'});
            callback(true);
        } else {
            io.sockets.emit('new message', {msg: data+ ' joined session', nick: 'admin'});
            callback(true);
            socket.nickname = data;
            nicknames[socket.nickname] = 1;
            updateNickNames();
        }
    });

    socket.on('disconnect', function(data) {
        if(!socket.nickname) return;
        //delete nicknames[socket.nickname];
        //updateNickNames();
    });

    function updateNickNames() {
        io.sockets.emit('usernames', nicknames);
    }
});
