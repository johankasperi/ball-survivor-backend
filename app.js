var express = require('express')
var socketio = require('socket.io')

var app = express()
var server = app.listen(process.env.PORT || 8080, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('AGI15 backend listening at http://%s:%s', host, port);
});
var io = socketio.listen(server)

// Serve webapp
app.use("/scripts", express.static(__dirname + "/webapp/scripts"));
app.use("/styles", express.static(__dirname + "/webapp/styles"));
app.use("/views", express.static(__dirname + "/webapp/views"));
app.use("/bower_components", express.static(__dirname + "/webapp/bower_components"));

app.all("/", function(req, res, next) {
	res.sendFile("index.html", { root: __dirname + "/webapp" });
});

// Socket.io
var gameId = ""
io.on('connection', function(socket) {
	console.log("connnnnect")
	socket.on('client:connect', function(data) {
		console.log('client connected')
	})

	socket.on('client:disconnect', function(data) {
		io.to(gameId).emit('client:disconnect', data)
	})

	socket.on('client:playerdata', function(data) {
		io.to(gameId).emit('client:playerdata', data)
	})

	socket.on('client:playermove', function(data) {
		console.log(data)
		io.to(gameId).emit('client:playermove', data)
	})

	socket.on('game:connect', function(data) {
		gameId = socket.id
		console.log('game connected')
	})

	socket.on('game:gameover', function(data) {
		io.emit('game:gameover', data)
	})
})