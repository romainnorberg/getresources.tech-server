"use strict";

require('newrelic');
require('dotenv').config();

// require
const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const search = require('./app/modules/search');

//app.listen(process.env.LISTEN);
app.listen(process.env.PORT, process.env.LISTEN, () => {
    console.log('We are live on ' + process.env.LISTEN + ' (' + process.env.PORT + ') 🚀🤠 / Process PID: ', process.pid);
});

function handler(req, res) {
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('getresources.tech - nodejs');
    }
}

// io
io.on('connection', function (socket) {
    console.log('connection (' + socket.id + ')');
    search.search(io, socket);

    socket.on('disconnect', () => {
        console.log('disconnect (' + socket.id + ')');
        delete io.sockets[socket.id];
        delete io.sockets.sockets[socket.id];
    });
});
