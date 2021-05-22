var express = require('express');
var app = express();
app.use('/',express.static(__dirname + "/www/"));
let http = app.listen(80);
let io = require('socket.io')(http);
var engine = require('./www/js/engine')(io);