/*NIET vergeten IP-adressen aan te passen op Raspberry Pi (pi/Documents/project/app.js) en index.html hier naar IP-adres van dit toestel(Node Server)*/

var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var fs = require('fs');
var io = require('socket.io')(http);
var scanner = io.of('/scanner');


//Verbinding maken met Raspberry Pi via Socket.IO
scanner.on('connection', function (socket) {
    
    console.log('Scanner Connected');
    
    socket.on('deviceData', function (msg) {
        console.log(msg);
        io.emit("message", msg);
    })
    socket.on('disconnect', function () {
        console.log('Scanner Disconnected');
    });
});

//Server opzetten op poort 3000
http.listen(3000, function () {
    console.log('listening on *:3000');
});

//Map openbaar stellen
app.use(express.static(__dirname + "/public"))

//Index.html geven als men naar de server surft
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  //__dirname : It will resolve to your project folder.
});