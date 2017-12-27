"use strict";

require('newrelic');
require('dotenv').config();

// app Root
const appRoot = require('app-root-path');
appRoot.setPath('app/');
global.reqlib = appRoot.require; // little hacky, global object to use it everywhere in your project

// require
const compression = require('compression');
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);
const helmet = require('helmet');
const bodyParser = require('body-parser');
const moment = require('moment');

const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

// uses
app.use(compression());
app.use(helmet());

// configuration ===============================================================
app.locals.settings.env = process.env; // use env. variable on locals (template, ..)
app.locals.moment = moment;

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator()); // Add this after the bodyParser middlewares!

// setters
app.set("view engine", "pug");


if (process.env.NODE_ENV === 'dev') {
    require('./config/dev')(app); // dev mode
}
if (process.env.NODE_ENV === 'production') {
    require('./config/prod')(app);
}

// routes
require('./app/routes')(app);

// io
io.on('connection', function (socket) {
    require('./app/modules/search')(app, io, socket);
});

server.listen(process.env.PORT, process.env.LISTEN, () => {
    console.log('We are live on ' + process.env.PORT + '🚀🤠 / Process PID: ', process.pid);
});